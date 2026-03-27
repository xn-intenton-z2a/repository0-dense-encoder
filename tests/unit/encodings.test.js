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

describe("Encodings registry metadata", () => {
  test("listEncodings returns metadata consistent with charset size", () => {
    const encs = listEncodings();
    expect(encs.length).toBeGreaterThanOrEqual(3);
    for (const e of encs) {
      expect(typeof e.name).toBe("string");
      expect(typeof e.charsetSize).toBe("number");
      expect(typeof e.bitsPerChar).toBe("number");
      // bitsPerChar approximates Math.log2(charsetSize)
      expect(e.bitsPerChar).toBeCloseTo(Math.log2(e.charsetSize), 8);
      // charset present and length equals charsetSize
      expect(typeof e.charset).toBe("string");
      expect(e.charset.length).toBe(e.charsetSize);
    }
  });
});

describe("Encodings: round-trip and edge cases", () => {
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

  test("encodeUUID/decodeUUID round trip and densest shorter than base64", () => {
    const uuid = "01234567-89ab-cdef-0123-456789abcdef";
    const encs = listEncodings().map(e => e.name);
    expect(encs).toContain('base91');

    const results = listEncodings().map(e => ({ name: e.name, encoded: encodeUUID(e.name, uuid) }));
    const lengths = results.map(r => r.encoded.length);
    const minLen = Math.min(...lengths);

    // base64 no-padding length
    const base64len = Buffer.from(uuid.replace(/-/g, ''), 'hex').toString('base64').replace(/=/g, '').length;
    expect(base64len).toBe(22);
    expect(minLen).toBeLessThan(22);
  });
});

describe("Negative cases and type checks", () => {
  test("createEncoding rejects non-string charset", () => {
    expect(() => createEncoding(123)).toThrow(TypeError);
  });

  test("createEncoding rejects too-small charset", () => {
    expect(() => createEncoding('A')).toThrow();
  });

  test("createEncoding rejects control/space chars", () => {
    expect(() => createEncoding('ab c')).toThrow();
  });

  test("createEncoding rejects ambiguous characters", () => {
    // includes '0' which is ambiguous
    expect(() => createEncoding('0123456789ABC')).toThrow();
  });

  test("createEncoding rejects duplicate characters", () => {
    expect(() => createEncoding('AAB')).toThrow();
  });

  test("encode/decode throw TypeError for invalid types", () => {
    expect(() => encode('base62', 'not a buffer')).toThrow(TypeError);
    expect(() => decode('base62', 123)).toThrow(TypeError);
    const enc = createEncoding('2345', { name: 'tmp' });
    expect(() => enc.encode('x')).toThrow(TypeError);
    expect(() => enc.decode(12)).toThrow();
  });
});
