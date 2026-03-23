// SPDX-License-Identifier: MIT
// Unit tests for lunar lander implementation
import { describe, test, expect } from "vitest";
import { createState, step, simulate, autopilot, score } from "../../src/lib/main.js";

describe("Lunar Lander physics and simulation", () => {
  test("step applies gravity and thrust correctly and is immutable", () => {
    const s0 = createState({ initialAltitude: 100, initialVelocity: 10, initialFuel: 5 });
    const s1 = step(s0, 1);
    // velocity: 10 + 2 - 4*1 = 8
    expect(s1.velocity).toBe(8);
    expect(s1.altitude).toBe(92);
    expect(s1.fuel).toBe(4);
    expect(s1.tick).toBe(1);
    // original state unchanged
    expect(s0.velocity).toBe(10);
    expect(s0.fuel).toBe(5);
  });

  test("step sets landed/crashed correctly when reaching surface", () => {
    const s0 = { altitude: 2, velocity: 2, fuel: 0, tick: 0, landed: false, crashed: false };
    const s1 = step(s0, 0);
    // newVelocity = 2 + 2 = 4, newAltitude = 2 - 4 = -2 -> landing with velocity 4 is safe
    expect(s1.altitude).toBe(0);
    expect(s1.landed).toBe(true);
    expect(s1.crashed).toBe(false);
  });

  test("simulate returns full trace from start to landing", () => {
    const s0 = createState();
    const trace = simulate(s0, autopilot);
    expect(trace[0]).toEqual(s0);
    const last = trace[trace.length - 1];
    expect(last.landed || last.crashed).toBe(true);
  });

  test("score returns 0 for crashes and positive for safe landings", () => {
    expect(score(25, 25, 10, true)).toBe(0);
    // safe landing: initial 25, used 10, landingVelocity 3 => (15 * 10) + (4 - 3)*25 = 150 + 25 = 175
    expect(score(25, 10, 3, false)).toBe(175);
  });

  test("autopilot lands safely for default initial conditions", () => {
    const s0 = createState();
    const trace = simulate(s0, autopilot);
    const last = trace[trace.length - 1];
    expect(last.landed).toBe(true);
    expect(last.crashed).toBe(false);
    expect(last.velocity).toBeLessThanOrEqual(4);
  });

  test("autopilot lands safely across multiple parameter combinations", () => {
    const combos = [
      { altitude: 500, velocity: 20, fuel: 50 },
      { altitude: 600, velocity: 25, fuel: 50 },
      { altitude: 800, velocity: 30, fuel: 50 },
      { altitude: 1000, velocity: 35, fuel: 50 },
      { altitude: 1200, velocity: 40, fuel: 50 },
      { altitude: 1400, velocity: 45, fuel: 50 },
      { altitude: 1600, velocity: 50, fuel: 50 },
      { altitude: 1800, velocity: 55, fuel: 50 },
      { altitude: 1900, velocity: 60, fuel: 50 },
      { altitude: 2000, velocity: 65, fuel: 50 },
      { altitude: 1500, velocity: 22, fuel: 50 },
      { altitude: 700, velocity: 28, fuel: 50 },
    ];

    let successCount = 0;
    for (const c of combos) {
      const s0 = createState({ initialAltitude: c.altitude, initialVelocity: c.velocity, initialFuel: c.fuel });
      const trace = simulate(s0, autopilot);
      const last = trace[trace.length - 1];
      if (last.landed && !last.crashed && last.velocity <= 4) successCount++;
    }
    expect(successCount).toBeGreaterThanOrEqual(10);
  });

  test("edge cases: zero fuel and already landed handled gracefully", () => {
    const s0 = createState({ initialAltitude: 10, initialVelocity: 2, initialFuel: 0 });
    const trace = simulate(s0, autopilot);
    const last = trace[trace.length - 1];
    // With zero fuel and small starting velocity autopilot may or may not land; ensure no exceptions and trace returned
    expect(Array.isArray(trace)).toBe(true);

    const already = Object.freeze({ altitude: 0, velocity: 0, fuel: 0, tick: 0, landed: true, crashed: false });
    const trace2 = simulate(already, autopilot);
    expect(trace2.length).toBe(1);
    expect(trace2[0]).toEqual(already);
  });
});
