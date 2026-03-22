# UNIT_TESTS

Purpose

Define the test coverage required to validate physics, autopilot safety, scoring and edge cases, and to ensure the public API is stable.

Description

Add unit tests in tests/unit/ that import the named exports from src/lib/main.js and exercise the library at the API level. Tests must be deterministic and fast. Required groups:

- Physics correctness: verify step for thrust and gravity, fuel clamping, altitude update and touchdown flag logic.
- Autopilot safety: run the built-in autopilot across a representative sample of at least ten distinct initial condition triples sampled from the mission ranges and assert landed true when physically possible (and crashed true otherwise).
- Scoring: verify score returns 0 for crashes and exact numeric results for sample safe landings.
- Edge cases: zero fuel, already-landed initial state, fractional thrust, controller returning out-of-range values.

Test file layout

- tests/unit/main.test.js: physics, step, score and simulate core behaviour.
- tests/unit/autopilot.test.js: autopilot-focused tests including default-case, at least ten representative triples, and edge cases.

Acceptance criteria

- [ ] tests/unit/main.test.js exists and imports createState, step, simulate, autopilot and score from src/lib/main.js and covers physics correctness and scoring with explicit numeric assertions.
- [ ] tests/unit/autopilot.test.js exists and contains:
  - default-case test verifying createState() defaults and that autopilot lands the default state (landed true and final velocity ≤ 4).
  - at least ten representative autopilot scenarios across the mission ranges asserting landed true for saveable cases and crashed true for impossible ones.
  - edge case tests for zero fuel, already-landed initial state, fractional thrust inputs, and controllers returning out-of-range values.
- [ ] Tests assert exact numeric results for step and score in at least two cases.
- [ ] Running npm test executes both test files and tests are deterministic (repeated runs produce the same results).

Notes

Place tests in tests/unit/ and keep them fast and focused; the autopilot file should be readable and list the test triples used so reviewers can validate coverage.