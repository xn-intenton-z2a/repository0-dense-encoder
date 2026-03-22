STEP_PHYSICS

NORMALISED EXTRACT:
Table of contents:
- Discrete tick update equations
- Order of operations
- Collision / landing detection

Discrete tick update (dt = 1):
- Constants: gravityPerTick = +2 m/s, thrustPerFuel = 4 m/s per fuel unit
- Given state: { altitude, velocity, fuel }
- Input: thrustUnits (integer, clamped to available fuel)

Step equations (explicit):
1. fuel' = fuel - thrustUnits (clamped >= 0)
2. v' = velocity + gravityPerTick - (thrustUnits * thrustPerFuel)
3. altitude' = altitude - v'
4. tick' = tick + 1
5. if altitude' <= 0 then set altitude' = 0 and:
   a. if v' <= 4 then landed = true, crashed = false
   b. else crashed = true, landed = false
6. return new state := { altitude: altitude', velocity: v', fuel: fuel', tick: tick', landed, crashed }

Notes on sign conventions:
- velocity is positive when descending toward the surface
- altitude decreases by velocity each tick

SUPPLEMENTARY DETAILS:
- The step is explicit and uses values at the start of the tick plus instantaneous thrust applied in the same tick.
- Thrust is modelled as an instantaneous per-tick velocity reduction proportional to fuel burned this tick.
- This discrete model approximates continuous deceleration when dt = 1; for higher fidelity reduce dt and scale gravity/thrust accordingly.

REFERENCE DETAILS:
- Implementation pattern (plain text):
function step(state, thrustUnits) -> newState
- Input validation: thrustUnits = Math.max(0, Math.floor(thrustUnits)); thrustUnits = Math.min(thrustUnits, state.fuel)
- All intermediate values are floating point; fuel is integer; final altitude clamped to 0

Edge behaviours:
- If fuel == 0, thrustUnits must be 0 and v' = velocity + gravityPerTick
- If v' becomes negative (ascending), altitude increases (allowed) until fuel/external inputs change

DETAILED DIGEST:
Sources used for discrete integration and kinematics (retrieved 2026-03-22): see SOURCES.md. Download sizes captured during crawl are recorded in API_EXPORTS.md.
