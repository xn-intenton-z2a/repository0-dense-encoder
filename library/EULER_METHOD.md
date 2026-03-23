EULER_METHOD

Table of Contents
1. Method definition and order
2. Discrete update formulas for 1D lander physics
3. Numerical considerations
4. Reference signatures
5. Digest and attribution

Normalised extract (direct technical items)
- The Euler method (forward Euler) is a first-order explicit numerical integrator for ODEs: y_{n+1} = y_n + f(t_n, y_n) * dt. Local truncation error is O(dt^2) and global error O(dt).

Discrete update formulas (applied to lander model, dt = 1 tick)
- Let gravity_per_tick = g, thrustDeltaV = thrustUnits * dv_per_unit.
- Acceleration a = -thrustDeltaV (instant velocity reduction from thrust considered as immediate delta-v) plus gravity increment treated as an additive velocity change per tick. For mission model use the specified discrete updates:
  - velocity_next = velocity + gravity_per_tick - (thrustUnits * dv_per_unit)
  - altitude_next = altitude - velocity_next
- Because the mission uses a per-tick discrete model (effectively dt = 1), the Euler update equates to applying the per-tick velocity increment directly; this is consistent with forward-Euler semantics for f = acceleration.

Numerical considerations
- Euler is simplest and sufficient for this per-tick, event-driven simulation; be aware of integration error if fractional sub-ticks or smaller dt are introduced. For high-accuracy continuous models, prefer higher-order RK methods.
- When altitude crosses zero, stop simulation and use the impact velocity computed at that tick; optionally compute a fractional sub-step to estimate exact impact velocity if higher fidelity is required.

Reference details (signatures)
- integrateEuler(state, computeAcceleration, dt=1) -> newState
  - computeAcceleration(state) -> acceleration (m/s^2) or delta_v for dt
- step(state, thrustUnits) -> newState (uses Euler formulas given above)

Digest (extracted and retrieval)
- Extract (Wikipedia "Euler method"): "The Euler method is a first-order numerical procedure for solving ODEs with a given initial value... it is the most basic explicit method..." (retrieved 2026-03-22)
- Retrieved bytes: 83757 bytes (API extract response)

Attribution
- Source: https://en.wikipedia.org/wiki/Euler_method
- Retrieval date: 2026-03-22
- Retrieved content size: 83757 bytes
