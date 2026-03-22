EQUATIONS OF MOTION

NORMALISED EXTRACT:
Table of contents:
- 1D continuous kinematic equations (implementation-ready)
- Discrete per-tick mapping (dt = 1) matched to simulator conventions
- Continuous braking / stopping-distance formulas (exact)
- Discrete braking ticks and distance (closed-form approximations)
- Implementation patterns and function signatures

1D continuous kinematic equations (implementation-ready):
- Position (altitude) as a function of time (scalar, axis aligned toward surface):
  s(t) = s0 + v0 * t + 0.5 * a * t^2
- Velocity as a function of time:
  v(t) = v0 + a * t
- Velocity-position relation (no explicit time):
  v^2 = v0^2 + 2 * a * (s - s0)
- Definitions: altitude s measured from surface (higher = larger); velocity v positive when moving downward toward surface; acceleration a positive increases downward speed.

Discrete per-tick mapping (dt = 1) — exact pattern for this simulator:
- Constants:
  gravityPerTick = +2  // increases downward velocity
  thrustPerFuel = 4   // m/s velocity reduction per fuel unit burned this tick
- Given state: { altitude, velocity, fuel }
- Per-tick update (matching STEP_PHYSICS semantics):
  1. fuel' = fuel - thrustUnits (clamp >= 0)
  2. v' = velocity + gravityPerTick - (thrustUnits * thrustPerFuel)
  3. altitude' = altitude - v'
  4. tick' = tick + 1
  5. if altitude' <= 0 then altitude' = 0 and landing check: landed = (v' <= 4), crashed = !landed
- This is the semi-implicit Euler (velocity updated before position) discretisation; use it for consistent, stable per-tick simulation.

Continuous braking / stopping-distance formulas (exact):
- For continuous motion with constant net deceleration a_net (a_net > 0 is magnitude of deceleration):
  stopping distance to reduce velocity from v to v_safe is:
  s_brake = max(0, (v^2 - v_safe^2) / (2 * a_net))
- For a lander where thrust provides deceleration opposing gravity, choose a_net = thrust_acceleration - gravity (use magnitudes):
  thrust_acceleration = thrustPerFuel * burnRate (m/s^2 equivalent scaled to simulator dt)
  gravity = gravityPerTick (per second equivalent with dt=1 approximation)
- If a_net <= 0 then braking is impossible with the chosen burn (no finite stopping distance).

Discrete braking ticks and distance (closed-form approximations):
- Model constant net acceleration per tick a (can be negative if thrust > gravity, reducing v):
  v_k = v0 + k * a
  distance over k ticks (using simulator order: update v then altitude) = sum_{i=1..k} v_i = k * v0 + a * k * (k + 1) / 2
- To find minimal integer k such that v_k <= v_safe solve for k in v0 + k*a <= v_safe (when a < 0):
  k >= ceil((v_safe - v0) / a)
  (note: a is negative when decelerating; rearrange to positive form in implementation)
- Then compute discrete distance using S(k) above and compare to altitude to decide ignition.
- When net deceleration varies per tick (e.g., fuel-limited burns), use forward numerical summation (fast) rather than closed form.

IMPLEMENTATION PATTERNS (actionable):
- computeStoppingDistanceContinuous(velocity, v_safe, a_net) -> number
  returns (v^2 - v_safe^2) / (2 * a_net) or Infinity if a_net <= 0
- computeStoppingTicksDiscrete(velocity, v_safe, netAccelPerTick) -> integer ticks
  if netAccelPerTick == 0 return Infinity
  else return Math.max(0, Math.ceil((v_safe - velocity) / netAccelPerTick)) with careful sign handling
- simulateForwardTicks(state, burnsPerTickArray) -> trace
  required to evaluate feasibility when burn pattern changes over time

SUPPLEMENTARY DETAILS:
- Sign conventions must be consistent across physics and controller: velocity positive downward; altitude decreases by velocity each tick.
- Semi-implicit Euler (v then s) maps directly to the project's step implementation and reduces energy growth compared to explicit Euler.
- When designing controllers, prefer discrete forward simulation (simulateForwardTicks) to evaluate candidate burn policies exactly for the simulator semantics.

REFERENCE DETAILS (precise formulas, parameters):
- Continuous stopping distance: s_brake = (v^2 - v_safe^2) / (2 * a_net)
- Discrete velocity after k ticks: v_k = v0 + k * a
- Discrete cumulative distance (with velocity updated then applied per tick): S(k) = k*v0 + a * k*(k+1)/2
- Controller signature expected by simulator: (state) => thrustUnits (integer)
- Step signature: step(state, thrustUnits) -> newState where thrustUnits is clamped to [0, state.fuel]

DETAILED DIGEST:
Source: https://en.wikipedia.org/wiki/Equations_of_motion — retrieved 2026-03-22 — approx bytes downloaded: 427136 (~417.5 KB)
This extract converts continuous kinematic equations into discrete per-tick equivalents and provides closed-form and discrete formulas for stopping distance and tick-count braking. It includes implementation-ready function signatures and discrete summations matched to the project's per-tick step semantics.

ATTRIBUTION:
Extracted and condensed from Wikipedia 'Equations of motion' (CC BY-SA) and adapted to the project's discrete-per-tick simulator semantics.
