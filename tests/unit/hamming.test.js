// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { hammingString, hammingBits } from "../../src/lib/main.js";

describe("Hamming (strings)", () => {
  test("karolin vs kathrin -> 3", () => {
    expect(hammingString("karolin", "kathrin")).toBe(3);
  });

  test("empty strings -> 0", () => {
    expect(hammingString("", "")).toBe(0);
  });

  test("unequal-length strings throws RangeError", () => {
    expect(() => hammingString("a", "")).toThrow(RangeError);
  });

  test("non-string inputs throw TypeError", () => {
    expect(() => hammingString(null, "a")).toThrow(TypeError);
    expect(() => hammingString(123, 456)).toThrow(TypeError);
  });

  test("Unicode astral characters handled as code points", () => {
    const a = `a\u{1F600}b`; // a😀b
    const b = `a\u{1F601}b`; // a😁b
    expect(hammingString(a, b)).toBe(1);
    // surrogate pair equality
    expect(hammingString("\u{1F600}", "\u{1F600}")).toBe(0);
  });
});

describe("Hamming (bits)", () => {
  test("1 vs 4 -> 2", () => {
    expect(hammingBits(1, 4)).toBe(2);
  });

  test("0 vs 0 -> 0", () => {
    expect(hammingBits(0, 0)).toBe(0);
  });

  test("non-integer inputs throw TypeError", () => {
    expect(() => hammingBits(1.5, 2)).toThrow(TypeError);
    expect(() => hammingBits("1", 2)).toThrow(TypeError);
    // BigInt is not accepted as a number here
    expect(() => hammingBits(1n, 0)).toThrow(TypeError);
  });

  test("negative inputs throw RangeError", () => {
    expect(() => hammingBits(-1, 0)).toThrow(RangeError);
    expect(() => hammingBits(0, -2)).toThrow(RangeError);
  });

  test("large integers work (32+ bits)", () => {
    expect(hammingBits(2 ** 32, 0)).toBe(1);
    expect(hammingBits(255, 0)).toBe(8);
  });
});
