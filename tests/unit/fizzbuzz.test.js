// SPDX-License-Identifier: MIT
// Tests for FizzBuzz functions
import { describe, test, expect } from "vitest";
import { fizzBuzz, fizzBuzzSingle } from "../../src/lib/main.js";

describe("FizzBuzz core", () => {
  test("fizzBuzz(15) returns a 15-element array ending with FizzBuzz", () => {
    const expected = [
      "1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz",
    ];
    expect(fizzBuzz(15)).toEqual(expected);
  });

  test("fizzBuzzSingle basic cases", () => {
    expect(fizzBuzzSingle(3)).toBe("Fizz");
    expect(fizzBuzzSingle(5)).toBe("Buzz");
    expect(fizzBuzzSingle(15)).toBe("FizzBuzz");
    expect(fizzBuzzSingle(7)).toBe("7");
  });

  test("fizzBuzz(0) returns an empty array", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("negative numbers throw RangeError", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
    expect(() => fizzBuzzSingle(-5)).toThrow(RangeError);
  });

  test("non-integers throw TypeError", () => {
    expect(() => fizzBuzz(2.5)).toThrow(TypeError);
    expect(() => fizzBuzzSingle(2.5)).toThrow(TypeError);
    expect(() => fizzBuzz('15')).toThrow(TypeError);
    expect(() => fizzBuzzSingle('3')).toThrow(TypeError);
  });
});
