API_EXPORTS

NORMALISED EXTRACT:
Table of contents:
- Export list
- State shape
- Function signatures and contracts

Export list:
- createState(initial?: { altitude?: number, velocity?: number, fuel?: number }) -> state
- step(state, thrustUnits) -> state
- simulate(initialStateOrConfig, controller) -> trace (Array of states)
- autopilotController(state) -> thrustUnits
- scoreLanding(trace, initialFuel) -> number

State shape:
state = { altitude: number, velocity: number, fuel: number, tick: number, landed: boolean, crashed: boolean }

Function contracts:
createState(initial)
- initial: optional object with altitude, velocity, fuel
- returns: state with defaults: altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false

step(state, thrustUnits)
- thrustUnits: integer >= 0, clamped to available fuel
- physics order: consume thrustUnits from fuel, apply gravity (add 2 m/s to velocity), apply thrust (subtract thrustUnits * 4 m/s from velocity), update altitude = altitude - newVelocity, increment tick, clamp altitude>=0 and set landed/crashed flags when altitude <= 0

simulate(stateOrConfig, controller)
- controller: function(state) => integer thrustUnits
- returns: full trace array of states from initial to terminal (landed or crashed)

autopilotController(state)
- must accept a state and return integer thrustUnits (0..fuel)
- must not throw; when fuel exhausted return 0

scoreLanding(trace, initialFuel)
- returns 0 for crashes; otherwise (initialFuel - fuelRemaining) * 10 + Math.max(0, (4 - landingVelocity) * 25)

SUPPLEMENTARY DETAILS:
- Default constants: gravityPerTick = 2 m/s per tick, thrustPerFuel = 4 m/s velocity reduction per fuel unit, safeLandingVelocity = 4 m/s
- Units: meters (m), meters per second (m/s), discrete ticks (unit time = 1)
- All state objects are plain immutable objects; step returns a new object

REFERENCE DETAILS:
Exact signatures (plain text):
export function createState(initial = { altitude: 1000, velocity: 40, fuel: 25 }) -> { altitude, velocity, fuel, tick, landed, crashed }
export function step(state, thrustUnits) -> newState
export function simulate(initialStateOrConfig, controller) -> Array<state>
export function autopilotController(state) -> integer
export function scoreLanding(trace, initialFuel) -> number

DETAILED DIGEST:
Sources retrieved 2026-03-22 (bytes downloaded during crawl):
01 https://en.wikipedia.org/wiki/Lunar_lander 208202 bytes
02 https://en.wikipedia.org/wiki/Suicide_burn 48625 bytes
03 https://en.wikipedia.org/wiki/PID_controller 482946 bytes
04 https://en.wikipedia.org/wiki/Euler_method 402154 bytes
05 https://gafferongames.com/post/integration_basics/ 32150 bytes
06 https://en.wikipedia.org/wiki/Equations_of_motion 405630 bytes
07 https://en.wikipedia.org/wiki/Tsiolkovsky_rocket_equation 318798 bytes
08 https://en.wikipedia.org/wiki/Bang%E2%80%93bang_control 77766 bytes
09 https://brettbeauregard.com/blog/2011/04/improving-the-beginners-pid-introduction/ 0 bytes (download failed)
10 https://en.wikipedia.org/wiki/Stopping_distance 77406 bytes
11 https://en.wikipedia.org/wiki/Kinematics 572609 bytes

Attribution: content synthesised from the sources above; sizes shown are raw bytes downloaded at retrieval time.
