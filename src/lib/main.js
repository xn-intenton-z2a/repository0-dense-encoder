#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

// ─────────────── CLI Entrypoint ───────────────
export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}

// ─────────────── Dense Encoder Registry ───────────────

const registry = new Map();

function registerEncoding(name, charset) {
  if (typeof name !== 'string' || name.length === 0) throw new TypeError('encoding name required');
  if (typeof charset !== 'string' || charset.length < 2) throw new TypeError('charset must be a string with at least 2 characters');
  const chars = Array.from(charset);
  const unique = new Set(chars);
  if (unique.size !== chars.length) throw new Error('charset contains duplicate characters');
  registry.set(name, { name, charset: chars.join(''), chars, size: chars.length });
  return registry.get(name);
}

function listEncodings() {
  return Array.from(registry.values()).map(e => ({ name: e.name, bitsPerChar: Math.log2(e.size), charsetSize: e.size }));
}

function _bytesToBigInt(bytes, start = 0) {
  let v = 0n;
  for (let i = start; i < bytes.length; i++) {
    v = (v << 8n) + BigInt(bytes[i]);
  }
  return v;
}

function _bigIntToBytes(v) {
  if (v === 0n) return [];
  const out = [];
  while (v > 0n) {
    out.push(Number(v & 0xFFn));
    v >>= 8n;
  }
  out.reverse();
  return out;
}

function encode(encodingName, input) {
  if (!(input instanceof Uint8Array)) throw new TypeError('input must be a Uint8Array');
  const enc = registry.get(encodingName);
  if (!enc) throw new Error('unknown encoding: ' + encodingName);
  if (input.length === 0) return '';

  const { chars, size } = enc;
  // count leading zero bytes
  let leadingZeros = 0;
  while (leadingZeros < input.length && input[leadingZeros] === 0) leadingZeros++;

  const value = _bytesToBigInt(input, leadingZeros);

  // convert bigint to base-N
  let v = value;
  const digits = [];
  if (v === 0n) {
    // nothing
  } else {
    const bigBase = BigInt(size);
    while (v > 0n) {
      const digit = Number(v % bigBase);
      digits.push(chars[digit]);
      v = v / bigBase;
    }
    digits.reverse();
  }

  // prepend leading zero characters (map each zero byte to one charset[0])
  const leadingChars = chars[0].repeat(leadingZeros);
  return leadingChars + digits.join('');
}

function decode(encodingName, text) {
  if (typeof text !== 'string') throw new TypeError('text must be a string');
  const enc = registry.get(encodingName);
  if (!enc) throw new Error('unknown encoding: ' + encodingName);
  if (text.length === 0) return new Uint8Array();

  const { chars, size } = enc;
  const charToIndex = new Map(chars.map((c, i) => [c, i]));

  // count leading charset[0] characters -> leading zero bytes
  let leadingChars = 0;
  while (leadingChars < text.length && text[leadingChars] === chars[0]) leadingChars++;
  const rest = text.slice(leadingChars);

  let v = 0n;
  const bigBase = BigInt(size);
  for (let i = 0; i < rest.length; i++) {
    const c = rest[i];
    const idx = charToIndex.get(c);
    if (idx === undefined) throw new Error('invalid character in input: ' + c);
    v = v * bigBase + BigInt(idx);
  }

  const body = _bigIntToBytes(v);
  const out = new Uint8Array(leadingChars + body.length);
  for (let i = 0; i < leadingChars; i++) out[i] = 0;
  out.set(body, leadingChars);
  return out;
}

function createEncodingFromCharset(charset, name) {
  if (typeof charset !== 'string') throw new TypeError('charset must be a string');
  // validation: printable ASCII U+0021–U+007E (33..126), no control chars, no space
  const chars = Array.from(charset);
  if (chars.length < 2) throw new Error('charset must contain at least 2 characters');
  const seen = new Set();
  const ambiguous = new Set(['0', 'O', '1', 'l', 'I']);
  for (const c of chars) {
    const code = c.codePointAt(0);
    if (!Number.isFinite(code) || code < 33 || code > 126) throw new Error('charset contains invalid (non-printable) character: ' + c);
    if (ambiguous.has(c)) throw new Error('charset contains ambiguous character: ' + c);
    if (seen.has(c)) throw new Error('charset contains duplicate character: ' + c);
    seen.add(c);
  }
  const encName = typeof name === 'string' && name.length ? name : `custom-${chars.length}`;
  return registerEncoding(encName, chars.join(''));
}

function encodeUUID(encodingName, uuid) {
  if (typeof uuid !== 'string') throw new TypeError('uuid must be a string');
  const hex = uuid.replace(/-/g, '').toLowerCase();
  if (hex.length !== 32) throw new Error('uuid must be 16 bytes hex (32 hex chars)');
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return encode(encodingName, bytes);
}

function decodeUUID(encodingName, encoded) {
  const bytes = decode(encodingName, encoded);
  if (!(bytes instanceof Uint8Array)) throw new Error('decoded data not bytes');
  if (bytes.length !== 16) throw new Error('decoded UUID must be 16 bytes');
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  // insert dashes 8-4-4-4-12
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
}

// ─────────────── Built-in Encodings ───────────────
// base62 (alphanumeric)
registerEncoding('base62', '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
// base85 (Z85-like)
registerEncoding('base85', '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#');
// base91 (basE91-like)
registerEncoding('base91', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"');
// high-density printable ASCII (33-126)
const printable = Array.from({ length: 94 }, (_, i) => String.fromCharCode(33 + i)).join('');
registerEncoding('ascii94', printable);

export { registerEncoding as registerEncoding };
export { listEncodings };
export { encode, decode, createEncodingFromCharset };
export { encodeUUID, decodeUUID };

// for completeness, re-export identity
export default { name, version, description, getIdentity };
