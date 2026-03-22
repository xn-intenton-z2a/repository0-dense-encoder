# README_EXAMPLE

Purpose

Provide a concise, reproducible example for the README that demonstrates running a simulation with the built-in autopilot and shows a short excerpt of a successful landing trace for the default initial state.

Description

The README Usage section must show the minimal import and invocation needed to run a simulation with the built-in autopilot and present a short, reproducible excerpt of the trace. The invocation should be a single-line import and call, and the trace excerpt should be a 6 to 12 state excerpt that ends with landed true and Math.abs(velocity) <= 4. The example must be easily copy-pastable by a reader and must not depend on undocumented CLI flags.

Example one-line invocation (plain text, not a code block):
import { createState, simulate, autopilot } from 'src/lib/main.js'
simulate(createState(), autopilot)

Example trace excerpt (plain property style, 6-12 states, final landed true):
[ { altitude: 1000, velocity: 40, fuel: 25, tick: 0, landed: false, crashed: false },
  { altitude: 958, velocity: 42, fuel: 25, tick: 1, landed: false, crashed: false },
  { altitude: 914, velocity: 44, fuel: 25, tick: 2, landed: false, crashed: false },
  { altitude: 364, velocity: 64, fuel: 12, tick: 12, landed: false, crashed: false },
  { altitude: 14, velocity: 74, fuel: 2, tick: 18, landed: false, crashed: false },
  { altitude: 0, velocity: 4, fuel: 12, tick: 21, landed: true, crashed: false } ]

Notes

The trace excerpt above is illustrative; the README must include a short excerpt taken directly from a run of simulate(createState(), autopilot) so readers can reproduce the example.

Acceptance criteria

- [ ] README.md contains a Usage section with an exact one-line import and invocation example showing how to run simulate driven by autopilot. The invocation must be copy-paste runnable by a reader using the library source files.
- [x] README.md includes a reproducible simulation trace excerpt for the default initial state (altitude 1000, velocity 40, fuel 25) showing 6 to 12 states and ending with landed true and Math.abs(velocity) <= 4. The excerpt must be taken from an actual run of the library and match the format shown above.
- [ ] README.md documents how to run the unit tests (npm test) and references the concrete test files used to validate the autopilot demo: tests/unit/create_state.test.js and tests/unit/lander.test.js.
- [ ] The README example does not rely on undocumented CLI flags and is reproducible in a fresh checkout after npm ci.
