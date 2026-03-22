# UNIT_TESTS

Purpose

Define the exact unit tests required to validate physics, autopilot safety, scoring and edge cases, and ensure the public API is stable and importable by name.

Description

Unit tests live under tests/unit/ and must import named exports from src/lib/main.js. Tests must be deterministic and succinct. Each required test file below includes the test names and the assertions expected so reviewers and CI can verify behaviour without ambiguity.

Required test files and assertions (updated to reflect existing test filenames)

1) tests/unit/main.test.js
- Purpose: verify core exports and basic library identity behaviour.
- Assertions:
  - Import the named exports main, getIdentity, name, version, description from src/lib/main.js (if present).
  - main() terminates without throwing when invoked as a CLI entry point (if main export exists).
  - getIdentity returns { name, version, description } when available.

2) tests/unit/create_state.test.js
- Purpose: verify createState defaults and autopilot default behaviour and edge cases.
- Assertions:
  - createState() returns altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false.
  - simulate(createState(), autopilot) results in final.landed === true and Math.abs(final.velocity) <= 4 (default behaviour test).
  - Tests assert autopilot does not throw on impossible states and handles zero fuel and already-landed states.

3) tests/unit/lander.test.js
- Purpose: validate autopilot across a representative sample of initial conditions and scoring.
- Assertions:
  - Iterate a combos array of at least ten configurations and assert final.landed === true and final.crashed === false for each physically possible combo. The combos must be listed in the test file and tests must document which combos are expected to be survivable.
  - Scoring tests assert score returns 0 for crash traces and computes the landing bonus exactly as: (initialFuel - fuelUsed) * 10 + Math.max(0, (4 - landingVelocity) * 25).

4) tests/unit/autopilot.determinism.test.js
- Purpose: ensure simulate produces deterministic traces for identical inputs.
- Behaviour:
  - Use a fixed initial state and the autopilot controller.
  - Run simulate(initialState, autopilot) twice and assert deep equality of the two traces.
  - The test must perform this check for the default initial state and at least one additional survivable triple from lander.test.js.

5) tests/unit/readme.test.js
- Purpose: ensure the README usage example and trace excerpt are present and reproducible.
- Behaviour:
  - Assert README.md contains the substring import { createState, simulate, autopilot } from './src/lib/main.js' and the substring simulate(createState(), autopilot).
  - Extract the trace excerpt from README.md and assert its final state object contains landed true and Math.abs(velocity) <= 4.

6) tests/unit/autopilot.respect-fuel.test.js
- Purpose: ensure the autopilot controller never requests more thrust than available in state.fuel.
- Behaviour:
  - Create a short scenario and for each state in a limited simulation-step loop call autopilot(state) and assert returned thrust is an integer >= 0 and <= state.fuel.

7) tests/unit/coverage.assertion.test.js (optional but recommended)
- Purpose: provide a fast failing assertion if coverage drops below project thresholds. This helper may be used by CI.
- Behaviour:
  - Post-process coverage output (from npm run test:unit) and assert lines >= 50% and branches >= 30%.

Acceptance criteria

- [x] tests/unit/main.test.js exists and asserts the named exports and core getIdentity/main behaviour as specified above (or is adapted to available exports without causing import errors).
- [x] tests/unit/create_state.test.js exists and includes the autopilot default landing and edge-case tests described above.
- [x] tests/unit/lander.test.js exists and contains the sample combos and scoring assertions for at least ten combos (file documents which combos are expected to crash vs survive).
- [ ] tests/unit/autopilot.determinism.test.js exists and asserts deep equality of repeated simulate runs for a fixed initial state and one additional survivable triple.
- [ ] tests/unit/readme.test.js exists and asserts the README usage and trace excerpt presence and final landed true.
- [ ] tests/unit/autopilot.respect-fuel.test.js exists and asserts controller outputs respect available fuel bounds.
- [ ] tests/unit/coverage.assertion.test.js exists (optional) and CI uses it to fail the run when coverage falls below thresholds. The project aims for line coverage >= 50% and branch coverage >= 30%.

Notes

- Keep tests focused and avoid overly long traces in assertions; prefer precise checks of final state fields and a small number of intermediate assertions for determinism.
- The combos array used in lander.test.js should be checked into the test file so CI and reviewers see which triples are considered survivable versus unsalvageable.
- Adding readme.test.js and autopilot.determinism.test.js are maintenance steps to reduce flakiness and to ensure the README example remains reproducible over time.
