// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, simulate, autopilot } from "../../src/lib/main.js";

describe("Autopilot matrix of sample combos", () => {
  test("autopilot handles a matrix of combos without throwing and lands safely where possible", () => {
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
      // Ensure simulation returns a trace and does not throw; assert landing state booleans exist
      expect(typeof last.landed).toBe("boolean");
      expect(typeof last.crashed).toBe("boolean");
      // For these combos we expect the autopilot to produce a safe landing (as tested historically)
      expect(last.landed).toBe(true);
      expect(last.crashed).toBe(false);
    }
  });
});
