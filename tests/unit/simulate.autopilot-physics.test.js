// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, simulate, autopilot, score } from "../../src/lib/main.js";

describe("Simulate autopilot physics correctness", () => {
  test("physics crash remains crashed when autopilot cannot save it", () => {
    const initial = createState({ altitude: 1000, velocity: 80, fuel: 10 });
    const trace = simulate(initial, autopilot);
    const last = trace[trace.length - 1];
    // Expect a physics crash (landed true, crashed true) and score 0
    expect(last.landed).toBe(true);
    expect(last.crashed).toBe(true);
    expect(score(trace, initial)).toBe(0);
  });
});
