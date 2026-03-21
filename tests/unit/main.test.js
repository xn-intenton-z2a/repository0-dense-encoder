// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, hammingString, hammingInt } from "../../src/lib/main.js";

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

describe("hammingString", () => {
  test("basic example karolin vs kathrin -> 3", () => {
    expect(hammingString("karolin", "kathrin")).toBe(3);
  });

  test("empty strings -> 0", () => {
    expect(hammingString("", "")).toBe(0);
  });

  test("unicode code points handled correctly (emoji)", () => {
    const a = "a😊b"; // 3 code points
    const b = "a😃b"; // 3 code points, middle differs
    expect(hammingString(a, b)).toBe(1);
  });

  test("throws TypeError for non-strings", () => {
    expect(() => hammingString(null, "a")).toThrow(TypeError);
  });

  test("throws RangeError for unequal lengths", () => {
    expect(() => hammingString("a", "ab")).toThrow(RangeError);
  });
});

describe("hammingInt", () => {
  test("1 vs 4 -> 2", () => {
    expect(hammingInt(1, 4)).toBe(2);
  });

  test("0 vs 0 -> 0", () => {
    expect(hammingInt(0, 0)).toBe(0);
  });

  test("large integers", () => {
    expect(hammingInt(0xFFFFFFFF, 0)).toBe(32);
  });

  test("throws TypeError for non-integers", () => {
    expect(() => hammingInt(1.5, 2)).toThrow(TypeError);
  });

  test("throws RangeError for negative integers", () => {
    expect(() => hammingInt(-1, 2)).toThrow(RangeError);
  });
});
