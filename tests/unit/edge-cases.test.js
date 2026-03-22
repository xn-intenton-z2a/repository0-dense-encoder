// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, simulate, autopilot, score } from "../../src/lib/main.js";

describe("Edge cases", () => {
  test("zero fuel initial state does not throw and returns numeric score", () => {
    const initial = createState({ altitude: 10, velocity: 2, fuel: 0 });
    const trace = simulate(initial, () => 0);
    const last = trace[trace.length - 1];
    expect(last).toBeTruthy();
    // score should not throw and should return a non-negative number
    const s = score(trace, initial);
    expect(typeof s).toBe("number");
    expect(s).toBeGreaterThanOrEqual(0);
  });

  test("already landed initial state returns immediate trace", () => {
    const initial = createState({ altitude: 0, velocity: 0, fuel: 5 });
    const trace = simulate(initial, autopilot);
    expect(trace.length).toBe(1);
    expect(trace[0].landed).toBe(true);
    expect(trace[0].crashed).toBe(false);
  });
});
