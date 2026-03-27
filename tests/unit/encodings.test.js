// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { encode, decode, createEncoding, listEncodings, encodeUUID, decodeUUID } from "../../src/lib/main.js";
import { randomBytes } from "crypto";

function eq(a, b) {
  expect(a).toBeInstanceOf(Uint8Array);
  expect(b).toBeInstanceOf(Uint8Array);
  expect(a.length).toBe(b.length);
  for (let i = 0; i < a.length; i++) expect(a[i]).toBe(b[i]);
}

describe("Encodings: round-trip and UUID comparison", () => {
  test("built-in encodings round-trip for edge cases", () => {
    const encs = listEncodings().map(e => e.name);
    const cases = [
      new Uint8Array([]),
      new Uint8Array(16).fill(0),
      new Uint8Array(16).fill(0xff),
      new Uint8Array([0x00]),
      new Uint8Array([0xff]),
      randomBytes(15),
      randomBytes(32)
    ];

    for (const name of encs) {
      for (const c of cases) {
        const encoded = encode(name, c);
        const decoded = decode(name, encoded);
        eq(decoded, c);
      }
    }
  });

  test("custom encoding can be created and round-trips", () => {
    // charset excludes ambiguous characters 0/O and 1/l/I
    const charset = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz!#$%&()*+,-./:;<=>?@_";
    const enc = createEncoding(charset, { name: 'custom-test' });
    const inbuf = randomBytes(20);
    const encoded = enc.encode(inbuf);
    const out = enc.decode(encoded);
    expect(out).toBeInstanceOf(Uint8Array);
    expect(out.length).toBe(inbuf.length);
    for (let i = 0; i < out.length; i++) expect(out[i]).toBe(inbuf[i]);
  });

  test("UUID encoding: densest encoding shorter than base64 (22)", () => {
    const uuid = "01234567-89ab-cdef-0123-456789abcdef";
    const base62 = encodeUUID('base62', uuid);
    const base85 = encodeUUID('base85', uuid);
    const base91 = encodeUUID('base91', uuid);
    expect(base62.length).toBeGreaterThan(0);
    expect(base85.length).toBeGreaterThan(0);
    expect(base91.length).toBeGreaterThan(0);
    // densest (base91) should be shorter than base64 no-padding length (22)
    expect(base91.length).toBeLessThan(22);
  });

  test("encodeUUID/decodeUUID round trip", () => {
    const uuid = "01234567-89ab-cdef-0123-456789abcdef";
    const enc = 'base91';
    const e = encodeUUID(enc, uuid);
    const decoded = decodeUUID(enc, e);
    // decoded is Uint8Array of 16 bytes
    expect(decoded.length).toBe(16);
    // hex compare
    const hex = Array.from(decoded).map(b => b.toString(16).padStart(2, '0')).join('');
    expect(hex).toBe(uuid.replace(/-/g, ''));
  });
});
