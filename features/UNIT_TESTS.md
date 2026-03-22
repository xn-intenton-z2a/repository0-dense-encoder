# UNIT_TESTS

Purpose

Define the unit test files required to validate the physics, autopilot guarantees, scoring, and documentation reproducibility; prioritise maintenance tests that close the current gaps.

Description

Unit tests must import named exports from src/lib/main.js and be deterministic. The set below describes required files, the assertions they must make, and which items are currently maintenance actions to add.

Required test files and their assertions

1) tests/unit/main.test.js
- Purpose: verify core named exports are importable and that CLI entry points (if exported) do not throw when invoked.
- Assertions:
  - Import named exports used by library consumers (createState, step, simulate, autopilot, score) and verify they are functions.

2) tests/unit/create_state.test.js
- Purpose: verify createState defaults and edge cases.
- Assertions:
  - createState() returns altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false.
  - createState allows overriding altitude, velocity and fuel without mutating overrides.

3) tests/unit/lander.test.js
- Purpose: validate autopilot across a representative sample and scoring correctness.
- Assertions:
  - Run simulate for a documented array of at least ten configuration triples (altitude, velocity, fuel). For each triple that is physically survivable the test asserts final.landed === true and final.crashed === false; for documented impossible triples assert final.crashed === true.
  - Scoring tests: for at least two safe traces assert score(trace, initialState) equals (initialFuel - fuelUsed) * 10 + Math.max(0, (4 - landingVelocity) * 25).

4) tests/unit/autopilot.determinism.test.js (MAINTENANCE)
- Purpose: ensure simulate + autopilot produce deterministic traces for identical inputs.
- Assertions:
  - For createState() and one additional survivable triple, run simulate(initialState, autopilot) twice and assert deepStrictEqual on the two traces.

5) tests/unit/autopilot.respect-fuel.test.js (MAINTENANCE)
- Purpose: ensure autopilot controller never requests more thrust than available in state.fuel.
- Assertions:
  - For a short scenario iterate the first N states, call autopilot(state) for each and assert Number.isInteger(thrust) and 0 <= thrust <= state.fuel.

6) tests/unit/readme.test.js (MAINTENANCE)
- Purpose: ensure README usage example remains reproducible and present.
- Assertions:
  - README.md contains exact substrings required for automated checks and the example excerpt's final state has landed true and Math.abs(velocity) <= 4.

7) tests/unit/coverage.assertion.test.js (optional but recommended)
- Purpose: fail fast if coverage drops under thresholds.
- Assertions:
  - Parse coverage report and assert lines >= 50% and branches >= 30%.

Acceptance criteria summary

- [x] main, createState, step, simulate, autopilot and score are importable as named exports and basic smoke tests exist.
- [x] createState defaults and immutability checks exist.
- [x] lander.test.js exists and documents the combos used to validate autopilot behaviour and scoring.
- [ ] tests/unit/autopilot.determinism.test.js has been added and asserts deep equality for repeated runs on at least two survivable inputs.
- [ ] tests/unit/autopilot.respect-fuel.test.js has been added and asserts controller-level fuel-respect for inspected states.
- [ ] tests/unit/readme.test.js has been added and asserts README contains the required import/invocation substrings and that the embedded excerpt ends in a safe landing.
- [ ] tests/unit/coverage.assertion.test.js exists in the suite or CI enforces coverage thresholds.

Notes

- The maintenance tests above are high-value to prevent documentation drift and controller regressions; add them before concluding the maintenance sprint.
- Keep tests short and deterministic; prefer inspecting final states over long trace comparisons except in determinism checks where full-trace equality is required.
