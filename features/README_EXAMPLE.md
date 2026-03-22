# README_EXAMPLE

Purpose

Describe a short, reproducible example for the README showing how to run a simulation and demonstrating a successful landing trace.

Description

The README must include a Usage section that demonstrates the minimal import and invocation required to run a simulation with the built-in autopilot and shows a short, reproducible excerpt of the simulation trace. Avoid long traces; show a 6–12 state excerpt that includes altitude, velocity and fuel for each shown state and the final landed state with velocity ≤ 4.

Guidelines for the snippet

- Provide a one-line import and invocation example showing simulate driven by autopilot, for example: import createState, simulate and autopilot from the library and call simulate(createState(), autopilot). Do not rely on undocumented CLI flags; the snippet must be reproducible by reading README and running the main example.
- Include a 6–12 state excerpt from a successful run of the default initial state (altitude 1000, velocity 40, fuel 25) that ends with landed true and Math.abs(velocity) <= 4.
- Explain how to run tests: include the command npm test and point readers to tests/unit/autopilot.sample-combos.test.js and tests/unit/autopilot.default.test.js for verification of the demo.

Acceptance criteria

- [ ] README.md contains a Usage section that demonstrates simulate driven by the built-in autopilot using a concise one-line example that readers can copy and run.
- [ ] README.md includes a reproducible simulation trace excerpt (6–12 states) for the default initial state showing altitude, velocity and fuel per state and final landed true with Math.abs(velocity) <= 4.
- [ ] README.md documents how to run the unit tests (npm test) and references the specific test files used to validate the autopilot demo.

Notes

- The example must be achievable by running the sample code; if a CLI demo is provided, ensure README documents the exact CLI invocation and expected output excerpt.