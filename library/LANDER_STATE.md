LANDER_STATE

NORMALISED EXTRACT:
Table of contents:
- State fields and types
- Default initial conditions
- Immutability contract

State fields:
- altitude: number (meters). Initial default: 1000
- velocity: number (m/s, positive means moving toward surface). Initial default: 40
- fuel: integer (units). Initial default: 25
- tick: integer (discrete time step counter). Initial default: 0
- landed: boolean (true when altitude == 0 and landing velocity <= safe threshold)
- crashed: boolean (true when altitude == 0 and landing velocity > safe threshold)

Defaults and validation:
- createState(initial?) accepts a partial object and fills defaults
- altitude must be >= 0, velocity any real number, fuel >= 0 integer

Immutability:
- All API functions return new plain objects; callers must treat states as immutable

SUPPLEMENTARY DETAILS:
- Safe landing velocity threshold: 4 m/s
- Gravity per tick: +2 m/s applied to velocity each tick
- Thrust effect: each fuel unit burned reduces velocity by 4 m/s immediately in the same tick
- Time step dt = 1 (tick)

REFERENCE DETAILS:
createState(initial?: { altitude?: number, velocity?: number, fuel?: number }) -> state
- fills missing values with defaults and returns validated state

Advance semantics summary (order):
1. clamp thrustUnits to [0, state.fuel]
2. newFuel = state.fuel - thrustUnits
3. velocityAfterGravity = state.velocity + gravityPerTick
4. velocityAfterThrust = velocityAfterGravity - thrustUnits * thrustPerFuel
5. newAltitude = state.altitude - velocityAfterThrust
6. tick++
7. if newAltitude <= 0 then landing: set altitude = 0; set landed = velocityAfterThrust <= safeLandingVelocity; set crashed = !landed
8. return new state object with updated fields

DETAILED DIGEST:
Sources retrieved 2026-03-22; see SOURCES.md for full list; sizes (bytes):
01 https://en.wikipedia.org/wiki/Lunar_lander 208202
02 https://en.wikipedia.org/wiki/Suicide_burn 48625
... (see API_EXPORTS for full list)

Attribution: core physics model values (gravity=2, thrust=4, defaults) come from project mission spec; supporting theory from the listed sources.
