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

// ---------------------- Encoding library ----------------------
// Small, self-contained encoding registry that supports encode/decode
// for named encodings and a factory to create custom encodings.

const encodings = new Map();
let customCounter = 0;

function ensureUint8Array(data) {
  if (!(data instanceof Uint8Array)) throw new TypeError("data must be a Uint8Array");
}

function bytesToBigInt(bytes, start = 0) {
  let v = 0n;
  for (let i = start; i < bytes.length; i++) v = (v << 8n) | BigInt(bytes[i]);
  return v;
}

function bigIntToBytes(v) {
  if (v === 0n) return new Uint8Array([]);
  const out = [];
  while (v > 0n) {
    out.push(Number(v & 0xffn));
    v >>= 8n;
  }
  out.reverse();
  return Uint8Array.from(out);
}

function registerEncoding(name, charset, opts = {}) {
  if (encodings.has(name)) throw new Error(`encoding '${name}' already registered`);
  const base = charset.length;
  const map = Object.create(null);
  for (let i = 0; i < charset.length; i++) map[charset[i]] = i;
  const bitsPerChar = Math.log2(base);
  const meta = { name, charset, base, map, bitsPerChar };
  encodings.set(name, { meta, encode: opts.encode || defaultEncodeFactory(charset), decode: opts.decode || defaultDecodeFactory(charset) });
}

function defaultEncodeFactory(charset) {
  const base = charset.length;
  return function (data) {
    ensureUint8Array(data);
    if (data.length === 0) return "";
    // count leading zeros
    let lz = 0;
    while (lz < data.length && data[lz] === 0) lz++;
    const rest = data.subarray(lz);
    let v = bytesToBigInt(rest);
    let digits = [];
    const bigBase = BigInt(base);
    while (v > 0n) {
      const r = Number(v % bigBase);
      digits.push(charset[r]);
      v /= bigBase;
    }
    digits = digits.reverse().join("");
    if (digits === "") return charset[0].repeat(lz);
    return charset[0].repeat(lz) + digits;
  };
}

function defaultDecodeFactory(charset) {
  const base = charset.length;
  const map = Object.create(null);
  for (let i = 0; i < charset.length; i++) map[charset[i]] = i;
  return function (str) {
    if (typeof str !== "string") throw new TypeError("encoded must be a string");
    if (str.length === 0) return new Uint8Array([]);
    // leading zeros preservation (charset[0])
    let lz = 0;
    while (lz < str.length && str[lz] === charset[0]) lz++;
    const rest = str.slice(lz);
    if (rest.length === 0) return new Uint8Array(lz);
    let v = 0n;
    const bigBase = BigInt(base);
    for (const ch of rest) {
      const idx = map[ch];
      if (idx === undefined) throw new Error(`invalid character '${ch}' for charset`);
      v = v * bigBase + BigInt(idx);
    }
    const restBytes = bigIntToBytes(v);
    const out = new Uint8Array(lz + restBytes.length);
    for (let i = 0; i < lz; i++) out[i] = 0;
    out.set(restBytes, lz);
    return out;
  };
}

// Z85 / base85 alphabet taken from library/Z85.md (ZeroMQ Z85)
const Z85_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";
// Base62 as mission-specified ordering: digits then lowercase then uppercase
const BASE62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// base91 alphabet from library/BASE91.md
const BASE91_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\""; // includes double-quote at end
// base94: printable ASCII 33 (!) .. 126 (~) inclusive
let BASE94_ALPHABET = (() => {
  const chars = [];
  for (let c = 33; c <= 126; c++) chars.push(String.fromCharCode(c));
  return chars.join("");
})();

// base91 requires an accumulator algorithm (13/14-bit rule)
function encodeBase91(bytes) {
  const ENCTAB = BASE91_ALPHABET;
  let ebq = 0;
  let en = 0;
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    ebq |= bytes[i] << en;
    en += 8;
    if (en > 13) {
      let ev = ebq & 8191; // 13 bits
      if (ev > 88) {
        ebq >>= 13;
        en -= 13;
      } else {
        ev = ebq & 16383; // 14 bits
        ebq >>= 14;
        en -= 14;
      }
      out += ENCTAB[ev % 91];
      out += ENCTAB[Math.floor(ev / 91)];
    }
  }
  if (en > 0) {
    out += ENCTAB[ebq % 91];
    if (en > 7 || ebq > 90) out += ENCTAB[Math.floor(ebq / 91)];
  }
  return out;
}

