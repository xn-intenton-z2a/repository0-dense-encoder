PID_CONTROLLER

Table of Contents
1. PID formula (continuous)
2. Discrete implementation (explicit formulas)
3. Anti-windup and clamping
4. Mapping controller output to discrete thrust units
5. Reference signatures and usage notes
6. Digest and attribution

Normalised extract (direct technical items)
- PID controller (Proportional–Integral–Derivative) computes a control signal using three terms: proportional to current error, integral of past error, and derivative of error trend.
- Continuous formula: u(t) = Kp * e(t) + Ki * integral_0^t e(τ) dτ + Kd * de(t)/dt

Discrete implementation (dt = 1 tick recommended)
- Use a discrete-time implementation where dt = 1 for per-tick simulation. Represent the controller with state {prevError, integral}.
- Discrete formula (dt = 1):
  - error = setpoint - measurement
  - integral_next = integral + error * dt (apply clamping, see anti-windup)
  - derivative = error - prevError
  - u = Kp * error + Ki * integral_next + Kd * derivative
- Map u (continuous) to thrust units by rounding and clamping: thrustUnits = clamp(round(u), 0, availableFuel)

Anti-windup and clamping
- On actuator saturation clamp integral_next to [I_min, I_max] to prevent integral windup.
- Alternative anti-windup: conditional integration (only integrate when output not saturated) or back-calculation.

Tuning notes (practical)
- Start with Kp small to avoid instability, add Kd to reduce overshoot, Ki to remove steady-state bias. Ziegler–Nichols is a quick heuristic but manual tuning or automated search (grid, binary search) works for discrete lander across parameter ranges.

Reference details (signatures)
- pidInit(Kp, Ki, Kd) -> pidState
  - pidState: {Kp:number, Ki:number, Kd:number, prevError:number=0, integral:number=0}
- pidStep(pidState, setpoint:number, measurement:number, dt:number=1) -> {output:number, pidState}
  - returns output (continuous), updated pidState (store prevError, integral)
- mapOutputToThrust(output:number, fuel:number) -> integer thrustUnits
  - clamp(round(output), 0, fuel)

Digest (extracted and retrieval)
- Extract (Wikipedia "Proportional–integral–derivative controller"): "A PID controller is a feedback-based control loop mechanism... P responds to present error, I to accumulated past error, D to predicted future error from rate of change..." (retrieved 2026-03-22)
- Retrieved bytes: 108758 bytes (API extract response)

Attribution
- Source: https://en.wikipedia.org/wiki/PID_controller (Proportional–integral–derivative controller)
- Retrieval date: 2026-03-22
- Retrieved content size: 108758 bytes
