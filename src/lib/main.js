#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js — Dense binary-to-text encodings

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
  } catch (e) {
    pkg = { name: document.title || "repo", version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

// --- Encoding core ---

const ENCODINGS = new Map();
let customCounter = 0;

function bitsPerCharFor(base) {
  return Math.log2(base);
}

function validateCharset(charset, { allowAmbiguous = false } = {}) {
  if (typeof charset !== "string") throw new TypeError("charset must be a string");
  if (charset.length < 2) throw new Error("charset must contain at least 2 characters");
  const set = new Set(charset);
  if (set.size !== charset.length) throw new Error("charset must not contain duplicate characters");
  for (const ch of charset) {
    const code = ch.codePointAt(0);
    // Accept printable ASCII U+0021 (!) to U+007E (~)
    if (code < 0x21 || code > 0x7e) throw new Error("charset contains non-printable or out-of-range characters");
  }
  if (!allowAmbiguous) {
    const ambiguous = new Set(["0", "O", "1", "l", "I"]);
    for (const ch of charset) {
      if (ambiguous.has(ch)) throw new Error("charset contains ambiguous character(s) (0/O, 1/l/I) which are disallowed for custom encodings");
    }
  }
  return true;
}

function makeAlphabetMap(charset) {
  const map = new Map();
  for (let i = 0; i < charset.length; i++) map.set(charset[i], i);
  return map;
}

function encodeToBase(uint8array, charset) {
  if (!(uint8array instanceof Uint8Array)) throw new TypeError("input must be a Uint8Array");
  const base = BigInt(charset.length);
  if (uint8array.length === 0) return "";
  // Count leading zeros
  let leadingZeros = 0;
  while (leadingZeros < uint8array.length && uint8array[leadingZeros] === 0) leadingZeros++;

  // Convert bytes to BigInt
  let value = 0n;
  for (let i = 0; i < uint8array.length; i++) {
    value = (value << 8n) + BigInt(uint8array[i]);
  }

  // Convert BigInt to base-N string
  let chars = [];
  while (value > 0n) {
    const rem = value % base;
    chars.push(charset[Number(rem)]);
    value = value / base;
  }

  // Prepend one charset[0] for each leading zero byte
  for (let i = 0; i < leadingZeros; i++) chars.push(charset[0]);

  // The digits are generated least-significant-first
  return chars.reverse().join("");
}

function decodeFromBase(str, charset) {
  if (typeof str !== "string") throw new TypeError("input must be a string");
  if (str.length === 0) return new Uint8Array(0);
  const base = BigInt(charset.length);
  const alphabetMap = makeAlphabetMap(charset);

  // Count leading charset[0] characters -> leading zero bytes
  let leadingZeros = 0;
  while (leadingZeros < str.length && str[leadingZeros] === charset[0]) leadingZeros++;

  // Build BigInt value from the rest
  let value = 0n;
  for (let i = leadingZeros; i < str.length; i++) {
    const ch = str[i];
    const idx = alphabetMap.get(ch);
    if (idx === undefined) throw new Error(`invalid character '${ch}' for this alphabet`);
    value = value * base + BigInt(idx);
  }

  // Convert BigInt to bytes (big-endian)
  const bytes = [];
  while (value > 0n) {
    bytes.push(Number(value % 256n));
    value = value / 256n;
  }
  bytes.reverse();

  // Prepend leading zero bytes
  if (leadingZeros > 0) {
    const out = new Uint8Array(leadingZeros + bytes.length);
    for (let i = 0; i < leadingZeros; i++) out[i] = 0;
    for (let i = 0; i < bytes.length; i++) out[leadingZeros + i] = bytes[i];
    return out;
  }
  return new Uint8Array(bytes);
}

function registerEncoding(name, charset, { allowAmbiguous = true } = {}) {
  validateCharset(charset, { allowAmbiguous });
  const encoding = {
    name,
    charset,
    charsetSize: charset.length,
    bitsPerChar: bitsPerCharFor(charset.length),
    encode: (input) => encodeToBase(input, charset),
    decode: (str) => decodeFromBase(str, charset),
  };
  ENCODINGS.set(name, encoding);
  return encoding;
}

// --- Built-in encodings ---
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const Z85 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#"; // Z85-like
// Make a base91 alphabet: printable ASCII from 33 (!) upwards, 91 chars
let BASE91 = "";
for (let i = 0; i < 91; i++) BASE91 += String.fromCharCode(33 + i);

// Register built-ins (allow ambiguous characters here)
registerEncoding("base62", BASE62, { allowAmbiguous: true });
registerEncoding("base85", Z85, { allowAmbiguous: true });
registerEncoding("base91", BASE91, { allowAmbiguous: true });

export function listEncodings() {
  return Array.from(ENCODINGS.values()).map((e) => ({
    name: e.name,
    bitsPerChar: e.bitsPerChar,
    charsetSize: e.charsetSize,
    charset: e.charset,
  }));
}

export function createEncoding(charset, name) {
  // Name optional, auto-generate
  if (typeof charset !== "string") throw new TypeError("charset must be a string");
  customCounter += 1;
  const assignedName = name || `custom-${customCounter}`;
  if (ENCODINGS.has(assignedName)) throw new Error("encoding name already exists");
  // For custom encodings, disallow ambiguous characters by default
  registerEncoding(assignedName, charset, { allowAmbiguous: false });
  return assignedName;
}

export function encode(encodingName, input) {
  if (!ENCODINGS.has(encodingName)) throw new Error(`unknown encoding: ${encodingName}`);
  const enc = ENCODINGS.get(encodingName);
  return enc.encode(input);
}

export function decode(encodingName, str) {
  if (!ENCODINGS.has(encodingName)) throw new Error(`unknown encoding: ${encodingName}`);
  const enc = ENCODINGS.get(encodingName);
  return enc.decode(str);
}

// --- UUID shorthand ---
function hexToBytes(hex) {
  if (typeof hex !== "string") throw new TypeError("hex must be a string");
  if (hex.length % 2 !== 0) throw new Error("hex string must have even length");
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    out[i / 2] = Number.parseInt(hex.slice(i, i + 2), 16);
  }
  return out;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function normalizeUuid(uuid) {
  return uuid.toLowerCase();
}

export function encodeUuidShorthand(uuidString, encodingName) {
  if (typeof uuidString !== "string") throw new TypeError("uuid must be a string");
  const hex = uuidString.replace(/-/g, "").toLowerCase();
  if (hex.length !== 32) throw new Error("invalid UUID length");
  const bytes = hexToBytes(hex);
  const encoded = encode(encodingName, bytes);
  // Apply the mission-specified reverse step: reverse the encoded string
  return encoded.split("").reverse().join("");
}

export function decodeUuidShorthand(encodedString, encodingName) {
  if (typeof encodedString !== "string") throw new TypeError("encodedString must be a string");
  // Reverse back
  const reversed = encodedString.split("").reverse().join("");
  const bytes = decode(encodingName, reversed);
  if (bytes.length !== 16) throw new Error("decoded UUID must be 16 bytes");
  const hex = bytesToHex(bytes);
  // Format with dashes 8-4-4-4-12
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`.toLowerCase();
}

// --- CLI / main ---
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
