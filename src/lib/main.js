#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  try {
    pkg = requireFn("../../package.json");
  } catch (e) {
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
const encodings = new Map();

function registerEncoding(name, charset) {
  if (typeof name !== "string" || !name) throw new TypeError("encoding name must be a non-empty string");
  if (typeof charset !== "string" || charset.length < 2) throw new TypeError("charset must be a string with at least 2 characters");
  const unique = new Set([...charset]);
  if (unique.size !== charset.length) throw new TypeError("charset must contain unique characters");
  encodings.set(name, {
    name,
    charset,
    charsetSize: charset.length,
    bitsPerChar: Math.log2(charset.length),
  });
}

// Generic base-N encoding using BigInt, preserving leading zero bytes like base58
function encodeWithCharset(bytes, charset) {
  if (!(bytes instanceof Uint8Array)) throw new TypeError("bytes must be a Uint8Array");
  if (bytes.length === 0) return "";
  const base = BigInt(charset.length);
  // count leading zeros
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
  // convert bytes to BigInt
  let value = 0n;
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8n) | BigInt(bytes[i]);
  }
  const chars = [];
  while (value > 0n) {
    const digit = Number(value % base);
    chars.push(charset[digit]);
    value /= base;
  }
  // preserve leading zeros as charset[0]
  for (let i = 0; i < zeros; i++) chars.push(charset[0]);
  return chars.reverse().join("");
}

function decodeWithCharset(str, charset) {
  if (typeof str !== "string") throw new TypeError("input must be a string");
  if (str.length === 0) return new Uint8Array(0);
  const base = BigInt(charset.length);
  const zeroChar = charset[0];
  let zeros = 0;
  while (zeros < str.length && str[zeros] === zeroChar) zeros++;
  let value = 0n;
  for (let i = zeros; i < str.length; i++) {
    const idx = charset.indexOf(str[i]);
    if (idx === -1) throw new Error(`Invalid character: ${str[i]}`);
    value = value * base + BigInt(idx);
  }
  // convert BigInt to bytes
  const bytes = [];
  while (value > 0n) {
    bytes.push(Number(value & 0xffn));
    value >>= 8n;
  }
  bytes.reverse();
  const result = new Uint8Array(zeros + bytes.length);
  for (let i = 0; i < zeros; i++) result[i] = 0;
  for (let i = 0; i < bytes.length; i++) result[zeros + i] = bytes[i];
  return result;
}

export function encode(encodingName, bytes) {
  if (!encodings.has(encodingName)) throw new Error(`Unknown encoding: ${encodingName}`);
  const cfg = encodings.get(encodingName);
  return encodeWithCharset(bytes, cfg.charset);
}

export function decode(encodingName, str) {
  if (!encodings.has(encodingName)) throw new Error(`Unknown encoding: ${encodingName}`);
  const cfg = encodings.get(encodingName);
  return decodeWithCharset(str, cfg.charset);
}

export function listEncodings() {
  return Array.from(encodings.values()).map(e => ({ name: e.name, bitsPerChar: e.bitsPerChar, charsetSize: e.charsetSize }));
}

// Factory: create encoding from a charset string (printable ASCII 0x21-0x7E excluding ambiguous chars)
const AMBIGUOUS = new Set(['0', 'O', '1', 'l', 'I']);

export function createEncodingFromCharset(name, charset) {
  if (typeof charset !== 'string') throw new TypeError('charset must be a string');
  if (charset.length < 2) throw new TypeError('charset must contain at least 2 characters');
  // validate printable ASCII range U+0021 (33) .. U+007E (126)
  for (const ch of charset) {
    const code = ch.codePointAt(0);
    if (!code || code < 33 || code > 126) throw new Error('charset contains non-printable ASCII characters');
    if (AMBIGUOUS.has(ch)) throw new Error(`charset contains ambiguous character: ${ch}`);
  }
  const unique = new Set([...charset]);
  if (unique.size !== charset.length) throw new Error('charset must contain unique characters');
  registerEncoding(name, charset);
  return encodings.get(name);
}

// Register built-in encodings
const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const z85 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#';
const base91 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';

registerEncoding('base62', base62);
registerEncoding('base85', z85);
registerEncoding('base91', base91);

// UUID helpers: parse hex and format
function hexToBytes(hex) {
  if (typeof hex !== 'string') throw new TypeError('hex must be a string');
  const cleaned = hex.replace(/[^0-9a-fA-F]/g, '');
  if (cleaned.length % 2 !== 0) throw new Error('hex string must have even length');
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.substr(i, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function formatUuidHex(hex32) {
  const h = hex32.toLowerCase();
  if (h.length !== 32) throw new Error('UUID hex must be 32 characters');
  return `${h.substr(0,8)}-${h.substr(8,4)}-${h.substr(12,4)}-${h.substr(16,4)}-${h.substr(20,12)}`;
}

export function encodeUuid(encodingName, uuidStr) {
  const bytes = hexToBytes(uuidStr);
  if (bytes.length !== 16) throw new Error('UUID must be 16 bytes');
  return encode(encodingName, bytes);
}

export function decodeUuid(encodingName, encoded) {
  const bytes = decode(encodingName, encoded);
  if (bytes.length !== 16) throw new Error('Decoded UUID must be 16 bytes');
  return formatUuidHex(bytesToHex(bytes));
}

// CLI
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
