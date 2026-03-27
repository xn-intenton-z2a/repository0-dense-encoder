#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js — Dense binary-to-text encodings

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

// -----------------------------
// Encoding registry and helpers
// -----------------------------

const RESERVED_AMBIGUOUS = new Set(["0", "O", "1", "l", "I"]);

function hasControlOrWhitespace(s) {
  for (const ch of s) {
    const code = ch.codePointAt(0);
    if (code < 0x21 || code > 0x7e) return true; // control or non-printable (excluding space)
    if (code === 0x20) return true; // space disallowed
  }
  return false;
}

function uniqueChars(s) {
  return new Set([...s]);
}

const encodings = new Map();
let customCounter = 0;

function listEncodings() {
  return Array.from(encodings.values()).map(e => ({ name: e.name, bitsPerChar: Math.log2(e.charset.length), charsetSize: e.charset.length, charset: e.charset }));
}

// -----------------------------
// BigInt-based generic encoding
// -----------------------------

function bytesToBigInt(bytes) {
  let bi = 0n;
  for (const b of bytes) {
    bi = (bi << 8n) | BigInt(b);
  }
  return bi;
}

function bigIntToBytes(bi, length) {
  const out = new Uint8Array(length);
  for (let i = length - 1; i >= 0; i--) {
    out[i] = Number(bi & 0xffn);
    bi >>= 8n;
  }
  return out;
}

function bigIntToBase(bi, base, charset) {
  if (bi === 0n) return charset[0];
  const digits = [];
  const bbase = BigInt(base);
  while (bi > 0n) {
    const rem = Number(bi % bbase);
    digits.push(charset[rem]);
    bi = bi / bbase;
  }
  return digits.reverse().join("");
}

function baseToBigInt(str, charset) {
  let bi = 0n;
  const base = BigInt(charset.length);
  for (const ch of str) {
    const idx = charset.indexOf(ch);
    if (idx === -1) throw new Error(`Invalid character: ${ch}`);
    bi = bi * base + BigInt(idx);
  }
  return bi;
}

function createBigIntEncoding(name, charset) {
  const base = charset.length;
  const bitsPerChar = Math.log2(base);

  function rawEncode(bytes) {
    if (!(bytes instanceof Uint8Array)) throw new TypeError("input must be Uint8Array");
    if (bytes.length === 0) return "";
    const bi = bytesToBigInt(bytes);
    return bigIntToBase(bi, base, charset);
  }

  function encode(bytes) {
    if (!(bytes instanceof Uint8Array)) throw new TypeError("input must be Uint8Array");
    const len = bytes.length;
    // Include length as a small prefix so round-trip round-trips and preserves leading zeros
    const body = rawEncode(bytes);
    return `${len}:${body}`;
  }

  function rawDecode(str, length) {
    if (!str) return new Uint8Array(length || 0);
    const bi = baseToBigInt(str, charset);
    const targetLen = length !== undefined ? length : Math.ceil((str.length * bitsPerChar) / 8);
    return bigIntToBytes(bi, targetLen);
  }

  function decode(str) {
    if (typeof str !== "string") throw new TypeError("input must be string");
    if (str === "") return new Uint8Array(0);
    const idx = str.indexOf(":");
    if (idx === -1) {
      throw new Error("Missing length prefix for this encoding; use raw form or provide a prefixed value");
    }
    const len = Number(str.slice(0, idx));
    const body = str.slice(idx + 1);
    return rawDecode(body, len);
  }

  return { name, charset, encode, decode, rawEncode, rawDecode, bitsPerChar };
}

// -----------------------------
// base91 implementation (bit-accumulator)
// -----------------------------

// canonical alphabet from base91 reference
const BASE91_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#\$%&()*+,./:;<=>?@[]^_`{|}~\""; // 91 chars
// build decode table
const BASE91_DECODE = (() => {
  const d = new Map();
  for (let i = 0; i < BASE91_ALPHABET.length; i++) d.set(BASE91_ALPHABET[i], i);
  return d;
})();

function encodeBase91(bytes) {
  if (!(bytes instanceof Uint8Array)) throw new TypeError("input must be Uint8Array");
  let b = 0;
  let n = 0;
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    b |= (bytes[i] & 0xff) << n;
    n += 8;
    if (n > 13) {
      let v = b & 8191; // 13 bits
      if (v > 88) {
        b >>= 13;
        n -= 13;
      } else {
        v = b & 16383; // 14 bits
        b >>= 14;
        n -= 14;
      }
      out += BASE91_ALPHABET[v % 91];
      out += BASE91_ALPHABET[Math.floor(v / 91)];
    }
  }
  if (n > 0) {
    out += BASE91_ALPHABET[b % 91];
    if (n > 7 || b > 90) out += BASE91_ALPHABET[Math.floor(b / 91)];
  }
  return out;
}

