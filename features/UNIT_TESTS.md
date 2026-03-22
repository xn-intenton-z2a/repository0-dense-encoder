# UNIT_TESTS

Purpose

Define the exact unit tests required to validate physics, autopilot safety, scoring and edge cases, and ensure the public API is stable and importable by name.

Description

Unit tests live under tests/unit/ and must import named exports from src/lib/main.js. Tests must be deterministic and succinct. Each required test file below includes the test names and the assertions expected so reviewers and CI can verify behaviour without ambiguity.

Required test files and assertions

1) tests/unit/main.test.js
- Purpose: verify core exports and core physics behaviour.
- Assertions:
  - Import the named exports createState, step, simulate, autopilot, score from src/lib/main.js.
  - createState() returns altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false.
  - step(createState(), 0) returns a new object (no mutation) and updates tick to 1.
  - score for a safe landing trace returns a positive number and for a trace ending with crashed true returns 0.

2) tests/unit/autopilot.default.test.js
- Test name: "autopilot: default initial state lands safely"
- Behaviour:
  - Create initial state with createState() defaults.
  - Run simulate(initialState, autopilot).
  - Assert final state has landed === true and Math.abs(final.velocity) <= 4.
  - Assert simulate returns a non-empty array and includes the initial state as trace[0].

3) tests/unit/autopilot.sample-combos.test.js
- Purpose: validate autopilot across a representative sample of initial conditions.
- Setup: define an explicit combos array in the test file. For each combo include a field expected: "survivable" or "unsurvivable" indicating the test expectation.
- Behaviour:
  - For each combo run simulate(createState(combo), autopilot).
  - If combo.expected === "survivable" assert final.landed === true and Math.abs(final.velocity) <= 4.
  - If combo.expected === "unsurvivable" assert final.crashed === true and the test must not throw an exception.
- The test file must include at least ten combos sampled across altitude 500–2000m, velocity 20–80 m/s and fuel 10–50 units; mark which are expected to survive and which are not.

4) tests/unit/autopilot.determinism.test.js
- Purpose: ensure simulate produces deterministic traces for identical inputs.
- Behaviour:
  - Use a fixed initial state and the autopilot controller.
  - Run simulate(initialState, autopilot) twice and assert deep equality of the two traces (including tick, altitude, velocity, fuel, landed, crashed fields in order).

5) tests/unit/edge-cases.test.js
- Purpose: cover zero fuel, already-landed initial state, fractional thrust input and controllers that return out-of-range values.
- Assertions:
  - Zero fuel: createState({ fuel: 0 }) and run simulate with autopilot and a zero-thrust controller. Ensure the run completes and final flags reflect correct touchdown or crash, no exceptions.
  - Already landed: createState({ altitude: 0, velocity: 0, fuel: 5 }) simulate should return immediately with landed true and tick 0.
  - Fractional thrust: call step(state, 2.9) and assert applied thrust is floored to an integer before clamping and that state.fuel decreased by the integer amount.
  - Out-of-range controller values: controllers returning negative or very large values must be clamped and must not cause simulate to throw.

Acceptance criteria

- [ ] tests/unit/main.test.js exists and asserts the named exports and core step/score behaviour as specified above.
- [ ] tests/unit/autopilot.default.test.js exists with the exact test name "autopilot: default initial state lands safely" and asserts final.landed === true and Math.abs(final.velocity) <= 4.
- [ ] tests/unit/autopilot.sample-combos.test.js exists, contains a combos array annotating survivable/unsurvivable expectations, and asserts final.landed or final.crashed accordingly for at least ten combos.
- [ ] tests/unit/autopilot.determinism.test.js exists and asserts deep equality of repeated simulate runs for a fixed initial state and controller.
- [ ] tests/unit/edge-cases.test.js exists and covers zero fuel, already-landed, fractional thrust and out-of-range controller return values without throwing.
- [ ] npm test runs the test suite and the tests are deterministic; tests are written to fail explicitly when behaviour deviates from the specified assertions.

Notes

- Keep tests focused and avoid overly long traces in assertions; prefer precise checks of final state fields and a small number of intermediate assertions for determinism.
- The combos array used in autopilot.sample-combos.test.js should be checked into the test file so CI and reviewers see which triples are considered survivable versus unsalvageable.