CTMS_PID

Normalised extract (key technical points)

Table of contents
1. Discrete PID algorithm (forms and formulas)
2. PID term meanings and units (Kp, Ki, Kd, dt)
3. Discretisation and numerical update rules
4. Anti-windup and output saturation handling
5. Derivative filtering and smoothing
6. Mapping PID output to lander thrust units and fuel
7. Suggested conversion and safety limits for lunar-lander simulation

1. Discrete PID algorithm (forms and formulas)
error = setpoint - measurement
I[t] = I[t-1] + error * dt
D = (error - prevError) / dt
output = Kp * error + Ki * I[t] + Kd * D

Notes: use dt = 1.0 for the mission discrete tick model (one tick per simulation step). Ki and Kd in the discrete implementation are used directly as shown above; there is no implicit continuous-to-discrete transform required if dt=1.

2. PID term meanings and units
- Kp (proportional gain): output units per unit error. If controlling velocity (m/s), Kp produces m/s of commanded deceleration per 1 m/s of velocity error.
- Ki (integral gain): adds output per unit-time accumulated error. In discrete ticks, Ki units are output per (error * tick).
- Kd (derivative gain): output per rate of error change (per tick). Use derivative to damp oscillation.
- dt: sample interval; mission uses dt = 1 tick.

3. Discretisation and numerical update rules
- Use exact update steps above; update order for each tick:
  a. compute error = target - measurement
  b. compute derivative = (error - prevError)/dt
  c. integrate: I += error * dt
  d. compute raw output = Kp*error + Ki*I + Kd*derivative
  e. apply saturation/clamp to raw output to get commanded output
  f. optionally correct I (anti-windup) when saturated (see section 4)
- For derivative noise reduction, compute derivative on measurement rather than setpoint when setpoint changes abruptly.

4. Anti-windup and output saturation handling
- Problem: integral term grows when actuator is saturated, causing overshoot.
- Simple conditional integration: only accumulate I when output is not saturated or when error sign would reduce saturation (error*output < 0).
- Back-calculation method: when output is saturated, apply I = I + (1/Tt) * (satOutput - rawOutput) * dt, where Tt is tracking time constant. Choose Tt conservatively (e.g., 5-20 ticks).
- Practical default for discrete lander: if commanded thrust units are clamped to available fuel, stop integrating until output falls below clamp.

5. Derivative filtering and smoothing
- Raw derivative amplifies noise. Use a first-order low-pass filter on derivative:
  D_filtered = alpha * D_filtered_prev + (1 - alpha) * D_raw
  where alpha in [0.7, 0.99] for modest smoothing. With dt=1, pick alpha=0.8 as starting point.

6. Mapping PID output to lander thrust units and fuel
- Mission mapping: each fuel unit burned reduces velocity by 4 m/s per tick. Gravity adds 2 m/s per tick.
- Two options to use PID output:
  A) PID outputs desired deltaV (m/s of deceleration). Convert to fuel units:
     fuelNeeded = desiredDeltaV / 4.0
     thrustUnits = clamp(round(fuelNeeded), 0, state.fuel)
  B) Tune PID directly in 'fuel units' space so PID output is thrustUnits per tick; then clamp and cast to integer.
- Recommended: use option A to reason in physical units (m/s). That keeps gains interpretable.

7. Suggested conversion and safety limits for lunar-lander simulation
- Use dt = 1 tick, gravity g = +2 m/s per tick (adds to downward velocity), thrust effect per fuel unit = -4 m/s on velocity.
- Cap thrustUnits between 0 and state.fuel and also by a per-tick maximum (e.g., max 5 units per tick) to keep discrete behavior smooth.
- Floor or round control output to integer with rounding to nearest; avoid truncation which biases control downward.

Supplementary details (implementation specifics)
- Choose initial setpoint for PID as target vertical velocity that is safe at touchdown, e.g., setpointVelocity = 0 m/s or a small negative value (e.g., -0.5 m/s) to ensure gentle approach. In many designs the controller drives velocity towards a small negative or zero target while using altitude to modulate setpoint.
- For altitude-aware control, implement a two-loop architecture: outer loop computes desired velocity target from altitude error (feedforward braking or stopping distance calculation), inner loop is the PID acting on velocity error. Outer loop can be a proportional law mapping altitude error to velocity setpoint with saturation.
- Example outer loop: desiredVelocity = clamp(k_alt * altitudeError, -maxDescentRate, maxDescentRate)

Reference details (API, signatures, parameter effects)
- autopilot controller (public API expected by mission):
  signature: function autopilotController(state) => thrustUnits
  parameters: state: { altitude: Number, velocity: Number, fuel: Number, tick: Number, landed: Boolean, crashed: Boolean }
  returns: integer thrustUnits to burn this tick (0..state.fuel)
- PID helper pattern (recommended):
  createPid({Kp, Ki, Kd, dt, outputMin, outputMax, derivativeFilterAlpha}) => {
    update(error) => { output, internalState }
  }
  where update computes output using formulas above and handles saturation/anti-windup.
- Configuration options and effects:
  - Kp: increases responsiveness, reduces steady-state error but may increase overshoot.
  - Ki: eliminates steady-state error; increases aggressiveness and risk of windup.
  - Kd: damps oscillation; too large increases noise sensitivity.
  - derivativeFilterAlpha: smooths derivative signal; higher = more smoothing but slower response.

Best practices and troubleshooting
- Start with Ki=0 and tune Kp until system responds with acceptable speed but without sustained oscillation; then increase Ki slowly.
- If oscillations appear, increase Kd or reduce Kp.
- If integral term builds while saturated, implement anti-windup. Verify by observing I term during saturation.
- Use the outer-loop altitude->velocity feedforward to avoid relying solely on integral action for large deceleration demands.
- For discrete fuel units, consider a final smoothing filter on thrustUnits to avoid rapid on/off toggling.

Digest (source excerpt and retrieval)
- Source: Control Tutorials for MATLAB and Simulink (CTMS) - PID controller section
- Retrieved: 2026-03-22
- Bytes downloaded during crawl: 4894 bytes
- Extracted content condensed to the implementation-level instructions above.

Attribution
- Original page: http://ctms.engin.umich.edu/CTMS/index.php?example=SimpleController&section=ControlPID
- License and copyright: refer to source page.
