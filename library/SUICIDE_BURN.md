SUICIDE_BURN

NORMALISED EXTRACT:
Table of contents:
- Definition and objective
- Continuous braking-distance formula
- Discrete-time ignition heuristic
- Practical algorithm for the lander simulator

Definition and objective:
- Suicide burn is a landing strategy that delays braking until the last possible moment so that braking reduces velocity just in time to avoid crash, minimising fuel consumption.
- For discrete per-tick models the goal is to find the earliest tick (ignition) where applying maximum practical thrust thereafter yields touchdown with safe velocity.

Continuous braking-distance formula (implementation-ready):
- For continuous scalar velocity v and maximum deceleration a_max (positive magnitude) the braking distance s_brake to obtain v_safe is:
  s_brake = max(0, (v^2 - v_safe^2) / (2 * a_max))
- For lander where thrust provides deceleration and gravity acts against braking, a_max should be net deceleration: a_max_net = thrust_acceleration - g.

Discrete-time ignition heuristic (mapping to simulator):
- Use discrete kinematics and the simulator's per-tick updates to estimate ignition altitude.
- Conservative discrete estimate:
  1. Use per-tick decel_per_unit = 4 m/s per fuel unit. If full burn per tick is N units, per-tick decel = 4*N and gravity per tick = 2, so net decel per tick approximates (4*N - 2).
  2. Convert braking distance formula into tick count by dividing by typical velocity per tick or perform forward simulation to compute exact ignition tick.

Practical algorithm (safe, implementable):
- Forward-simulation search (robust and exact for the discrete simulator):
  1. For ignitionTick from 0..maxSearchTicks:
     a. Simulate from current state with 0 burn until ignitionTick then apply a chosen burn policy (e.g., burn available fuel each tick or burn the minimum required each tick) until landing.
     b. If landing occurs with landingVelocity <= 4, accept ignitionTick as feasible and return the corresponding per-tick burns.
  2. Choose the earliest feasible ignitionTick to minimise fuel/time as required.
- Use a small safety margin (1-2 meters) because altitude updates happen in discrete increments.

DETAILED DIGEST:
Source: https://en.wikipedia.org/wiki/Suicide_burn — retrieved 2026-03-22 — bytes downloaded: 48625
This file contains the discrete and continuous formulas and a practical forward-simulation algorithm to implement a suicide-burn style controller in the project's simulator.

ATTRIBUTION:
Extracted and condensed from Wikipedia 'Suicide burn' (CC BY-SA) with mapping to the repository's discrete simulator semantics.
