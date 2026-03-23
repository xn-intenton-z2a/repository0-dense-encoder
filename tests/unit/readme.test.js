// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { createState, simulate, autopilot } from "../../src/lib/main.js";

describe("README example verification", () => {
  test("README example landing summary matches actual simulation output", () => {
    const readme = readFileSync("README.md", "utf8");
    // Find the JSON block that contains the demo summary
    const match = /```json\n([\s\S]*?)```/m.exec(readme);
    expect(match).not.toBeNull();
    const jsonText = match[1];
    const doc = JSON.parse(jsonText);

    const s0 = createState();
    const trace = simulate(s0, autopilot);
    const actualFinal = trace[trace.length - 1];

    // The README records the full summary with initial and final; compare the `final` objects
    expect(doc.final).toEqual(actualFinal);
    // and overall steps should match
    expect(doc.steps).toBe(trace.length - 1);
    expect(doc.initial).toEqual(trace[0]);
  });
});
