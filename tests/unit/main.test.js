// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, hammingDistanceStrings, hammingDistanceIntegers } from "../../src/lib/main.js";

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Library Identity", () => {
  test("exports name, version, and description", () => {
    expect(typeof name).toBe("string");
    expect(typeof version).toBe("string");
    expect(typeof description).toBe("string");
    expect(name.length).toBeGreaterThan(0);
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test("getIdentity returns correct structure", () => {
    const identity = getIdentity();
    expect(identity).toEqual({ name, version, description });
  });
});

describe('Hamming distances', () => {
  test('string hamming: karolin vs kathrin => 3', () => {
    expect(hammingDistanceStrings('karolin', 'kathrin')).toBe(3);
  });

  test('string hamming: empty strings => 0', () => {
    expect(hammingDistanceStrings('', '')).toBe(0);
  });

  test('string hamming: unequal lengths throws RangeError', () => {
    expect(() => hammingDistanceStrings('a', '')).toThrow(RangeError);
  });

  test('string hamming: non-strings throw TypeError', () => {
    expect(() => hammingDistanceStrings(1, 2)).toThrow(TypeError);
  });

  test('string hamming: unicode code points handled', () => {
    // '😊' is a single code point but two UTF-16 code units; ensure code point counting
    expect(hammingDistanceStrings('a😊c', 'a😃c')).toBe(1);
  });

  test('integer hamming: 1 vs 4 => 2', () => {
    expect(hammingDistanceIntegers(1, 4)).toBe(2);
  });

  test('integer hamming: 0 vs 0 => 0', () => {
    expect(hammingDistanceIntegers(0, 0)).toBe(0);
  });

  test('integer hamming: large integers', () => {
    expect(hammingDistanceIntegers(0b1010101010101010, 0b0101010101010101)).toBe(16);
  });

  test('integer hamming: negative throws RangeError', () => {
    expect(() => hammingDistanceIntegers(-1, 2)).toThrow(RangeError);
  });

  test('integer hamming: non-integers throw TypeError', () => {
    expect(() => hammingDistanceIntegers(1.5, 2)).toThrow(TypeError);
  });
});
