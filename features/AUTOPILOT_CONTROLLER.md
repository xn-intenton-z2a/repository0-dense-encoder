# AUTOPILOT_CONTROLLER

Purpose

Specify the built-in autopilot controller that attempts safe landings across the mission parameter ranges and yields a crash trace when a configuration is physically impossible to save.

Description

Provide a named export autopilot(state) that can be passed directly to simulate as the controller. The autopilot must be deterministic and explainable: given the same state it must request the same thrust. It should balance fuel conservation with deceleration so that when a safe landing is physically possible the autopilot achieves landed=true and crashed=false.

Behavioral guidance

- The controller must never request more thrust than is available in state.fuel.
- The controller must return an integer or numeric thrust value each tick; simulate will clamp non-integer or out-of-range values.
- For configurations that are physically impossible to save, the autopilot must produce a trace that ends with crashed=true rather than throwing.

Acceptance criteria

- [ ] autopilot is exported as a named export from src/lib/main.js and can be passed to simulate as the controller.
- [ ] The autopilot lands safely (landed true and crashed false) with the default initial state.
- [ ] The autopilot produces safe landings for at least ten distinct initial condition triples sampled across the ranges altitude 500–2000m, velocity 20–80 m/s, fuel 10–50 units when those triples are physically possible to save; tests should include a representative sample of at least ten triples and assert expected outcomes.
- [ ] For configurations that are impossible-to-save the controller returns a trace ending in crashed true (tests assert no exceptions are thrown).
- [ ] Unit tests verify deterministic outputs for selected scenarios (same initial state yields identical trace on repeated runs).
