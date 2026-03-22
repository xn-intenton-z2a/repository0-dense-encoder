OPTIMAL_CONTROL

NORMALISED EXTRACT:
Table of contents:
- Problem statement (2-state lander)
- Continuous-time formulation
- Pontryagin Minimum Principle (PMP) essentials
- Switching function and bang-bang structure
- Discrete-time practical algorithm for lander

Problem statement (2-state lander):
- State vector x = [h, v] where h = altitude (m), v = velocity (m/s, positive toward surface).
- Dynamics (continuous approximation):
  h' = v
  v' = a(u) - g
  where g is gravitational acceleration (m/s^2) and a(u) is control acceleration caused by thrust; control u constrained to u_min <= u <= u_max.
- Typical objectives for lander: minimize fuel J_fuel = integral(u(t) dt) subject to terminal constraints h(T)=0 and v(T) <= v_safe; or minimize time T to reach h=0.

Pontryagin Minimum Principle (PMP) essentials (implementation-focused):
- Define cost integrand L(x,u,t) (e.g., L = u for fuel minimization, L = 1 for time minimization).
- Hamiltonian H(x,u,λ,t) = L(x,u,t) + λ1 * v + λ2 * (a(u) - g).
- Adjoint (costate) equations: λ' = -∂H/∂x.
- Optimal control u*(t) minimizes H pointwise: u*(t) = argmin_{u in U} H(x(t),u,λ(t),t).
- For dynamics affine in u and cost linear in u, the minimizer is at control bounds → bang-bang control.
- Switching function S(t) = ∂H/∂u = ∂L/∂u + λ2 * ∂a/∂u; sign(S) determines whether u is u_min or u_max.

Switching and structure (practical rules):
- For a lander where thrust appears linearly and fuel cost is linear, the optimal control is bang-bang: apply either zero thrust or maximum available thrust.
- The switching time(s) can be found by solving the boundary-value problem given PMP; for the double-integrator special case closed-form relationships exist (see time-optimal control), but in practice discrete models and constraints make analytic solutions fragile.

Discrete-time pragmatic algorithm (direct, implementable):
- Use the discrete model of the simulator (per-tick updates) and search for ignition/switching instants.
- Algorithm (forward-simulation search, small state space):
  1. Let MAX_TICKS be limited by fuel and reasonable safety bound (example 10000). For lander fuel ≤ 50 and altitude ≤ 2000, search space is small.
  2. For ignitionTick from 0..fuel (or a conservative upper bound):
     a. Simulate forward from current state applying 0 thrust for ignitionTick ticks, then apply full thrust (or per-tick allowable fuel) each subsequent tick until fuel exhausted or landing.
     b. If landing occurs with landingVelocity <= v_safe record this ignitionTick and the resulting per-tick burn schedule.
  3. Choose the earliest ignitionTick that yields a safe landing (minimizes fuel or time as desired).
- This method is deterministic, simple to implement, and robust to discretisation and non-linearities. It also naturally yields a valid burn schedule to feed into the simulator.

SUPPLEMENTARY DETAILS:
- Map continuous-control bounds to discrete per-tick actions: if one discrete action is "burn N units", treat u in continuous formulation as acceleration per unit multiplied by N and discretize integrals accordingly.
- Use a safety margin of 1-2 meters when computing ignition thresholds to account for one-tick resolution.
- Numerical solvers: direct transcription (collocation) is heavier; prefer lightweight forward-simulation for embedded autopilot in this project.

REFERENCE DETAILS (equations and implementation patterns):
- Continuous Hamiltonian for fuel-minimizing lander:
  H = u + λ1 * v + λ2 * (a(u) - g)
  Where a(u) is linear in u when thrust produces constant acceleration per unit.
- Switching rule: choose u* = u_min if S(t) > 0, u* = u_max if S(t) < 0 where S(t) = 1 + λ2 * ∂a/∂u (for L=u). Solve λ' backwards given terminal conditions from target constraints.
- Discrete switching search pseudocode (deterministic):
  For ignition = 0..maxIgnition:
    simulate = copy(state)
    for t=0..maxSimTicks:
      burn = 0 if t < ignition else min(simulate.fuel, fullBurnPerTick)
      simulate = step(simulate, burn)
      if simulate.landed: check safe landing and break
    if safe landing: return schedule that burns as simulated
- Implementation note: fullBurnPerTick can be chosen as remaining fuel (simplest) or limited to 1 unit per tick if model requires; the repository model clamps to available fuel per tick and allows integer burns.

DETAILED DIGEST:
Source: https://en.wikipedia.org/wiki/Optimal_control — retrieved 2026-03-22 — bytes downloaded: 293564
This document condenses PMP essentials and practical discrete search pattern suitable for the project's discrete per-tick lander.

ATTRIBUTION:
Content extracted and condensed from the Wikipedia article 'Optimal control' (CC BY-SA). See source for full exposition and references.
