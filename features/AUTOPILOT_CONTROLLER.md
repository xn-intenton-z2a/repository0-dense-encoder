# AUTOPILOT_CONTROLLER

Purpose

Specify the built-in autopilot controller and the maintenance work required to make its guarantees explicit and testable.

Description

Provide a named export autopilot(state) usable directly with simulate. The controller must be deterministic, explainable, and defensive: never request more thrust than state.fuel, return finite numeric thrust each tick, and for impossible-to-save configurations produce a trace ending with crashed true rather than throwing an exception.

Behavioral guidance

- Controller must return a non-negative finite number each tick; simulate is allowed to clamp non-integer or out-of-range values but controller-level correctness is preferred.
- Controller must not mutate the provided state object.
- Controller must be explainable (same input state -> same output thrust).
- For impossible-to-save initial conditions the controller should not throw; the run must terminate with crashed true.

Maintenance tasks (test-focused)

- Add deterministic-trace tests that run simulate(initialState, autopilot) twice and assert deep equality of traces for the default state and one additional survivable triple.
- Add fuel-respect tests that iterate a short scenario and assert autopilot(state) returns an integer thrust satisfying 0 <= thrust <= state.fuel for each inspected state.

Acceptance criteria

- [x] autopilot is exported as a named export from src/lib/main.js and is passable to simulate as the controller.
- [x] autopilot lands safely for the default createState() (final.landed === true and Math.abs(final.velocity) <= 4).
- [x] autopilot produces safe landings for at least ten distinct initial-condition triples where a safe landing is physically possible; tests document which triples are survivable.
- [x] For impossible-to-save configurations the controller produces a trace ending with crashed true and does not throw.
- [ ] tests/unit/autopilot.determinism.test.js exists and asserts two runs of simulate(initialState, autopilot) produce identical traces for the default state and one additional survivable triple.
- [ ] tests/unit/autopilot.respect-fuel.test.js exists and asserts for a short trace that autopilot(state) returns an integer thrust and 0 <= thrust <= state.fuel for each inspected state.

Test details

- determinism test: import createState, simulate, autopilot; pick createState() and one survivable triple (documented in tests/unit/lander.test.js); run simulate twice and deepStrictEqual the two traces.
- respect-fuel test: create a short scenario (e.g., altitude 300, velocity 20, fuel 5) and for N ticks call autopilot(state) for each intermediate state and assert Number.isInteger(thrust) and thrust >= 0 and thrust <= state.fuel.

Notes

- These are maintenance items intended to reduce regression risk; do not change controller algorithm here, add tests and fix controller code only if tests fail.
