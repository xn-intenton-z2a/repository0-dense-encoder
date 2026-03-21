// SPDX-License-Identifier: MIT
// Tests for UUID shorthand encoding/decoding
import { describe, test, expect } from "vitest";
import { listEncodings, uuidToShort, uuidFromShort } from "../../src/lib/main.js";

describe("UUID shorthand", () => {
  const sample = '01234567-89ab-cdef-0123-456789abcdef';

  test("densest encoding produces UUID shorter than base64 (22 chars) and round-trips", () => {
    const encMeta = listEncodings();
    const densest = encMeta.slice().sort((a, b) => b.bitsPerChar - a.bitsPerChar)[0];
    expect(densest).toBeTruthy();
    const short = uuidToShort(sample, densest.name);
    expect(short.length).toBeLessThan(22);
    const round = uuidFromShort(short, densest.name);
    expect(round.toLowerCase()).toBe(sample.toLowerCase());
  });

  test("invalid UUID string is rejected", () => {
    expect(() => uuidToShort('not-a-uuid', 'base62')).toThrow();
  });

  test("invalid short string is rejected when decoding", () => {
    expect(() => uuidFromShort('abc', 'base62')).toThrow();
  });
});
