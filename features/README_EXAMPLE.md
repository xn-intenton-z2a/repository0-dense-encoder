# README_EXAMPLE

Purpose

Demand a concise, reproducible README example that demonstrates running a simulation with the built-in autopilot and that is verifiable by automated tests.

Description

The README Usage section must include a single-line import and invocation (exact substrings are required for automated checks) and a short 6-12 state trace excerpt from an actual run showing a successful landing for the default initial state.

Required invocation text (must appear verbatim somewhere in README.md)

import { createState, simulate, autopilot } from './src/lib/main.js'
simulate(createState(), autopilot)

Requirements for the trace excerpt

- Include a short array excerpt of 6 to 12 state objects taken from a real run of simulate(createState(), autopilot).
- The excerpt must end with a final object where landed true and Math.abs(velocity) <= 4.
- The excerpt should be human-readable plain text; no fenced code blocks are required by the automated checker but any readable block is acceptable.

Testing requirements

- Add tests/unit/readme.test.js which asserts README.md contains the exact import substring and the simulate invocation substring.
- The test must also extract the trace excerpt from README.md and assert the final object in the excerpt has landed true and Math.abs(velocity) <= 4.

Acceptance criteria

- [ ] README.md contains the exact substring: import { createState, simulate, autopilot } from './src/lib/main.js'
- [ ] README.md contains the exact substring: simulate(createState(), autopilot)
- [x] README.md includes a reproducible simulation trace excerpt for the default initial state showing 6-12 states and ending with landed true and Math.abs(velocity) <= 4. The excerpt must be taken from an actual run.
- [ ] tests/unit/readme.test.js exists and asserts the presence of the exact import/invocation substrings and that the excerpt's final state is a safe landing.

Notes

- The automated readme.test.js should be resilient to small whitespace differences when extracting the excerpt but must match the exact two required substrings to locate the example.
- Prefer a short real trace taken by running simulate(createState(), autopilot) once and embedding the excerpt in README.md; commit the test and the README together so CI can validate the example.
