// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, step } from "../../src/lib/main.js";

describe("Step flooring behaviour", () => {
  test("fractional thrust inputs are floored before burn/clamping", () => {
    const s0 = createState({ altitude: 1000, velocity: 40, fuel: 5 });
    const s1 = step(s0, 2.9);
    // burn should be floored to 2
    expect(s1.fuel).toBe(3);
    expect(s1.velocity).toBe(34); // 40 + 2 - 4*2
    expect(s1.altitude).toBe(966); // 1000 - 34
    expect(s1.tick).toBe(1);
  });
});
