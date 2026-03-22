// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, score } from "../../src/lib/main.js";

describe("Scoring formula", () => {
  test("uses remaining fuel and velocity bonus", () => {
    const initial = createState({ altitude: 10, velocity: 0, fuel: 25 });
    const last = { altitude: 0, velocity: 2, fuel: 15, tick: 1, landed: true, crashed: false };
    const trace = [initial, last];
    const result = score(trace, initial);
    const expected = 15 * 10 + Math.max(0, (4 - Math.abs(2)) * 25); // 150 + 50 = 200
    expect(result).toBe(expected);
  });
});
