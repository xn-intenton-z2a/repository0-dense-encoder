# AUTOPILOT_CONTROLLER

Purpose

Specify the built-in autopilot controller that attempts safe landings across the mission parameter ranges and yields a crash trace when a configuration is physically impossible to save.

Description

Provide a named export autopilot(state) that can be passed directly to simulate as the controller. The autopilot must be deterministic and explainable: given the same state it must request the same thrust. It should balance fuel conservation with deceleration so that when a safe landing is physically possible the autopilot achieves landed=true and crashed=false.

Status

Implemented — autopilot is exported and passes the repository's sample-combos and default-state tests; README demo present. Remaining work: explicit determinism and strict fuel-respect tests. Priority: high.

Behavioral guidance

- The controller must never request more thrust than is available in state.fuel.
- The controller must return a finite numeric thrust value each tick; simulate will clamp non-integer or out-of-range values but tests should assert controller behaviour before relying on simulator clamping.
- For configurations that are physically impossible to save, the autopilot must produce a trace that ends with crashed=true rather than throwing.

Acceptance criteria

- [x] autopilot is exported as a named export from src/lib/main.js and can be passed to simulate as the controller.
- [x] autopilot lands safely (final state landed true and Math.abs(final.velocity) <= 4) with the default initial state returned by createState() (altitude 1000, velocity 40, fuel 25).
- [x] autopilot produces safe landings for at least ten distinct initial condition triples sampled across altitude 500–2000m, velocity 20–80 m/s, fuel 10–50 units, when those triples are physically possible to save. Tests document which triples are expected to survive and which are expected to crash.
- [x] For configurations that are impossible-to-save the controller returns a trace ending in crashed true and does not throw.
- [ ] Unit tests verify deterministic outputs for selected scenarios: tests/unit/autopilot.determinism.test.js must run simulate(initialState, autopilot) twice for the same initialState and assert deep equality of the two traces. The determinism test must cover the default initial state and at least one additional survivable triple.
- [ ] Unit tests assert the controller never requests more thrust than is available: tests/unit/autopilot.respect-fuel.test.js must, for a short trace, call autopilot(state) for each state and assert returned thrust is an integer >= 0 and <= state.fuel. If the controller returns larger values, simulate must still be defensive and clamp them; the test should prefer controller-level correctness.

Test details

- tests/unit/autopilot.determinism.test.js
  - Import createState, simulate, autopilot.
  - For default state and one additional survivable triple, run simulate(state, autopilot) twice and assert deepStrictEqual(tr1, tr2).
  - Keep traces small by enabling an options parameter or taking only the first N ticks if necessary — but identical sequences must be compared end-to-end for chosen scenarios.

- tests/unit/autopilot.respect-fuel.test.js
  - Use createState overrides to create a short run (e.g., altitude 300, velocity 20, fuel 5) and for each state in a short step-loop call autopilot(state) and assert Number.isInteger(thrust) and thrust >= 0 and thrust <= state.fuel.
  - The test should not rely on simulate's clamping; it should prefer controller-level correctness assertions.

Notes

- Determinism and fuel-respect tests are maintenance items: implement these tests to reduce regression risk and to make autopilot guarantees explicit.
- Keep controller behaviour deterministic and defensive; tests should fail if autopilot throws for invalid inputs rather than returning a crash trace.
