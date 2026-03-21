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

// --- Encoding core --------------------------------------------------------

const encodings = new Map();

function round(num, places = 3) {
  const p = Math.pow(10, places);
  return Math.round(num * p) / p;
}

export function defineEncoding(name, charset, options = {}) {
  if (typeof name !== "string" || !name) throw new TypeError("encoding name must be a non-empty string");
  if (typeof charset !== "string" || charset.length < 2) throw new TypeError("charset must be a string with at least 2 characters");

  const allowAmbiguous = !!options.allowAmbiguous;
  const ambiguous = new Set(['0','O','1','l','I']);

  // ensure unique characters and sanitize charset: printable ASCII 33..126
  const seen = new Set();
  for (const ch of charset) {
    if (seen.has(ch)) throw new Error("charset contains duplicate characters");
    const code = ch.charCodeAt(0);
    if (code < 33 || code > 126) throw new Error("charset contains non-printable or out-of-range ASCII characters");
    if (!allowAmbiguous && ambiguous.has(ch)) throw new Error("charset contains visually ambiguous characters (0/O,1/l/I)");
    seen.add(ch);
  }

  const charsetSize = charset.length;
  const bitsPerChar = Math.log2(charsetSize);
  const index = new Map();
  for (let i = 0; i < charset.length; i++) index.set(charset[i], i);
  encodings.set(name, { name, charset, charsetSize, bitsPerChar, index });
}

export function listEncodings() {
  const out = [];
  for (const enc of encodings.values()) {
    out.push({ name: enc.name, bitsPerChar: round(enc.bitsPerChar, 3), charsetSize: enc.charsetSize });
  }
  return out;
}

function toUint8Array(data) {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  if (Array.isArray(data)) return new Uint8Array(data);
  throw new TypeError("data must be a Uint8Array, ArrayBuffer, or Array of bytes");
}

export function encode(data, encodingName) {
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`unknown encoding: ${encodingName}`);
  const bytes = toUint8Array(data);
  // count leading zero bytes
  let leadingZeros = 0;
  while (leadingZeros < bytes.length && bytes[leadingZeros] === 0) leadingZeros++;
  // convert bytes to BigInt
  let value = 0n;
  for (const b of bytes) {
    value = (value << 8n) | BigInt(b);
  }
  const base = BigInt(enc.charsetSize);
  // convert BigInt to base
  let digits = [];
  if (value > 0n) {
    while (value > 0n) {
      const rem = Number(value % base);
      digits.push(enc.charset[rem]);
      value = value / base;
    }
    digits = digits.reverse();
  } else {
    digits = [];
  }
  const prefix = enc.charset[0].repeat(leadingZeros);
  return prefix + digits.join("");
}

export function decode(str, encodingName) {
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`unknown encoding: ${encodingName}`);
  if (typeof str !== "string" || str.length === 0) return new Uint8Array([]);
  const firstChar = enc.charset[0];
  let i = 0;
  while (i < str.length && str[i] === firstChar) i++;
  const leadingZeros = i;
  const remainder = str.slice(i);
  // convert remainder to BigInt
  const base = BigInt(enc.charsetSize);
  let value = 0n;
  for (const ch of remainder) {
    const idx = enc.index.get(ch);
    if (idx === undefined) throw new Error(`invalid character for encoding ${encodingName}: ${ch}`);
    value = value * base + BigInt(idx);
  }
  // convert BigInt to bytes
  const bytes = [];
  while (value > 0n) {
    bytes.unshift(Number(value & 0xffn));
    value >>= 8n;
  }
  // prepend leading zero bytes
  const out = new Uint8Array(leadingZeros + bytes.length);
  for (let j = 0; j < leadingZeros; j++) out[j] = 0;
  for (let j = 0; j < bytes.length; j++) out[leadingZeros + j] = bytes[j];
  return out;
}

export function uuidToShort(uuidString, encodingName = "base91") {
  if (typeof uuidString !== "string") throw new TypeError("uuid must be a string");
  const hex = uuidString.replace(/-/g, "");
  if (!/^[0-9a-fA-F]{32}$/.test(hex)) throw new Error("invalid uuid string");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  const encoded = encode(bytes, encodingName);
  return encoded.split("").reverse().join("");
}

export function uuidFromShort(shortString, encodingName = "base91") {
  if (typeof shortString !== "string") throw new TypeError("shortString must be a string");
  const encoded = shortString.split("").reverse().join("");
  const bytes = decode(encoded, encodingName);
  if (!(bytes instanceof Uint8Array) || bytes.length !== 16) throw new Error("decoded UUID has invalid length");
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
  // format as 8-4-4-4-12
  return `${hex.substr(0,8)}-${hex.substr(8,4)}-${hex.substr(12,4)}-${hex.substr(16,4)}-${hex.substr(20,12)}`;
}

// --- Built-in encodings --------------------------------------------------

// base62
defineEncoding("base62", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", { allowAmbiguous: true });
// base85 (Z85 alphabet as in library/Z85.md)
defineEncoding("base85", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#", { allowAmbiguous: true });
// base91 (printable ascii 33..126 excluding three ambiguous characters to reach 91)
(function registerBase91() {
  const chars = [];
  for (let c = 33; c <= 126; c++) {
    const ch = String.fromCharCode(c);
    if (ch === '0' || ch === 'O' || ch === '1') continue; // remove three to end up with 91
    chars.push(ch);
  }
  defineEncoding('base91', chars.join(''), { allowAmbiguous: true });
})();

// denser printable custom encoding excluding ambiguous characters (0/O,1/l,I)
(function registerAsciiDense() {
  const exclude = new Set(['0','O','1','l','I']);
  const chars = [];
  for (let c = 33; c <= 126; c++) {
    const ch = String.fromCharCode(c);
    if (exclude.has(ch)) continue;
    chars.push(ch);
  }
  defineEncoding('printable89', chars.join(''));
})();

// --- CLI entrypoint -----------------------------------------------------
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
