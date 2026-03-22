// SPDX-License-Identifier: MIT
// Lunar lander unit tests
import { describe, test, expect } from "vitest";
import { createState, step, simulate, autopilot, score } from "../../src/lib/main.js";

describe("Lander physics - step", () => {
  test("applies gravity when no thrust", () => {
    const s0 = createState({ altitude: 100, velocity: 10, fuel: 0 });
    const s1 = step(s0, 0);
    expect(s1.velocity).toBe(12); // 10 + 2
    expect(s1.altitude).toBe(88); // 100 - 12
    expect(s1.fuel).toBe(0);
    expect(s1.tick).toBe(1);
  });

  test("applies thrust and clamps fuel", () => {
    const s0 = createState({ altitude: 100, velocity: 10, fuel: 2 });
    const s1 = step(s0, 1);
    expect(s1.velocity).toBe(6); // 10 + 2 - 6
    expect(s1.altitude).toBe(94); // 100 - 6
    expect(s1.fuel).toBe(1);
    // burn more than available
    const s2 = step(s1, 10);
    expect(s2.fuel).toBe(0);
  });

  test("does not mutate input state", () => {
    const s0 = createState({ altitude: 50, velocity: 5, fuel: 1 });
    const copy = { ...s0 };
    const s1 = step(s0, 1);
    expect(s0).toEqual(copy);
    expect(s1).not.toBe(s0);
  });

  test("detects landing and crash", () => {
    // Safe landing
    const s0 = createState({ altitude: 2, velocity: 1, fuel: 0 });
    const s1 = step(s0, 0);
    expect(s1.landed).toBe(true);
    expect(s1.crashed).toBe(false);
    expect(s1.altitude).toBe(0);

    // Crash
    const s2 = createState({ altitude: 2, velocity: 10, fuel: 0 });
    const s3 = step(s2, 0);
    expect(s3.landed).toBe(true);
    expect(s3.crashed).toBe(true);
  });
});

describe("Simulation and controller behaviour", () => {
  test("simulate runs to completion and does not call controller after landing", () => {
    let calls = 0;
    const controller = (st) => {
      calls++;
      // burn nothing; gravity will eventually land/crash
      return 0;
    };
    const initial = createState({ altitude: 10, velocity: 2, fuel: 0 });
    const trace = simulate(initial, controller);
    // ensure we have at least one controller call and loop terminated
    expect(trace.length).toBeGreaterThan(1);
    const last = trace[trace.length - 1];
    expect(last.landed || last.crashed).toBe(true);
    // controller called exactly trace.length-1 times (once per tick while running)
    expect(calls).toBe(trace.length - 1);
  });
});

describe("Autopilot safety across sample combos", () => {
  test("autopilot lands safely for a variety of initial conditions", () => {
    const combos = [
      { altitude: 500, velocity: 20, fuel: 10 },
      { altitude: 600, velocity: 30, fuel: 10 },
      { altitude: 700, velocity: 40, fuel: 15 },
      { altitude: 800, velocity: 50, fuel: 20 },
      { altitude: 900, velocity: 60, fuel: 25 },
      { altitude: 1000, velocity: 70, fuel: 20 },
      { altitude: 1200, velocity: 80, fuel: 20 },
      { altitude: 1500, velocity: 35, fuel: 15 },
      { altitude: 2000, velocity: 25, fuel: 20 },
      { altitude: 1600, velocity: 45, fuel: 20 },
    ];

    for (const cfg of combos) {
      const st0 = createState(cfg);
      const trace = simulate(st0, autopilot);
      const last = trace[trace.length - 1];
      // If physically possible our greedy autopilot should land safely; assert landed and not crashed
      expect(last.landed).toBe(true);
      expect(last.crashed).toBe(false);
    }
  });
});

describe("Scoring", () => {
  test("score returns 0 for crashes", () => {
    const initial = createState({ altitude: 1, velocity: 10, fuel: 0 });
    const trace = simulate(initial, () => 0);
    expect(trace[trace.length - 1].crashed).toBe(true);
    expect(score(trace, initial)).toBe(0);
  });

  test("score computes remaining fuel and landing velocity bonus", () => {
    // choose a simple scenario that lands safely without fuel
    const initial = createState({ altitude: 1, velocity: 1, fuel: 0 });
    const trace = simulate(initial, () => 0);
    const last = trace[trace.length - 1];
    expect(last.landed).toBe(true);
    expect(last.crashed).toBe(false);
    // remaining fuel is 0, landing velocity should be 3 (1 + 2)
    const expected = 0 * 10 + Math.max(0, (4 - Math.abs(last.velocity)) * 25);
    expect(score(trace, initial)).toBe(expected);
  });
});
