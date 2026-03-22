# AUTOPILOT_CONTROLLER

Purpose

Specify a built-in autopilot controller that safely lands the module across the specified parameter ranges when physically possible and otherwise yields a crash trace.

Description

Provide a named export autopilot(state) or an autopilot factory that when used as the controller in simulate will attempt to land the craft safely. The autopilot should implement a deterministic, explainable control strategy that balances fuel preservation with reducing velocity for a safe touchdown. It must be robust across a wide set of initial conditions in the ranges altitude 500 to 2000, velocity 20 to 80, fuel 10 to 50. The autopilot must not throw; it should return an integer thrust request each tick and allow simulate to return a crash trace for physically impossible configurations.

Design guidance (non-prescriptive)

- The autopilot may use heuristics such as estimating required deceleration to reach a target approach velocity at touchdown and applying thrust proportionally or in bursts.
- The autopilot must respect available fuel and never request more thrust than the current fuel.
- The autopilot should aim for a touchdown velocity less than or equal to 4 m/s when possible while conserving fuel.

Acceptance criteria

- [ ] The autopilot is exported as a named export and can be passed directly to simulate as the controller.
- [ ] The autopilot lands safely (final landed true and crashed false) with default initial conditions.
- [ ] The autopilot produces a safe landing for at least ten distinct initial condition triples sampled across the specified ranges, when physically possible.
- [ ] For impossible-to-save settings the autopilot returns a trace that ends in crashed true rather than throwing.
- [ ] Unit tests verify deterministic behavior for several selected scenarios and assert landing flags and final velocity.
