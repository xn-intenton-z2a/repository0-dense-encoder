LUNAR_LANDER

Table of Contents
1. Overview
2. Key technical points (actionable)
3. Landing stages (implementation notes)
4. Discrete simulation guidance (explicit update equations)
5. Reference API signatures (plain types)
6. Digest (source extract and retrieval)
7. Attribution and data size

Normalised extract (direct technical items)
- No atmosphere on the Moon: aerobraking is not available; descent must use propulsion to decelerate.
- Typical landing stages: descent orbit insertion; descent and braking via propulsion; final approach with fine adjustments; touchdown where engines may be cut shortly before contact to avoid regolith damage.
- Engines and landing gear: engines provide all deceleration; landing mechanisms are designed to survive a small uncontrolled fall after engine cutoff.
- Design constraints: high gravity relative to small bodies and the lack of atmosphere increase fuel requirements and require precise thrust management.

Detailed information for items above
- No atmosphere implies all deceleration is achieved via thrust; so simulation must model thrust-induced delta-v per actuation and continuous gravity-induced acceleration per tick.
- Landing stages map to simulation phases: (a) approach (high-speed deceleration), (b) precision approach (fine control to achieve target touchdown velocity), (c) touchdown (engines often cut and landing gear absorbs remaining energy).
- Touchdown safety: real systems often cut engines a few meters above ground to avoid ejecta; landing gear must tolerate the residual drop. In a discrete simulation, mark landed when altitude <= 0 and evaluate landing velocity to decide safe vs crash.

Supplementary details (implementation-ready)
- Constants used in mission: gravity_per_tick = 2 (m/s per tick, increases downward speed); delta_v_per_fuel_unit = 4 (m/s reduction per fuel unit burned in the tick); safe_touchdown_velocity = 4 (m/s or less = safe).
- Discrete step (dt = 1 tick):
  velocity_next = velocity + gravity_per_tick - (thrustUnits * delta_v_per_fuel_unit)
  altitude_next = altitude - velocity_next
  fuel_next = fuel - thrustUnits (clamped to >= 0)
  tick_next = tick + 1
  landed = altitude_next <= 0 and abs(velocity_next) <= safe_touchdown_velocity
  crashed = altitude_next <= 0 and abs(velocity_next) > safe_touchdown_velocity
  altitude_next_report = max(0, altitude_next)
- Notes: apply thrust clamped to available fuel; treat velocity as "toward surface" positive so altitude decreases by velocity each tick; detect landing at the first tick where altitude_next <= 0 and record the impact velocity as velocity_next.

Reference details (API signatures and types)
- State shape (plain JS object): { altitude: number, velocity: number, fuel: number, tick: number, landed: boolean, crashed: boolean }
- step(state, thrustUnits) -> State
  - params: state: State, thrustUnits: integer (0..state.fuel)
  - returns: new immutable State as described above
- simulate(initialState, controller) -> State[]
  - params: initialState: State, controller: function(state: State) -> integer (thrustUnits)
  - returns: array of State objects representing each tick from start to landed/crashed terminal state
- autopilot(state) -> integer (thrustUnits)
  - built-in controller must accept state and return thrustUnits (integer). Controller must never throw; returning 0 is allowed.
- scoreLanding(initialFuel: number, finalFuel: number, landingVelocity: number) -> number
  - returns 0 for crash; otherwise (initialFuel - finalFuel) * 10 + Math.max(0, (4 - landingVelocity) * 25)

Digest (extracted source content and retrieval)
- Extract (Wikipedia, first paragraphs): "A lunar lander or Moon lander is a spacecraft designed to land on the surface of the Moon... The relatively high gravity and lack of lunar atmosphere negates the use of aerobraking, so a lander must use propulsion to decelerate and achieve a soft landing." (retrieved 2026-03-22)
- Retrieved bytes: 19357 bytes (API extract response)

Attribution
- Source: https://en.wikipedia.org/wiki/Lunar_lander (Wikipedia: "Lunar lander")
- Retrieval date: 2026-03-22
- Retrieved content size: 19357 bytes
