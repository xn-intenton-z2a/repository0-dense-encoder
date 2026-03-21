// SPDX-License-Identifier: MIT
// tests/unit/fizzbuzz.test.js
import { describe, test, expect } from "vitest";
import { fizzBuzz, fizzBuzzSingle } from "../../src/lib/main.js";

describe("FizzBuzz", () => {
  test("fizzBuzz(15) returns correct array", () => {
    expect(fizzBuzz(15)).toEqual([
      "1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"
    ]);
  });

  test("fizzBuzzSingle(3) returns 'Fizz'", () => {
    expect(fizzBuzzSingle(3)).toBe("Fizz");
  });

  test("fizzBuzzSingle(5) returns 'Buzz'", () => {
    expect(fizzBuzzSingle(5)).toBe("Buzz");
  });

  test("fizzBuzzSingle(15) returns 'FizzBuzz'", () => {
    expect(fizzBuzzSingle(15)).toBe("FizzBuzz");
  });

  test("fizzBuzzSingle(7) returns '7'", () => {
    expect(fizzBuzzSingle(7)).toBe("7");
  });

  test("fizzBuzz(0) returns []", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("negative inputs throw RangeError", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
    expect(() => fizzBuzzSingle(-3)).toThrow(RangeError);
  });

  test("non-integer inputs throw TypeError", () => {
    expect(() => fizzBuzz(3.5)).toThrow(TypeError);
    expect(() => fizzBuzzSingle(2.2)).toThrow(TypeError);
  });
});
