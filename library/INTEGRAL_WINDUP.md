INTEGRAL_WINDUP

NORMALISED EXTRACT:
Table of contents:
- Definition of integral windup
- Causes in discrete PID implementations
- Anti-windup techniques with formulas
- Recommended discrete-time PID implementation with anti-windup

Definition and cause:
- Integral windup occurs when the integral term of a PID controller accumulates error during periods when the actuator is saturated, causing overshoot or slow recovery once actuation returns within limits.
- In discrete controllers with bounded integer thrust commands, long saturation can make the integral term large and destabilise the controller when actuation resumes.

Anti-windup techniques (practical, parameterised):
1. Conditional integration (stop integrating while output is saturated):
   - Update integral I only when controller output (unsaturated) is within actuator bounds.
   - Discrete formula: if |u_unsat| < u_max then I_next = I + Ki * e else I_next = I.
2. Integral clamping (hard limits on integral term):
   - I_next = clamp(I + Ki * e, I_min, I_max) with I_min/I_max chosen based on max actuator authority.
3. Back-calculation (anti-windup by feedback):
   - Compute unsaturated output u_unsat = Kp*e + I + Kd*derivative.
   - Saturate to u = clamp(u_unsat, u_min, u_max).
   - Adjust integral: I_next = I + Ki * e + (1/Tt) * (u - u_unsat) * dt where Tt is the tracking time constant (choose Tt > 0).
   - Discrete back-calculation (dt=1): I_next = I + Ki*e + (1/Tt)*(u - u_unsat).

Recommended discrete-time PID with anti-windup (implementable):
- Let dt = 1 (one tick). Variables: e = setpoint - measurement, e_prev = previous error, I = integral accumulator.
- Gains: Kp, Ki, Kd; actuator bounds u_min, u_max (integer if required).
- Step:
  1. deriv = e - e_prev
  2. u_unsat = Kp*e + I + Kd*deriv
  3. u = clamp(round(u_unsat), u_min, u_max)   // round if actuator accepts integers
  4. I = I + Ki*e + (1/Tt)*(u - u_unsat)  // back-calculation anti-windup, choose Tt based on desired anti-windup aggression
  5. e_prev = e
  6. return u
- Choose Ki relative to dt and desired integral time; with dt=1, Ki is per-tick increment.

Parameter guidance and examples:
- If actuator is small integer units (0..50), scale Kp/Ki/Kd so that an error of typical magnitude produces an integer command in the valid range.
- Example starting values for tuning a lander vertical velocity loop (tune empirically): Kp ~ 0.1–1.0, Ki ~ 0.01–0.1, Kd ~ 0.0–0.5 (subject to measurement units). Use conservative Ki to avoid windup.
- Set Tt to a small multiple of tick duration (e.g., 2–10 ticks) to provide moderate back-calculation correction.

DETAILED DIGEST:
Source: Wikipedia 'Integral windup' and CTMS/CTMS-PID resources — retrieved 2026-03-22 — bytes downloaded: 79645

ATTRIBUTION:
Condensed from Wikipedia 'Integral windup' (CC BY-SA) and control tutorials (CTMS). Implementation patterns adapted for discrete integer-actuator environments used by the lander simulator.