function decodeBase91(str) {
  if (typeof str !== "string") throw new TypeError("input must be string");
  if (str.length === 0) return new Uint8Array(0);
  let v = -1;
  let b = 0;
  let n = 0;
  const out = [];
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const d = BASE91_DECODE.get(ch);
    if (d === undefined) throw new Error(`Invalid base91 character: ${ch}`);
    if (v === -1) {
      v = d;
    } else {
      v += d * 91;
      if ((v & 8191) > 88) {
        b |= (v & 8191) << n;
        n += 13;
      } else {
        b |= v << n;
        n += 14;
      }
      while (n >= 8) {
        out.push(b & 255);
        b >>= 8;
        n -= 8;
      }
      v = -1;
    }
  }
  if (v !== -1) {
    // final leftover: produce a single last byte from remaining bits (canonical finalization)
    out.push((b | (v << n)) & 255);
  }
  return Uint8Array.from(out);
}

// -----------------------------
// Register built-in encodings
// -----------------------------

// base62
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
encodings.set("base62", createBigIntEncoding("base62", BASE62));

// base85 (Z85 alphabet) — a common variant is Z85 (ZeroMQ)
const Z85 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";
encodings.set("base85", createBigIntEncoding("base85", Z85));

// base91
encodings.set("base91", { name: "base91", charset: BASE91_ALPHABET, encode: encodeBase91, decode: decodeBase91, bitsPerChar: Math.log2(BASE91_ALPHABET.length) });

// -----------------------------
// Public API
// -----------------------------

export function createEncoding(charset, opts = {}) {
  if (typeof charset !== "string") throw new TypeError("charset must be a string");
  if (charset.length < 2) throw new Error("charset must contain at least 2 characters");
  if (hasControlOrWhitespace(charset)) throw new Error("charset contains control characters or space");
  for (const ch of RESERVED_AMBIGUOUS) {
    if (charset.includes(ch)) throw new Error(`charset must not contain ambiguous character: ${ch}`);
  }
  if (uniqueChars(charset).size !== charset.length) throw new Error("charset must not contain duplicate characters");
  const name = opts.name || `custom-${++customCounter}`;
  const enc = createBigIntEncoding(name, charset);
  encodings.set(name, enc);
  return enc;
}

export function encode(encodingName, data) {
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`Unknown encoding: ${encodingName}`);
  if (!(data instanceof Uint8Array)) throw new TypeError("data must be Uint8Array");
  if (enc.rawEncode) return enc.encode(data); // BigInt-encodings use headered encode
  // base91 and others without rawEncode: encode is headerless already
  return enc.encode(data);
}

export function decode(encodingName, encoded) {
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`Unknown encoding: ${encodingName}`);
  if (typeof encoded !== "string") throw new TypeError("encoded must be a string");
  if (enc.decode) return enc.decode(encoded);
  throw new Error("Encoding has no decode method");
}

export function encodeUUID(encodingName, uuidString) {
  // shorthand: strip dashes, parse hex (16 bytes), encode raw and reverse
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`Unknown encoding: ${encodingName}`);
  const hex = uuidString.replace(/-/g, "");
  if (hex.length !== 32) throw new Error("UUID must be 16 bytes (32 hex chars)");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  // prefer rawEncode if available (no length prefix), otherwise use encode but strip prefix
  let encoded;
  if (enc.rawEncode) {
    encoded = enc.rawEncode(bytes);
  } else if (enc.encode) {
    // encode returns a length-prefixed string like "16:..." — strip prefix
    const pref = enc.encode(bytes);
    const idx = pref.indexOf(":");
    encoded = idx === -1 ? pref : pref.slice(idx + 1);
  } else {
    throw new Error("Encoding does not support raw encoding");
  }
  return encoded.split("").reverse().join("");
}

export function decodeUUID(encodingName, encodedReversed) {
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`Unknown encoding: ${encodingName}`);
  const encoded = encodedReversed.split("").reverse().join("");
  if (enc.rawDecode) {
    return enc.rawDecode(encoded, 16);
  }
  // prefer calling decode directly for encodings that accept a raw string (like base91)
  if (enc.decode) {
    return enc.decode(encoded);
  }
  throw new Error("Encoding does not support decode");
}

export { listEncodings };

// Ensure main export works as before when run as CLI
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
