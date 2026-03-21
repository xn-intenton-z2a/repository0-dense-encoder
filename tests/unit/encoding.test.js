// SPDX-License-Identifier: MIT
// Tests for encodings and UUID shorthand
import { describe, test, expect } from "vitest";
import { encode, decode, listEncodings, defineEncoding, uuidToShort, uuidFromShort } from "../../src/lib/main.js";

function uint8Equal(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

describe("Encoders round-trip and metadata", () => {
  const encs = listEncodings().map(e => e.name);

  test("listEncodings returns metadata for known encodings", () => {
    const meta = listEncodings();
    expect(meta.some(m => m.name === 'base62')).toBe(true);
    expect(meta.some(m => m.name === 'base85')).toBe(true);
    expect(meta.some(m => m.name === 'base91')).toBe(true);
  });

  test("round-trip: empty buffer, single byte, zeros, all-FF", () => {
    const cases = [new Uint8Array([]), new Uint8Array([0]), new Uint8Array([1]), new Uint8Array(16).fill(0), new Uint8Array(16).fill(0xFF)];
    for (const enc of encs) {
      for (const c of cases) {
        const s = encode(c, enc);
        const out = decode(s, enc);
        expect(uint8Equal(out, c)).toBe(true);
      }
    }
  });

  test("round-trip: randomized samples", () => {
    // generate some pseudo-random buffers
    for (const enc of encs) {
      for (let t = 0; t < 5; t++) {
        const len = 1 + Math.floor(Math.random() * 64);
        const buf = new Uint8Array(len);
        for (let i = 0; i < len; i++) buf[i] = Math.floor(Math.random() * 256);
        const s = encode(buf, enc);
        const out = decode(s, enc);
        expect(uint8Equal(out, buf)).toBe(true);
      }
    }
  });

  test("defineEncoding creates a usable custom encoding", () => {
    defineEncoding('bin2', 'ab');
    const v = new Uint8Array([0,1,2,3,4,5]);
    const s = encode(v, 'bin2');
    const out = decode(s, 'bin2');
    expect(uint8Equal(out, v)).toBe(true);
  });

  test("UUID shorthand round-trip and densest encoding < 22 chars", () => {
    const sample = '01234567-89ab-cdef-0123-456789abcdef';
    const encMeta = listEncodings();
    // pick densest
    const densest = encMeta.slice().sort((a,b) => b.bitsPerChar - a.bitsPerChar)[0];
    expect(densest.bitsPerChar).toBeGreaterThan(0);
    const short = uuidToShort(sample, densest.name);
    expect(short.length).toBeLessThan(22);
    const round = uuidFromShort(short, densest.name);
    expect(round.toLowerCase()).toBe(sample.toLowerCase());
  });
});
