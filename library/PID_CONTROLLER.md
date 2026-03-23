PID_CONTROLLER

Table of contents
- PID components and discrete implementation
- Tuning methods (Ziegler–Nichols brief)
- Use cases and limitations for lander
- Implementation details and sample signatures
- Supplementary and reference details

PID components and discrete implementation
- PID output = Kp*e + Ki*sum(e)*dt + Kd*(e - e_prev)/dt where e = setpoint - measurement.
- For discrete ticks dt=1: output = Kp*e + Ki*sum_e + Kd*(e - e_prev)
- Use controller to produce thrustUnitsRequested; map continuous PID output to integer thrust by rounding and clamping.

Tuning methods
- Ziegler–Nichols provides heuristic gains based on observed oscillation period and gain; not guaranteed for this mission but useful starting point. See: https://en.wikipedia.org/wiki/Ziegler%E2%80%93Nichols_method

Use cases and limitations for lander
- PID can smooth control and reduce oscillation vs bang-bang. However with integer-limited thrust and coarse per-tick impulses, PID may need anti-windup and output quantization handling.

Implementation details and sample signatures
- controllerPID factory: createPID({Kp, Ki, Kd, setpoint}) => function(state) => thrustUnits
- Discrete internal state: integralSum, prevError
- Anti-windup: clamp integralSum when actuator saturates

Reference details
- Source: https://en.wikipedia.org/wiki/PID_controller and Ziegler–Nichols tuning page

Crawl digest
- Retrieved 2026-03-23; extracted discrete PID formulas and tuning heuristics. Crawl size: ~410KB total across pages.

Attribution
- Wikipedia: PID controller; Ziegler–Nichols method
