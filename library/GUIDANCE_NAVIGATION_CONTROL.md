GUIDANCE NAVIGATION CONTROL

NORMALISED EXTRACT:
Table of contents:
- Definitions: guidance vs navigation vs control (G, N, C)
- Control architectures suitable for 1D lander: open-loop, bang-bang, PID, suicide-burn
- Controller interface and expected behaviour for the simulator
- Practical autopilot patterns (forward-simulation, ignition search, fuel-aware policies)
- Troubleshooting and tuning notes (anti-windup, discretisation issues)

Definitions:
- Guidance: computing a desired trajectory or target state over time (e.g., target velocity profile or ignition time).
- Navigation: estimating current state (in this simulator navigation is trivial — exact state provided).
- Control: generating actuator commands (thrustUnits) to follow guidance given navigation data.
- In this project the controller receives full state and returns an integer thrustUnits. Guidance and control can be combined in a single controller function.

Control architectures (directly actionable patterns):
- Open-loop timed burn: compute a fixed ignition tick and burn schedule; use only if environment predictable.
- Bang-bang (time-optimal) control: at each tick either apply maximum feasible burn or none; optimal when discrete thrust is quantised and fuel is limited.
- PID-based closed-loop: compute thrust as function of error in velocity (or altitude) with discrete integral and derivative terms; clamp output to available fuel and include anti-windup.
- Suicide-burn (guidance-led ignition search): compute earliest ignition that, when followed by maximal or computed burns, results in safe touchdown. Implement with forward-simulation to exactly evaluate discrete semantics.

Controller interface and guarantees (exact):
- Signature: function controller(state) -> thrustUnits
  state: { altitude:number, velocity:number, fuel:number, tick:number, landed:boolean, crashed:boolean }
  thrustUnits: integer >= 0, will be clamped by simulator to available fuel
- Controller must not throw; when survival impossible it should return a sequence that leads to a crash trace, not an exception.
- Controllers should be deterministic and pure (no side-effects) so simulation traces are reproducible.

Practical autopilot patterns (implementation-ready):
- Forward-simulation ignition search (robust):
  1. For candidate ignitionTick from current.tick..current.tick+maxHorizon:
     a. Simulate from current state with 0 burn until ignitionTick, then apply a candidate burn policy (e.g., burn as-needed or full burn) until touchdown.
     b. If touchdown occurs with landingVelocity <= 4, accept and return burn schedule / per-tick thrust decisions.
  2. If no ignitionTick yields a safe landing, return policy that exhausts fuel (simulator will produce crash trace).
- PID velocity controller tuned to discrete model:
  u = Kp * (v_target - v) + Ki * integralError + Kd * (v - v_prev)
  convert u (m/s correction) to fuelUnits = clamp(round(u / thrustPerFuel), 0, state.fuel)
  Anti-windup: clamp integral when output saturates and/or use back-calculation.
- Bang-bang heuristic: if predicted stopping distance (using computeStoppingDistanceContinuous or discrete estimate) > altitude then apply maximum practical burn; else hold.

Troubleshooting and tuning (step-by-step):
- Symptom: oscillation near touchdown. Fix: reduce Ki, add anti-windup, or increase damping via Kd. Confirm integral term reset on touchdown.
- Symptom: overshoot/too hard landing. Fix: ignite earlier (add safety margin) or reduce target landing velocity.
- Symptom: uses too much fuel. Fix: search for later ignition tick in forward-simulation or reduce conservative margins.
- Symptom: no braking possible (fuel insufficient). Controller should detect a_net <= 0 and return crash trace (do not throw).

REFERENCE DETAILS (exact API and patterns):
- Controller function: (state) => thrustUnits
- Simulation step: see STEP_PHYSICS (v' = v + gravity - thrustUnits * thrustPerFuel; altitude' = altitude - v')
- Safety thresholds: landingVelocitySafe = 4 m/s
- Gravity per tick: 2 m/s; thrust per fuel unit: 4 m/s
- Scoring: score = 0 for crash, else (initialFuel - fuelUsed) * 10 + Math.max(0, (4 - landingVelocity) * 25)

DETAILED DIGEST:
Source: https://en.wikipedia.org/wiki/Guidance,_navigation,_and_control — retrieved 2026-03-22 — approx bytes downloaded: 124108 (~121.1 KB)
This extract maps high-level GNC concepts into concrete controller interfaces and actionable autopilot patterns for the simulator, including forward-simulation ignition search, PID-to-fuel conversion, bang-bang heuristics, and practical troubleshooting steps.

ATTRIBUTION:
Extracted and condensed from Wikipedia 'Guidance, navigation and control' (CC BY-SA) and adapted into actionable guidance for the project's discrete lander simulator.
