# AUTOPILOT_CONTROLLER

Purpose

Specify the built-in autopilot controller that attempts safe landings across the mission parameter ranges and yields a crash trace when a configuration is physically impossible to save.

Description

Provide a named export autopilot(state) that can be passed directly to simulate as the controller. The autopilot must be deterministic and explainable: given the same state it must request the same thrust. It should balance fuel conservation with deceleration so that when a safe landing is physically possible the autopilot achieves landed=true and crashed=false.

Status

Partially implemented — autopilot is exported and passes the repository's sample-combos test; explicit default-state test and README demo may be missing. Priority: high.

Behavioral guidance

- The controller must never request more thrust than is available in state.fuel.
- The controller must return an integer or numeric thrust value each tick; simulate will clamp non-integer or out-of-range values.
- For configurations that are physically impossible to save, the autopilot must produce a trace that ends with crashed=true rather than throwing.

Acceptance criteria

- [x] autopilot is exported as a named export from src/lib/main.js and can be passed to simulate as the controller.
- [ ] autopilot lands safely (final state landed true and crashed false) with the default initial state returned by createState() (alt=1000, vel=40, fuel=25). Required test: tests/unit/autopilot.default.test.js with test title "autopilot: default initial state lands safely" that asserts final.landed === true and Math.abs(final.velocity) <= 4.
- [x] autopilot produces safe landings for at least ten distinct initial condition triples sampled across altitude 500–2000m, velocity 20–80 m/s, fuel 10–50 units, where those triples are physically possible to save. Required test: tests/unit/autopilot.sample-combos.test.js that iterates a defined combos list and asserts final.landed === true for each physically possible triple.
- [ ] For configurations that are impossible-to-save the controller returns a trace ending in crashed true (tests assert no exceptions thrown). Add tests for at least three impossible combos and assert final.crashed === true.
- [ ] Unit tests verify deterministic outputs for selected scenarios: running simulate with the same initial state and controller twice produces identical traces (deep equality). Required test: tests/unit/autopilot.determinism.test.js.
- [ ] A README demo is added showing simulate(createState(), autopilot) trace for the default state resulting in landed true; README must show a 6–12 state excerpt and final landed=true with velocity ≤ 4. Add the snippet under README Usage > Autopilot demo and cite the test file names used for verification.

Sample triples for tests (adjust if a triple proves physically impossible):

1. altitude: 1000, velocity: 40, fuel: 25   # default
2. altitude: 1500, velocity: 50, fuel: 40
3. altitude: 800,  velocity: 30, fuel: 30
4. altitude: 1200, velocity: 25, fuel: 20
5. altitude: 500,  velocity: 20, fuel: 20
6. altitude: 2000, velocity: 60, fuel: 50
7. altitude: 900,  velocity: 45, fuel: 35
8. altitude: 600,  velocity: 35, fuel: 25
9. altitude: 1300, velocity: 70, fuel: 50
10. altitude: 700, velocity: 28, fuel: 18

Notes

- Tests should document which triples are considered "physically possible" and which are expected to crash; assertions must reflect that distinction rather than assuming all listed triples are survivable.
- Keep controller behavior deterministic and defensive; tests should fail if autopilot throws for invalid inputs rather than returning a crash trace.