SIMULATOR_RUNNER

NORMALISED EXTRACT:
Table of contents:
- simulate() signature
- Controller interface
- Trace structure and termination

simulate signature:
- simulate(initialStateOrConfig, controller) -> Array<state>
- initialStateOrConfig may be a state created by createState or a config object { altitude, velocity, fuel }
- controller: function(state) => integer thrustUnits

Controller interface:
- Controller must be pure and return an integer >= 0; return values are clamped to available fuel by simulate/step
- Built-in autopilot provided: autopilotController(state)

Trace structure:
- The returned array is the sequence of state objects after each tick, including the initial state and the terminal landed/crashed state
- Termination: simulation ends when state.landed === true or state.crashed === true or when a hard cap on ticks (e.g., 10000) is reached to avoid infinite loops

Performance notes:
- Simulation is cheap; each tick is O(1). For forward-search autopilot, the search cost is bounded by remaining fuel and typical altitudes.

DETAILED DIGEST:
Sources: integration and discrete step references (see SOURCES.md); retrieval sizes recorded in API_EXPORTS.md.
