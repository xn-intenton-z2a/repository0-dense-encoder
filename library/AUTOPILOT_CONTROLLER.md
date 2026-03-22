AUTOPILOT_CONTROLLER

NORMALISED EXTRACT:
Table of contents:
- Objective and constraints
- Suicide-burn ignition condition (analytic)
- Discrete implementation (safe thrust calculation)
- Fallbacks and fuel exhaustion behaviour

Objective:
- Autopilot must return integer thrustUnits each tick given the lander state; primary goal is to land (altitude==0) with velocity <= 4 m/s when touching down.
- Operate across initial ranges: altitude 500–2000 m, velocity 20–80 m/s, fuel 10–50 units.

Suicide-burn analytic condition (continuous approximation):
- For constant maximum deceleration a_max, braking distance s_brake to reduce velocity v to v_safe is:
  s_brake = (v^2 - v_safe^2) / (2 * a_max)
- In the discrete per-tick model with dt=1 and thrustPerFuel = 4 m/s per fuel unit, treat a_max_per_tick = thrustPerFuel (per fuel unit) * u_max_fuel_per_tick (units burned per tick) + gravityPerTick (signs accounted)
- Practical autopilot uses full-thrust braking when remaining altitude <= estimated s_brake (with safety margin)

Discrete safe thrust calculation (algorithmic steps):
1. Constants: gravity = 2, thrustPerFuel = 4, v_safe = 4
2. Read current state: a = state.altitude, v = state.velocity, f = state.fuel
3. If a <= 0 return 0 (already landed/crashed)
4. Compute continuous braking distance using a_max = thrustPerFuel * maxPossibleFuelPerTick (choose conservatively as f, or limit per tick if desired):
   s_brake = max(0, (v*v - v_safe*v_safe) / (2 * (thrustPerFuel * 1)))
   (Use thrustPerFuel*1 to estimate per-unit braking; more accurate uses iterative simulation shown below)
5. If a <= s_brake + margin then burn min(f, Math.ceil((v - v_safe) / thrustPerFuel)) — i.e., enough units to drop velocity toward v_safe immediately.
6. Otherwise, burn 0 (coast) or 1 unit to trim velocity if above a conservative cruise speed.

Iterative discrete simulation (recommended robust pattern):
- Simulate future ticks assuming full burn each tick up to remaining fuel to find earliest tick where altitude<=0 and landing velocity <= v_safe; choose burn strategy accordingly.
- Pseudocode: simulate forward: for t from 0..f simulate applying candidate thrust schedule (e.g., 0 until ignitionTick then full) and check landing outcome; pick earliest ignitionTick that yields safe landing. This exhaustive search is small because fuel and altitude ranges are modest.

Implementation note (efficient variant):
- Compute required per-tick decel schedule by solving discrete kinematics: iterate backward from ground computing required v at each altitude slice; simpler: binary search ignition tick and simulate forward with full-burn thereafter.

Fallbacks:
- If fuel insufficient to achieve v_safe at touchdown, the autopilot should still return a trace (it may result in crash) and never throw.
- Avoid integral accumulation or stateful controllers that would crash on restart; keep autopilot stateless, pure function of state.

SUPPLEMENTARY DETAILS:
- Use margin = 1.0–2.0 meters to account for discretisation.
- To avoid oscillation, add hysteresis: if previously commanding thrust, require a small lower bound to stop thrust only when safe.

REFERENCE DETAILS:
Signature: function autopilotController(state) -> integer thrustUnits
- Stateless: uses only the passed state
- Algorithmic patterns provided: immediate braking heuristic or forward-simulation search for ignition tick

Concrete forward-simulation example (plain text):
- Input: state, assume fullBurn = (fuelAvailable each future tick)
- For ignitionTick from 0..state.tick+maxSearch do:
  - Simulate from copy of state applying thrust=0 for ignitionTick ticks, then thrust=fuelRemaining each subsequent tick until fuel exhausted or landing
  - If landing occurs with landingVelocity <= 4 return thrust plan that burns 0 until ignitionTick and then full thereafter (or compute per-tick units required)
- If no ignitionTick succeeds return 0 (will crash)

DETAILED DIGEST:
Sources retrieved 2026-03-22: suicide burn page, discrete kinematics, PID and control references; raw downloaded bytes for sources captured in API_EXPORTS.md.

Attribution: algorithmic strategy synthesised from Suicide burn and discrete kinematics sources plus control theory references.
