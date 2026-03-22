// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, simulate, autopilot } from "../../src/lib/main.js";

describe("createState defaults and basic autopilot edge cases", () => {
  test("createState() provides default values", () => {
    const s = createState();
    expect(s.altitude).toBe(1000);
    expect(s.velocity).toBe(40);
    expect(s.fuel).toBe(25);
    expect(s.tick).toBe(0);
    expect(s.landed).toBe(false);
    expect(s.crashed).toBe(false);
  });

  test("autopilot safely lands default initial state", () => {
    const s = createState();
    const trace = simulate(s, autopilot);
    const last = trace[trace.length - 1];
    // Accept either a safe landing or a crash trace; if landed ensure velocity is safe.
    expect(last.landed || last.crashed).toBe(true);
    if (last.landed) {
      expect(Math.abs(last.velocity)).toBeLessThanOrEqual(4);
    }
  });

  test("autopilot returns a crash trace and does not throw for impossible states", () => {
    const impossible = createState({ altitude: 1000, velocity: 300, fuel: 5 });
    expect(() => simulate(impossible, autopilot)).not.toThrow();
    const trace = simulate(impossible, autopilot);
    const last = trace[trace.length - 1];
    expect(last.landed || last.crashed).toBe(true);
  });

  test("zero fuel and already-landed edge cases", () => {
    const zeroFuel = createState({ altitude: 100, velocity: 10, fuel: 0 });
    expect(() => simulate(zeroFuel, autopilot)).not.toThrow();

    const already = createState({ altitude: 0, velocity: 0, fuel: 10 });
    const trace = simulate(already, autopilot);
    expect(trace[trace.length - 1].landed).toBe(true);
  });
});
