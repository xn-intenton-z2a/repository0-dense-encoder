# SIMULATOR_RUNNER

Purpose

Specify the simulation runner that advances the lander using a controller function until landing or crash and returns the full trace.

Description

Implement a simulate(initialState, controller, options) function that produces an array of state objects representing every tick from the initial state through and including the final landed or crashed state. The controller argument is a function invoked each tick with the current state and must return a non-negative number representing desired thrust units for that tick. The simulate function is responsible for clamping thrust, calling step, and collecting the trace.

Behavioral requirements

- The returned trace must include the initialState as the first element and the final landed/crashed state as the last element.
- The controller must not be invoked after a landed or crashed state is reached.
- The simulate runner must protect against infinite loops by enforcing a sensible maximum ticks limit (for example 10000) and terminating with the last state if the limit is reached.
- Options may optionally include maxTicks (positive integer).
- The simulate function must not throw on controller misbehavior; it should defensively clamp or coerce controller outputs and continue the run, returning a crash or last-state trace if necessary.

Acceptance criteria

- [ ] simulate returns an array trace starting with the provided initial state and ending with a state whose landed or crashed flag is true.
- [ ] simulate invokes the controller once per tick until landing or the max tick limit.
- [ ] simulate handles controllers that return non-integer or out-of-range thrust values by clamping them.
- [ ] simulate includes tests that run a trivial controller, the autopilot controller, and a controller that always returns zero thrust.