function decodeBase91(str) {
  const DECTAB = Object.create(null);
  for (let i = 0; i < BASE91_ALPHABET.length; i++) DECTAB[BASE91_ALPHABET[i]] = i;
  let v = -1;
  let b = 0;
  let n = 0; // bit count
  const out = [];
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    const dv = DECTAB[c];
    if (dv === undefined) throw new Error(`invalid character '${c}' in base91 input`);
    if (v === -1) {
      v = dv;
    } else {
      v = v + dv * 91;
      let nbits = (v & 8191) > 88 ? 13 : 14;
      b |= v << n;
      n += nbits;
      while (n >= 8) {
        out.push(b & 255);
        b >>= 8;
        n -= 8;
      }
      v = -1;
    }
  }
  if (v !== -1) {
    b |= v << n;
    n += 13;
    while (n >= 8) {
      out.push(b & 255);
      b >>= 8;
      n -= 8;
    }
  }
  return Uint8Array.from(out);
}

// Register built-in encodings
registerEncoding("base62", BASE62_ALPHABET);
registerEncoding("base85", Z85_ALPHABET);
registerEncoding("base94", BASE94_ALPHABET);
registerEncoding("base91", BASE91_ALPHABET, { encode: encodeBase91, decode: decodeBase91 });

export function listEncodings() {
  const out = [];
  for (const [k, v] of encodings) {
    out.push({ name: k, bitsPerChar: v.meta.bitsPerChar, charsetSize: v.meta.base });
  }
  return out;
}

export function encode(encodingOrName, data) {
  if (typeof encodingOrName === "string") {
    const entry = encodings.get(encodingOrName);
    if (!entry) throw new Error(`unknown encoding '${encodingOrName}'`);
    return entry.encode(data);
  }
  if (encodingOrName && typeof encodingOrName.encode === "function") {
    return encodingOrName.encode(data);
  }
  throw new TypeError("first argument must be encoding name or encoding object");
}

export function decode(encodingOrName, str) {
  if (typeof encodingOrName === "string") {
    const entry = encodings.get(encodingOrName);
    if (!entry) throw new Error(`unknown encoding '${encodingOrName}'`);
    return entry.decode(str);
  }
  if (encodingOrName && typeof encodingOrName.decode === "function") {
    return encodingOrName.decode(str);
  }
  throw new TypeError("first argument must be encoding name or encoding object");
}

export function createEncoding(charset) {
  if (typeof charset !== "string") throw new TypeError("charset must be a string of unique printable characters");
  // Validate printable ASCII range (no control characters, no space)
  for (const ch of charset) {
    const code = ch.charCodeAt(0);
    if (code < 33 || code > 126) throw new Error("charset contains non-printable characters");
  }
  // Disallow ambiguous characters per requirements for custom encodings
  const ambiguous = new Set(["0", "O", "1", "l", "I"]);
  for (const ch of charset) if (ambiguous.has(ch)) throw new Error("custom charset must not contain visually-ambiguous characters (0/O/1/l/I)");
  // Uniqueness
  const seen = new Set();
  for (const ch of charset) {
    if (seen.has(ch)) throw new Error("charset contains duplicate characters");
    seen.add(ch);
  }
  const name = `custom-${++customCounter}`;
  registerEncoding(name, charset);
  const entry = encodings.get(name);
  return { name, encode: entry.encode, decode: entry.decode, meta: entry.meta };
}

// UUID helpers
function hexToBytes(hex) {
  if (hex.length % 2 !== 0) throw new Error("hex string must have even length");
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function encodeUuid(encodingOrName, uuidStr) {
  if (typeof uuidStr !== "string") throw new TypeError("uuid must be a string");
  const hex = uuidStr.replace(/-/g, "").toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) throw new Error("invalid uuid string");
  const bytes = hexToBytes(hex);
  const enc = encode(encodingOrName, bytes);
  // mission specifies: strip dashes, encode 16 bytes, and reverse
  return enc.split("").reverse().join("");
}

export function decodeUuid(encodingOrName, encodedStr) {
  if (typeof encodedStr !== "string") throw new TypeError("encoded must be a string");
  const rev = encodedStr.split("").reverse().join("");
  const bytes = decode(encodingOrName, rev);
  if (bytes.length !== 16) throw new Error("decoded uuid must be 16 bytes");
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// make sure CLI entrypoint still works
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
