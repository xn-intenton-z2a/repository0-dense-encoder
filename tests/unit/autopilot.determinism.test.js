// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { createState, simulate, autopilot } from "../../src/lib/main.js";

describe("Autopilot determinism", () => {
  test("simulate with autopilot is deterministic across runs", () => {
    const initial = createState({ altitude: 1000, velocity: 40, fuel: 25 });
    const a = simulate(initial, autopilot);
    const b = simulate(initial, autopilot);
    expect(a).toEqual(b);
  });
});
