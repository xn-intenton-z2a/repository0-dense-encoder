// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { encode, decode, listEncodings, encodeUUID } from "../../src/lib/main.js";

function ua(...nums) { return new Uint8Array(nums); }

describe("Encoders round-trip and edge cases", () => {
  const encs = listEncodings().map(e => e.name);
  const cases = [ua(), ua(0), ua(255), ua(0,1,2,3), ua(0,0,0,0,0,0,0,0), ua(255,255,255,255)];

  for (const enc of encs) {
    test(`${enc} round-trip for edge cases`, () => {
      for (const c of cases) {
        const out = encode(c, enc);
        const back = decode(out, enc);
        expect(Array.from(back)).toEqual(Array.from(c));
      }
    });
  }

  test("decode empty string returns empty Uint8Array", () => {
    for (const enc of encs) {
      const back = decode("", enc);
      expect(back instanceof Uint8Array).toBe(true);
      expect(back.length).toBe(0);
    }
  });

  test("listEncodings returns metadata", () => {
    const meta = listEncodings();
    expect(meta.length).toBeGreaterThanOrEqual(3);
    for (const m of meta) {
      expect(typeof m.name).toBe("string");
      expect(typeof m.bitsPerChar).toBe("number");
      expect(typeof m.charsetSize).toBe("number");
    }
  });

  test("densest encoding produces shorter-than-base64 UUID", () => {
    const sample = "01234567-89ab-cdef-0123-456789abcdef";
    const meta = listEncodings();
    const lengths = meta.map(m => ({ name: m.name, len: encodeUUID(sample, m.name).length, bits: m.bitsPerChar }));
    lengths.sort((a,b) => a.len - b.len);
    const min = lengths[0];
    // base64 (no padding) baseline is 22 chars for a 16-byte UUID
    expect(min.len).toBeLessThan(22);
  });
});
