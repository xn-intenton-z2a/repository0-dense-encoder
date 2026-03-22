# UNIT_TESTS

Purpose

Define the exact unit tests required to validate physics, autopilot safety, scoring and edge cases, and ensure the public API is stable and importable by name.

Description

Unit tests live under tests/unit/ and must import named exports from src/lib/main.js. Tests must be deterministic and succinct. Each required test file below includes the test names and the assertions expected so reviewers and CI can verify behaviour without ambiguity.

Required test files and assertions (updated to reflect existing test filenames)

1) tests/unit/main.test.js
- Purpose: verify core exports and basic library identity behaviour.
- Assertions:
  - Import the named exports main, getIdentity, name, version, description from src/lib/main.js.
  - main() terminates without throwing when invoked as a CLI entry point.
  - getIdentity returns { name, version, description }.

2) tests/unit/create_state.test.js
- Purpose: verify createState defaults and autopilot default behaviour and edge cases.
- Assertions:
  - createState() returns altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false.
  - simulate(createState(), autopilot) results in final.landed === true and Math.abs(final.velocity) <= 4.
  - Tests assert autopilot does not throw on impossible states and handles zero fuel and already-landed states.

3) tests/unit/lander.test.js
- Purpose: validate autopilot across a representative sample of initial conditions and scoring.
- Assertions:
  - Iterate a combos array of at least ten configurations and assert final.landed === true and final.crashed === false for each physically possible combo.
  - Scoring tests assert score returns 0 for crash traces and computes the landing bonus correctly for safe landings.

4) tests/unit/autopilot.determinism.test.js (optional/missing)
- Purpose: ensure simulate produces deterministic traces for identical inputs.
- Behaviour:
  - Use a fixed initial state and the autopilot controller.
  - Run simulate(initialState, autopilot) twice and assert deep equality of the two traces.

5) tests/unit/edge-cases (covered in create_state.test.js)
- Purpose: cover zero fuel, already-landed, fractional thrust and controllers that return out-of-range values.
- Assertions summarized in create_state.test.js.

Acceptance criteria

- [x] tests/unit/main.test.js exists and asserts the named exports and core getIdentity/main behaviour as specified above.
- [x] tests/unit/create_state.test.js exists and includes the autopilot default landing and edge-case tests described above.
- [x] tests/unit/lander.test.js exists and contains the sample combos and scoring assertions for at least ten combos.
- [ ] tests/unit/autopilot.determinism.test.js exists and asserts deep equality of repeated simulate runs for a fixed initial state and controller.
- [x] edge cases such as zero fuel, already landed and fractional thrust are covered by the existing tests under create_state.test.js.
- [ ] npm test runs the test suite and the tests are deterministic; tests are written to fail explicitly when behaviour deviates from the specified assertions.

Notes

- Keep tests focused and avoid overly long traces in assertions; prefer precise checks of final state fields and a small number of intermediate assertions for determinism.
- The combos array used in lander.test.js should be checked into the test file so CI and reviewers see which triples are considered survivable versus unsalvageable.