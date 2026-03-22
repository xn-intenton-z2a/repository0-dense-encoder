LUNAR_LANDER

NORMALISED EXTRACT:
Table of contents:
- Mission model and constants
- State representation and invariants
- Step update rules (discrete)
- Landing and crash criteria

Mission model and constants (from MISSION.md and implementation):
- Default initial conditions: altitude = 1000 m, velocity = 40 m/s (toward surface), fuel = 25 units.
- Gravity per tick: +2 m/s (increasing downward speed).
- Thrust per fuel unit: reduces velocity by 4 m/s per unit burned per tick.
- Safe landing velocity threshold: ≤ 4 m/s.

State representation and invariants:
- State is a plain, immutable object: { altitude, velocity, fuel, tick, landed, crashed }.
- altitude >= 0, fuel >= 0, tick increments by 1 each step; landed and crashed are booleans computed at each step.

Step update rules (exact; see src/lib/main.js):
- Burn is the integer number of fuel units requested by controller, clamped: burn = max(0, min(floor(requested), state.fuel)).
- fuel' = state.fuel - burn.
- velocity' = state.velocity + 2 - 4*burn.
- altitude' = state.altitude - velocity'.
- If altitude' <= 0: altitude' = 0, landed = true, crashed = abs(velocity') > 4.

Landing and crash criteria:
- Landing occurs when altitude reaches 0 (altitude' <= 0). Crash if |velocity_at_touchdown| > 4 m/s.
- The simulator's step function caps altitude at 0 and sets landed/crashed flags accordingly.

SUPPLEMENTARY DETAILS:
- Controllers are pure functions mapping a state to an integer burnUnits (stateless recommended for reproducibility).
- Simulation returns a trace array using simulate(initialState, controller) that runs step repeatedly until landed or crashed.

REFERENCE DETAILS (API signatures):
- createState({ altitude = 1000, velocity = 40, fuel = 25 }) -> state object
- step(state, burnUnits = 0) -> nextState (applies rules above)
- simulate(initialState, controller) -> Array of states (trace)
- autopilot(state) -> integer burnUnits (simple greedy default exists in src/lib/main.js)
- score(trace, initialState) -> numeric score (0 for crash, positive for safe landing per scoring formula in LANDING_SCORING.md)

DETAILED DIGEST:
Source: https://en.wikipedia.org/wiki/Lunar_lander — retrieved 2026-03-22 — bytes downloaded: 208009
This document summarises the mission model and the exact discrete simulator semantics used by the codebase.

ATTRIBUTION:
Summary derived from mission specification and Wikipedia 'Lunar lander' (CC BY-SA) for background context.
