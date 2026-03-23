LUNAR_LANDER

Table of contents
- Mission physics summary
- State object definition
- Tick stepping algorithm
- Simulation termination conditions
- Scoring function
- Supplementary details
- Reference details
- Crawl digest and attribution

Mission physics summary
- Discrete-time 1D vertical descent.
- Per-tick operations in order: controller selects thrustUnits (integer, clamped to available fuel), fuel is reduced by thrustUnits, gravity adds +2 m/s to velocity (downward), thrust reduces velocity by 4 m/s per unit burned (upward), altitude reduced by velocity after forces applied.
- Initial defaults: altitude=1000 m, velocity=40 (downward positive), fuel=25, gravity per tick=+2 m/s, thrust per fuel unit=4 m/s.
- Landing when altitude<=0; safe if landingVelocity <=4 m/s, crash otherwise.

State object definition
- Plain JS object with keys: altitude (number, meters), velocity (number, m/s, positive downward), fuel (integer, units), tick (integer), landed (boolean), crashed (boolean).
- States are immutable: stepping returns a new object.

Tick stepping algorithm
- Input: state, thrustUnitsRequested (int)
- thrust = clamp(thrustUnitsRequested, 0, state.fuel)
- newFuel = state.fuel - thrust
- v_after_gravity = state.velocity + 2
- v_after_thrust = v_after_gravity - 4*thrust
- newAltitude = state.altitude - v_after_thrust
- If newAltitude <= 0 then set landed=true and compute landingVelocity = Math.max(0, v_after_thrust) and set crashed = landingVelocity>4
- Increment tick by 1
- Return new state object

Simulation termination
- Continue stepping until state.landed===true or state.crashed===true or tick exceeds a high cap (e.g., 10000) to avoid infinite loops.

Scoring function
- If crashed return 0
- Otherwise return (initialFuel - fuelRemaining) * 10 + Math.max(0, (4 - landingVelocity) * 25)

Supplementary details
- Use integer thrust units; controller function signature: (state) => thrustUnitsRequested (integer)
- Use Math.max/Math.min to clamp values and ensure fuel not negative
- Use defensive checks: if state.landed or state.crashed, controller should be ignored and simulation should return the trace immediately

Reference details
- Implementation patterns: step is pure function: step(state, thrustUnits) => newState. simulate(initialState, controller) => traceArray.
- Export as named exports from src/lib/main.js: createState, step, simulate, autopilot, scoreLanding
- Edge cases: zero fuel -> thrust always 0; already landed -> simulation returns initial state in trace.

Crawl digest
- Sources consulted from SOURCES.md on 2026-03-23: Wikipedia Lunar lander, Rosetta Code lunar lander, control theory pages, Euler method. Extracted mission-specific physics from repository MISSION.md and normalized into the step definitions.

Attribution
- Data retrieved from: https://en.wikipedia.org/wiki/Lunar_lander (HTML crawl), https://rosettacode.org/wiki/Lunar_lander
- Crawl size: multiple pages fetched; see library files for per-source digests.
