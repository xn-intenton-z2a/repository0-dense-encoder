// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, step, simulate, autopilot, score } from "../../src/lib/main.js";

describe("Autopilot comprehensive coverage", () => {
  test("autopilot handles a variety of altitude/velocity/fuel combinations and lands safely for many", () => {
    const combos = [
      { altitude: 500, velocity: 20, fuel: 15 },
      { altitude: 600, velocity: 25, fuel: 18 },
      { altitude: 800, velocity: 30, fuel: 20 },
      { altitude: 1000, velocity: 35, fuel: 25 },
      { altitude: 1200, velocity: 40, fuel: 30 },
      { altitude: 1400, velocity: 45, fuel: 35 },
      { altitude: 1600, velocity: 50, fuel: 40 },
      { altitude: 1800, velocity: 55, fuel: 45 },
      { altitude: 1900, velocity: 60, fuel: 48 },
      { altitude: 2000, velocity: 65, fuel: 50 },
      { altitude: 1300, velocity: 70, fuel: 50 },
      { altitude: 1500, velocity: 80, fuel: 50 },
    ];

    let successCount = 0;

    for (const c of combos) {
      const s0 = createState({ initialAltitude: c.altitude, initialVelocity: c.velocity, initialFuel: c.fuel });
      const trace = simulate(s0, autopilot);
      const last = trace[trace.length - 1];

      // For any successful landing, velocity must be <= 4
      if (last.landed && !last.crashed) {
        expect(last.velocity).toBeLessThanOrEqual(4);
        successCount++;
      } else {
        // If crashed, scoring must be zero
        expect(last.crashed).toBe(true);
        const fuelUsed = c.fuel - last.fuel;
        expect(score(c.fuel, fuelUsed, last.velocity, true)).toBe(0);
      }
    }

    // Expect autopilot to land safely for at least 10 of these combinations
    expect(successCount).toBeGreaterThanOrEqual(10);
  });

  test("single-step physics: gravity and thrust apply correctly and state immutability", () => {
    const s0 = createState({ initialAltitude: 100, initialVelocity: 10, initialFuel: 5 });
    const s1 = step(s0, 2); // burn 2 units
    // velocity: 10 + 2 - 4*2 = 4
    expect(s1.velocity).toBe(4);
    expect(s1.altitude).toBe(96);
    expect(s1.fuel).toBe(3);
    expect(s1.tick).toBe(1);
    // original unchanged
    expect(s0.velocity).toBe(10);
    expect(s0.fuel).toBe(5);
  });
});
