#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js — dense binary-to-text encodings library

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  try {
    pkg = requireFn("../../package.json");
  } catch {
    pkg = { name: "repo", version: "0.0.0", description: "" };
  }
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
export const description = pkg.description || "";

export function getIdentity() {
  return { name, version, description };
}

// Encoding registry
const registry = new Map();

// Helper to compute printable ASCII charset excluding ambiguous characters
function buildPrintableCharset() {
  const ambiguous = new Set(["0", "O", "1", "l", "I"]);
  let chars = [];
  for (let code = 0x21; code <= 0x7e; code++) {
    const ch = String.fromCharCode(code);
    if (ambiguous.has(ch)) continue;
    chars.push(ch);
  }
  return chars.join("");
}

// Built-in charsets
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// Z85 charset (Z85 / Ascii85 variant commonly used)
const BASE85 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";
const BASE89 = buildPrintableCharset();

function addEncoding(name, charset) {
  if (!name || typeof name !== "string") throw new TypeError("encoding name required");
  if (!charset || typeof charset !== "string") throw new TypeError("charset required");
  const unique = new Set([...charset]).size === charset.length;
  if (!unique) throw new TypeError("charset must not contain duplicate characters");
  registry.set(name, {
    name,
    charset,
    charsetSize: charset.length,
    bitsPerChar: Math.log2(charset.length),
  });
}

// Register built-ins
addEncoding("base62", BASE62);
addEncoding("base85", BASE85);
addEncoding("base89", BASE89);

export function listEncodings() {
  return Array.from(registry.values()).map(({ name, bitsPerChar, charsetSize }) => ({ name, bitsPerChar, charsetSize }));
}

export function createEncoding(name, charset) {
  // Validate charset: no control characters, no spaces, and exclude ambiguous characters
  if (typeof charset !== "string") throw new TypeError("charset must be a string");
  if (charset.length < 2) throw new TypeError("charset must contain at least 2 characters");
  for (const ch of charset) {
    const code = ch.codePointAt(0);
    if (code < 0x21 || code > 0x7e) throw new TypeError("charset must use printable ASCII characters (U+0021..U+007E)");
    if (/[\s]/.test(ch)) throw new TypeError("charset must not contain whitespace");
    if (["0", "O", "1", "l", "I"].includes(ch)) throw new TypeError("charset must not contain visually ambiguous characters (0/O, 1/l/I)");
  }
  addEncoding(name, charset);
  return registry.get(name);
}

function getEncoding(name) {
  const enc = registry.get(name);
  if (!enc) throw new Error(`Unknown encoding: ${name}`);
  return enc;
}

// BigInt helpers
function bytesToBigInt(bytes) {
  let big = 0n;
  for (const b of bytes) {
    big = (big << 8n) | BigInt(b);
  }
  return big;
}

function bigIntToBytes(big) {
  if (big === 0n) return new Uint8Array([]);
  const out = [];
  while (big > 0n) {
    out.push(Number(big & 0xffn));
    big >>= 8n;
  }
  out.reverse();
  return new Uint8Array(out);
}

function bigIntToBase(big, charset) {
  const base = BigInt(charset.length);
  if (big === 0n) return charset[0];
  const digits = [];
  while (big > 0n) {
    const rem = Number(big % base);
    digits.push(charset[rem]);
    big = big / base;
  }
  digits.reverse();
  return digits.join("");
}

function baseToBigInt(str, charset) {
  const base = BigInt(charset.length);
  let big = 0n;
  for (const ch of str) {
    const idx = charset.indexOf(ch);
    if (idx === -1) throw new Error(`Invalid character for encoding: ${ch}`);
    big = big * base + BigInt(idx);
  }
  return big;
}

// Payload encoders (no length-prefix) — useful for UUID shorthand where fixed-size is known
function encodePayloadNoLength(name, bytes) {
  const { charset } = getEncoding(name);
  const big = bytesToBigInt(bytes);
  return bigIntToBase(big, charset);
}

function decodePayloadNoLength(name, payload) {
  const { charset } = getEncoding(name);
  if (!payload || payload.length === 0) return new Uint8Array([]);
  const big = baseToBigInt(payload, charset);
  return bigIntToBytes(big);
}

// Public API: encode/decode with length prefix to allow round-trip of arbitrary binary data
export function encode(name, bytes) {
  if (!(bytes instanceof Uint8Array)) throw new TypeError("bytes must be a Uint8Array");
  const payload = encodePayloadNoLength(name, bytes);
  // prefix with length so decoding can restore leading zeros
  return `${bytes.length}:${payload}`;
}

export function decode(name, encoded) {
  if (typeof encoded !== "string") throw new TypeError("encoded must be a string");
  const m = encoded.match(/^(\d+):(.*)$/s);
  if (!m) {
    // backward-compat / minimal form: payload only
    const buf = decodePayloadNoLength(name, encoded);
    return buf;
  }
  const len = Number(m[1]);
  const payload = m[2] || "";
  const buf = decodePayloadNoLength(name, payload);
  // left-pad with zeros to requested length
  if (buf.length === len) return buf;
  const out = new Uint8Array(len);
  // place buf at the end so leading zeros preserved
  out.set(buf, len - buf.length);
  return out;
}

// UUID helpers: shorthand encoding — fixed 16 bytes, encode payload without length prefix and reverse resulting string
export function encodeUUID(name, uuid) {
  if (typeof uuid !== "string") throw new TypeError("uuid must be a string");
  const hex = uuid.replace(/-/g, "").toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) throw new TypeError("invalid uuid string");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  const payload = encodePayloadNoLength(name, bytes);
  return payload.split("").reverse().join("");
}

export function decodeUUID(name, encoded) {
  if (typeof encoded !== "string") throw new TypeError("encoded must be a string");
  const payload = encoded.split("").reverse().join("");
  const buf = decodePayloadNoLength(name, payload);
  // left-pad to 16 bytes
  const out = new Uint8Array(16);
  out.set(buf, 16 - buf.length);
  const hex = Array.from(out).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Keep the CLI behaviour from the original file
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
