# SIMULATOR_RUNNER

Purpose

Specify the simulation runner that advances the lander using a controller function until landing or crash and returns the full trace.

Description

Provide a named export simulate(initialState, controller, options) that returns an array of state objects, one per tick, beginning with the initial state and ending with a state whose landed or crashed flag is true. The controller is invoked each tick with the current state and should return desired thrust units. simulate is responsible for clamping thrust, calling step, collecting the trace and enforcing a sensible max ticks limit (for example 10000).

Behavioral requirements

- The returned trace must include the initialState as the first element and the final landed/crashed state as the last element.
- The controller must not be invoked after a landed or crashed state is reached.
- simulate must enforce a maxTicks limit and terminate the run if reached, returning the trace.
- simulate must be defensive: clamp non-integer or out-of-range controller outputs and never throw due to controller misbehavior.

Acceptance criteria

- [ ] simulate returns an array trace starting with the provided initial state and ending with a state whose landed or crashed flag is true.
- [ ] simulate invokes the controller once per tick until landing or the max tick limit.
- [ ] simulate handles controllers that return non-integer or out-of-range thrust values by clamping them.
- [ ] Unit tests exercise simulate with a trivial controller, the autopilot controller, and a zero-thrust controller.
