TIME_OPTIMAL_CONTROL

NORMALISED EXTRACT:
Table of contents:
- Problem: minimize time-to-touchdown for the 2-state lander
- Double-integrator canonical result (bang-bang)
- Analytical matching conditions (two-phase bang-bang)
- Discrete-time adaptation and pragmatic solver

Problem and canonical result:
- For the canonical double integrator x'' = u with control bound |u| ≤ umax, the time-optimal control to move from (x0,v0) to (xf,vf) is bang-bang with at most one switch: apply u = +umax for time t1 then u = -umax for time t2 (or reversed), chosen to satisfy boundary conditions.
- For the lunar lander the dynamics include gravity; combine gravity into the double-integrator model by offsetting u or include it in the boundary equations.

Analytic matching conditions (implementation-oriented):
- If using continuous model with umax and target vf, the switching times t1 and t2 solve:
  v0 + umax*t1 - umax*t2 = vf + g*(t1 + t2)   (velocity condition)
  x0 + v0*(t1 + t2) + 0.5*umax*(t1^2 - t2^2) - 0.5*g*(t1 + t2)^2 = xf  (position condition)
- These two equations in two unknowns (t1, t2) can be solved numerically (Newton or root finders) to compute switching times when closed-form inversion is not trivial.

Discrete-time adaptation (practical):
- For a per-tick integer-thrust simulator the continuous analytic solution is approximate; implement a discrete, constructive solver:
  1. Use bang-bang hypothesis: there is a single ignition/switch tick after which full thrust is applied until touchdown.
  2. Binary-search or linear-search ignition tick and simulate forward; record time-to-touchdown. The minimal ignition tick that still yields safe landing is the time-optimal (earliest touchdown) among feasible ignition schedules.
- Advantages: deterministic, handles fuel limits and discretisation, cheap because fuel and altitude bounds are small.

IMPLEMENTATION PATTERN (step-by-step):
- Define fullBurn strategy (e.g., burn all available fuel each post-ignition tick or burn up to a per-tick limit).
- For ignition in [0..maxSearch]: simulate forward; record touchdown time and landing safety. Choose ignition producing minimal touchdown time subject to safety and fuel constraints.

DETAILED DIGEST:
Source: https://en.wikipedia.org/wiki/Time-optimal_control — retrieved 2026-03-22 — bytes downloaded: 52910
This file condenses the canonical bang-bang result for time optimality and maps it into a discrete per-tick search strategy suitable for the project's simulator.

ATTRIBUTION:
Content derived from the Wikipedia entry 'Time-optimal control' (CC BY-SA).