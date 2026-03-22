# README_EXAMPLE

Purpose

Describe a short, reproducible example for the README showing how to run a simulation and demonstrating a successful landing trace.

Description

The README should show how to import the library API (createState, simulate, autopilot) and run a short demo simulation, and include a brief excerpt of the resulting trace showing altitude, velocity and fuel followed by a final landed state with velocity ≤ 4. If a CLI demo is provided by the project, the README should document the invocation.

Example expectations

- The README includes a short usage section describing how to import and call createState and simulate with autopilot, and how to run tests (npm test).
- The README includes a small example trace excerpt (6–12 states) demonstrating a successful landing where the final state has landed true and velocity ≤ 4.

Acceptance criteria

- [ ] README.md contains a usage section that demonstrates simulate driven by the built-in autopilot (import createState, simulate, autopilot and run simulate(createState(), autopilot)).
- [ ] README.md includes a reproducible example trace (6–12 states) for the default initial state showing altitude, velocity and fuel per state and final landed true with velocity ≤ 4. The example must be achievable by running the CLI or sample code.
- [ ] README.md documents how to run tests (npm test) and points to tests/unit/autopilot.test.js for validation.
