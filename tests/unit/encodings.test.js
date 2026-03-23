// SPDX-License-Identifier: MIT
// Unit tests for the dense-encoding library
import { describe, test, expect } from "vitest";
import { encode, decode, listEncodings, createEncoding, encodeUuid } from "../../src/lib/main.js";

function eq(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

const encNames = ["base62", "base85", "base91", "base94"];

describe("Encodings round-trip and edge cases", () => {
  test("empty buffer round-trips for built-ins", () => {
    const data = new Uint8Array([]);
    for (const n of encNames) {
      const s = encode(n, data);
      const out = decode(n, s);
      expect(eq(out, data)).toBe(true);
    }
  });

  test("single byte, all-zero, all-0xFF round-trips", () => {
    const cases = [new Uint8Array([0x00]), new Uint8Array(16).fill(0x00), new Uint8Array(16).fill(0xff), new Uint8Array([0x7a])];
    for (const n of encNames) {
      for (const c of cases) {
        const s = encode(n, c);
        const out = decode(n, s);
        expect(eq(out, c)).toBe(true);
      }
    }
  });

  test("random buffers round-trip (deterministic samples)", () => {
    const samples = [
      new Uint8Array([1,2,3,4,5,6,7,8]),
      new Uint8Array([0,1,0,2,0,3,0,4]),
      new Uint8Array([255,0,127,64,32,16])
    ];
    for (const n of encNames) {
      for (const s of samples) {
        const enc = encode(n, s);
        const dec = decode(n, enc);
        expect(eq(dec, s)).toBe(true);
      }
    }
  });
});

describe("Custom encoding factory", () => {
  test("can create a custom encoding and round-trip", () => {
    // charset excludes ambiguous characters (0,O,1,l,I) and is printable
    const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"; // base58-ish
    const enc = createEncoding(charset);
    const data = new Uint8Array([0,1,2,3,4,5,255]);
    const s = enc.encode(data);
    const out = enc.decode(s);
    expect(out).toBeInstanceOf(Uint8Array);
    expect(out.length).toBe(data.length);
    expect(Array.from(out)).toEqual(Array.from(data));
  });
});

describe("Encodings metadata and UUID length comparison", () => {
  test("listEncodings returns metadata", () => {
    const list = listEncodings();
    for (const name of encNames) {
      const m = list.find(x => x.name === name);
      expect(m).toBeTruthy();
      expect(typeof m.bitsPerChar).toBe("number");
      expect(typeof m.charsetSize).toBe("number");
    }
  });

  test("densest encoding produces UUID shorter than base64 (22 chars)", () => {
    // sample v4-like uuid hex
    const uuid = "01234567-89ab-cdef-0123-456789abcdef";
    const list = listEncodings();
    // pick densest by bitsPerChar
    list.sort((a,b) => b.bitsPerChar - a.bitsPerChar);
    const densest = list[0].name;
    const encoded = encodeUuid(densest, uuid);
    expect(encoded.length).toBeLessThan(22);
  });
});
