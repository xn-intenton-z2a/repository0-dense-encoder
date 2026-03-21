// SPDX-License-Identifier: MIT
// Dedicated tests for encode/decode round-trip across built-in and custom encodings
import { describe, test, expect } from "vitest";
import { listEncodings, encode, decode, defineEncoding } from "../../src/lib/main.js";

function asArray(u) { return Array.from(u); }

describe("encode/decode round-trip", () => {
  test("edge cases round-trip across encodings", () => {
    const encNames = listEncodings().map(e => e.name);
    const cases = [
      new Uint8Array([]),
      new Uint8Array([0]),
      new Uint8Array([1]),
      new Uint8Array(16).fill(0),
      new Uint8Array(16).fill(0xFF),
    ];

    for (const enc of encNames) {
      for (const c of cases) {
        const s = encode(c, enc);
        const out = decode(s, enc);
        expect(asArray(out)).toEqual(asArray(c));
      }
    }
  });

  test("random buffers round-trip", () => {
    const encNames = listEncodings().map(e => e.name);
    for (const enc of encNames) {
      for (let t = 0; t < 5; t++) {
        const len = 1 + Math.floor(Math.random() * 64);
        const buf = new Uint8Array(len);
        for (let i = 0; i < len; i++) buf[i] = Math.floor(Math.random() * 256);
        const s = encode(buf, enc);
        const out = decode(s, enc);
        expect(asArray(out)).toEqual(asArray(buf));
      }
    }
  });

  test("custom encodings work for non-trivial data", () => {
    defineEncoding('radix3', 'abc');
    const buf = new Uint8Array([0, 1, 2, 3, 4, 5, 250, 251]);
    const s = encode(buf, 'radix3');
    const out = decode(s, 'radix3');
    expect(asArray(out)).toEqual(asArray(buf));
  });
});
