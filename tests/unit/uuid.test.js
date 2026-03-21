// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { listEncodings, encodeUuidShorthand, decodeUuidShorthand } from "../../src/lib/main.js";

describe("UUID shorthand and comparison", () => {
  test("round-trip UUID shorthand for all encodings", () => {
    const uuid = '01234567-89ab-cdef-0123-456789abcdef';
    const encs = listEncodings().map(e => e.name);
    for (const enc of encs) {
      const encoded = encodeUuidShorthand(uuid, enc);
      const back = decodeUuidShorthand(encoded, enc);
      expect(back).toBe(uuid.toLowerCase());
    }
  });

  test("densest encoding produces fewer than 22 chars for a UUID", () => {
    const uuid = '01234567-89ab-cdef-0123-456789abcdef';
    const encs = listEncodings();
    let minLen = Infinity;
    for (const e of encs) {
      const encoded = encodeUuidShorthand(uuid, e.name);
      if (encoded.length < minLen) minLen = encoded.length;
    }
    expect(minLen).toBeLessThan(22);
  });
});
