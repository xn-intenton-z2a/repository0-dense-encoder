# UNIT_TESTS

Purpose

Define the test coverage required to validate physics, autopilot safety, scoring and edge cases, and to ensure the public API is stable.

Description

Add unit tests in tests/unit/main.test.js that import the named exports from src/lib/main.js and exercise the library at the API level. Tests must be deterministic and fast. Required groups:

- Physics correctness: verify step for thrust and gravity, fuel clamping, altitude update and touchdown flag logic.
- Autopilot safety: run the built-in autopilot across a representative sample of at least ten distinct initial condition triples sampled from the mission ranges and assert landed true when physically possible (and crashed true otherwise).
- Scoring: verify score returns 0 for crashes and exact numeric results for sample safe landings.
- Edge cases: zero fuel, already-landed initial state, fractional thrust, controller returning out-of-range values.

Acceptance criteria

- [ ] tests/unit/main.test.js exists and imports createState, step, simulate, autopilot and score from src/lib/main.js.
- [ ] The test set includes at least ten autopilot scenarios and asserts expected landed/crashed outcomes for each.
- [ ] Tests for step and score include explicit numeric assertions.
- [ ] Tests run under npm test and are expected to pass once implementation is complete.
