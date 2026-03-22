# README_EXAMPLE

Purpose

Provide a concise, reproducible example for the README that demonstrates running a simulation with the built-in autopilot and shows a short excerpt of a successful landing trace for the default initial state.

Description

The README Usage section must show the minimal import and invocation needed to run a simulation with the built-in autopilot and present a short, reproducible excerpt of the trace. The invocation should be a single-line import and call, and the trace excerpt should be a 6 to 12 state excerpt that ends with landed true and Math.abs(velocity) <= 4. The example must be easily copy-pastable by a reader and must not depend on undocumented CLI flags.

Required invocation text (must appear verbatim in README.md for automated checks):

import { createState, simulate, autopilot } from './src/lib/main.js'
simulate(createState(), autopilot)

Required test command (must appear in README.md):

npm test

Example trace excerpt (the README should include a 6-12 state excerpt taken directly from a run of simulate(createState(), autopilot), final state must be landed true):

[ { altitude: 1000, velocity: 40, fuel: 25, tick: 0, landed: false, crashed: false },
  { altitude: 958, velocity: 42, fuel: 25, tick: 1, landed: false, crashed: false },
  { altitude: 914, velocity: 44, fuel: 25, tick: 2, landed: false, crashed: false },
  { altitude: 364, velocity: 64, fuel: 12, tick: 12, landed: false, crashed: false },
  { altitude: 14, velocity: 74, fuel: 2, tick: 18, landed: false, crashed: false },
  { altitude: 0, velocity: 4, fuel: 12, tick: 21, landed: true, crashed: false } ]

Acceptance criteria

- [ ] README.md contains a Usage section with the exact one-line import and invocation shown above. Automated checks should search README.md for the substrings "import { createState, simulate, autopilot } from './src/lib/main.js'" and "simulate(createState(), autopilot)".
- [x] README.md includes a reproducible simulation trace excerpt for the default initial state (altitude 1000, velocity 40, fuel 25) showing 6 to 12 states and ending with landed true and Math.abs(velocity) <= 4. The excerpt must be taken from an actual run of simulate(createState(), autopilot) and be present verbatim in README.md.
- [ ] README.md documents how to run the unit tests (npm test) and references the concrete test files used to validate the autopilot demo: tests/unit/create_state.test.js and tests/unit/lander.test.js.
- [ ] A unit test exists at tests/unit/readme.test.js that:
  - Asserts README.md contains the exact import and invocation substrings.
  - Extracts the trace excerpt from README.md (e.g., code block or fenced output) and asserts the final object in the excerpt has landed true and Math.abs(velocity) <= 4.

Notes

- The exact one-line import string must appear verbatim so automated checks can locate the example.
- The readme.test.js is a maintenance test to ensure documentation remains reproducible; add it to the unit test suite and mark it as required for acceptance.
