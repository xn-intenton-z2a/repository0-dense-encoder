# UNIT_TESTS

Purpose

Define the test coverage required to validate physics, autopilot safety, scoring, API surface and edge cases.

Description

Add unit tests in tests/unit/main.test.js that exercise the library at the API level without requiring network or browser. Tests must be deterministic and fast. Required test groups:

- Physics correctness: verify step behavior for thrust and gravity, fuel clamping, altitude update and touchdown flag logic.
- Autopilot safety: run the built-in autopilot across at least ten different initial condition triples sampled from the mission ranges and assert landed true and crashed false when physically possible; for impossible configurations assert crashed true.
- Scoring: verify scoreLanding returns 0 for crash and the expected value for safe landings in sample traces.
- Edge cases: zero fuel, already landed initial state, fractional thrust, and controller returning out-of-range values.

Acceptance criteria

- [ ] The test file exists at tests/unit/main.test.js and imports public functions from src/lib/main.js.
- [ ] The test set includes at least ten autopilot scenarios and asserts expected landed/crashed results.
- [ ] Tests for physics step and scoring are present with explicit numeric assertions.
- [ ] Tests run under npm test and are expected to pass once implementation is complete.
