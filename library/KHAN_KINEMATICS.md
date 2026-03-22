KHAN_KINEMATICS — One-dimensional motion — Extracted technical reference

Table of contents
- Definitions and sign conventions
- Continuous constant-acceleration equations
- Discrete-time integration patterns (explicit, semi-implicit, closed-form)
- Stopping distance and time-to-stop formulas
- Mission tick model (gravity + thrust) and per-tick update recipe
- Planning thrust: heuristics and backward simulation
- Numerical stability and implementation notes
- Troubleshooting and edge cases
- Detailed digest and retrieval
- Attribution and data size

Definitions and sign conventions
- altitude h (meters). Mission convention: h >= 0, surface at h = 0; altitude decreases toward the surface.
- velocity v (m/s). Mission convention used here: positive v means motion toward the surface (downwards).
- acceleration a (m/s^2). Positive a increases v (moves downward faster under mission sign convention).
- time step dt (seconds per tick). The mission treats dt = 1 per tick by default.

Continuous constant-acceleration equations (exact for constant a)
- v(t + dt) = v(t) + a * dt
- s(t + dt) = s(t) + v(t) * dt + 0.5 * a * dt^2
These are primary formulas for planning and closed-form checks.

Stopping distance and time-to-stop (constant deceleration magnitude d > 0)
- time to stop: t_stop = v / d
- stopping distance: d_stop = v^2 / (2 * d)
Use these to compute minimal distance required to reduce speed to zero when deceleration is constant.

Discrete-time integration patterns
- Explicit (forward) Euler:
  v_next = v + a * dt
  s_next = s + v * dt
  Notes: simple but can be unstable for stiff or high-acceleration sequences.

- Semi-implicit (symplectic) Euler (recommended for simple physics ticks):
  v_next = v + a * dt
  s_next = s + v_next * dt
  Notes: improved stability and energy behaviour; use when acceleration is applied before position update.

- Closed-form per-step (exact for constant acceleration over dt):
  v_next = v + a * dt
  s_next = s + v * dt + 0.5 * a * dt^2
  Notes: use when a is constant during the tick; matches analytical integration.

Mission tick model (discrete recipe matching the project's physics)
Constants (mission):
- gravity impulse per tick: g_delta_v = +2 m/s (adds to velocity each tick)
- thrust per fuel unit: thrust_delta_v_unit = -4 m/s (instantaneous reduction in velocity per fuel unit burned)
- safe landing speed threshold: v_safe = 4 m/s
- dt = 1 tick (default for discrete updates)

Per-tick update algorithm (implementation-ready, plain-object immutable state result):
1) Controller returns requested thrustUnits (number). Define fuel consumption semantics: typically integer units; clamp using floor if fractional.
2) thrustUnits_clamped = min(max(0, floor(thrustUnits)), fuelAvailable)
3) delta_v_thrust = thrustUnits_clamped * (-4)  // reduces downward speed
4) v_after_thrust = v + delta_v_thrust
5) v_next = v_after_thrust + 2  // gravity adds +2 m/s
6) h_next = h - v_next  // altitude decreases by downward velocity; if dt != 1 then h_next = h - v_next * dt
7) f_next = f - thrustUnits_clamped
8) landed = h_next <= 0
9) if landed then
     final_velocity = v_next
     crashed = final_velocity > 4
   else crashed = false
10) tick_next = tick + 1
Return new state object: { altitude: max(0, h_next), velocity: v_next, fuel: f_next, tick: tick_next, landed, crashed }

Notes on ordering and collision detection
- Apply thrust before gravity to model instantaneous engine impulse at the start of the tick; then apply gravity as constant acceleration for that tick.
- Check landing after position update. If landing occurs with h_next <= 0, use v_next as landing velocity to determine crash criteria.

Planning thrust: heuristics and algorithmic options
- Greedy per-tick heuristic: compute required thrustUnits this tick to keep next-tick altitude positive under worst-case future gravity; apply minimal units to avoid immediate crash.
- Backward simulation (optimal planning): starting from target landing conditions, simulate backwards using available discrete thrust actions to compute earliest safe thrust schedule. Works but more complex to implement.
- Suicide-burn heuristic: delay major thrust until last possible ticks by estimating when stopping distance equals remaining altitude; requires estimating multi-tick deceleration including gravity.

Numerical stability and implementation notes
- Use integer fuel semantics for deterministic traces; if fractional fuel is required, define conversion to continuous thrust (e.g., fractional fuel * 4 m/s reduction) and document controller contract.
- Semi-implicit Euler (v updated then position) reduces altitude overshoot for typical discrete thrust+gravity tick models and is recommended.
- Ensure altitude never becomes negative in returned state; clamp to zero and record landed = true.

Troubleshooting and edge cases
- Zero fuel: autopilot should return a trace that may end in crash if initial conditions are unsalvageable; algorithm must not throw.
- Already landed initial state (h <= 0): return state with landed true and crashed computed from initial velocity.
- Very high initial velocity with insufficient fuel: plan for consistent crash trace rather than exceptions.

Detailed digest and retrieval
- Extracted core 1D motion equations, discrete integration patterns, and direct per-tick update recipe mapped to mission constants above.
- Retrieved: 2026-03-22
- Source: https://www.khanacademy.org/science/physics/one-dimensional-motion
- Data obtained during crawling: HTML snapshot retrieved (~162 KB)

Attribution
Content condensed from Khan Academy one-dimensional motion lessons (conceptual equations and discrete integration patterns) and adapted to the mission's tick model and numeric semantics.
