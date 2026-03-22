# UNIT_TESTS

Purpose

Define the test coverage required to validate physics, autopilot safety, scoring and edge cases, and to ensure the public API is stable.

Description

Add unit tests in tests/unit/ that import the named exports from src/lib/main.js and exercise the library at the API level. Tests must be deterministic and fast. Required groups:

- Physics correctness: verify step for thrust and gravity, fuel clamping, altitude update and touchdown flag logic.
- Autopilot safety: run the built-in autopilot across a representative sample of at least ten distinct initial condition triples sampled from the mission ranges and assert landed true when physically possible (and crashed true otherwise).
- Scoring: verify score returns 0 for crashes and exact numeric results for sample safe landings.
- Edge cases: zero fuel, already-landed initial state, fractional thrust, controller returning out-of-range values.

Test file layout and required test names

- tests/unit/main.test.js: physics, step and score core behaviour and export stability.
- tests/unit/autopilot.sample-combos.test.js: run autopilot across the sample triples and assert expected landed/crashed results for each triple (the file should include the combos list and mark which are considered "survivable").
- tests/unit/autopilot.default.test.js: single focused test titled "autopilot: default initial state lands safely" that asserts final.landed === true and Math.abs(final.velocity) <= 4 for createState() defaults.
- tests/unit/autopilot.determinism.test.js: test that runs simulate twice for the same initial state and controller and asserts deep equality of traces.

Acceptance criteria

- [x] tests/unit/main.test.js exists and validates core exports and a subset of physics behaviour.
- [ ] tests/unit/autopilot.sample-combos.test.js exists and asserts final.landed === true for each listed survivable triple and final.crashed === true for each listed impossible triple. The file must include the combos list used in AUTOPILOT_CONTROLLER.md.
- [ ] tests/unit/autopilot.default.test.js exists and asserts the autopilot lands the default state (createState() defaults) with final.landed === true and Math.abs(final.velocity) <= 4.
- [ ] tests/unit/autopilot.determinism.test.js exists and asserts simulate produces identical traces across repeated runs for a fixed initial state and controller.
- [x] Tests assert exact numeric results for step and score in at least two cases and are deterministic (repeated runs produce the same results).
- [x] Running npm test executes the unit tests and completes within a few seconds on CI.

Notes

- Keep tests focused and avoid long end-to-end traces in unit tests; use small, example-oriented assertions.
- If tests are missing, add them under tests/unit/ following the required file names above so reviewers and CI can verify acceptance criteria.