ZIEGLER_NICHOLS_METHOD

Normalised extract (key technical points)

Table of contents
1. Purpose and scope of the Ziegler–Nichols (Ku, Tu) method
2. Measuring Ku (ultimate gain) and Tu (oscillation period)
3. Tuning formulas for P, PI, PID controllers
4. Converting Kc, Ti, Td to discrete Ki and Kd for dt=1
5. Step-by-step tuning procedure for simulation
6. Practical caveats for discrete actuators and fuel-limited systems

1. Purpose and scope
- Ziegler–Nichols ultimate gain method produces initial PID tuning values using the closed-loop sustained oscillation point. It is a heuristic that gives aggressive settings suitable for many control problems as initial values for refinement.

2. Measuring Ku and Tu (procedure)
- Set integral (Ki) = 0 and derivative (Kd) = 0.
- Increase proportional gain Kp from a low value until the system exhibits sustained, constant-amplitude oscillations.
- The gain at which sustained oscillation occurs is Ku (ultimate gain).
- Measure the oscillation period (time between peaks) as Tu.
- Notes for discrete simulation: use simulation ticks as time units; Tu will be measured in ticks.

3. Tuning formulas (Ku, Tu -> controller parameters)
Using Ku and Tu measured as above, compute controller parameters as follows (classical Ziegler–Nichols):
- P controller:
  Kc = 0.5 * Ku
  Ki = 0
  Kd = 0
- PI controller:
  Kc = 0.45 * Ku
  Ti = Tu / 1.2
  Ki = Kc / Ti   (equivalently Ki = 1.2 * Kc / Tu)
  Kd = 0
- PID controller (classic tuning):
  Kc = 0.6 * Ku
  Ti = Tu / 2
  Td = Tu / 8
  Ki = Kc / Ti   (equivalently Ki = 2 * Kc / Tu)
  Kd = Kc * Td  (note: derivative gain in parallel form)

4. Converting to discrete (dt = 1 tick)
- With dt = 1, discrete Ki and Kd used in the PID update (output = Kp*e + Ki*I + Kd*D) are computed directly as:
  Ki_discrete = Ki (as computed above)  => Ki_discrete = Kc / Ti
  Kd_discrete = Kd (as computed above)  => Kd_discrete = Kc * Td
- Example: if Kc = 6, Tu = 10 ticks, then for PID: Kc = 0.6*Ku (compute Ku first), Ti = 5, Td = 1.25, Ki = Kc/Ti, Kd = Kc*Td.
- Because dt=1, no additional scaling by dt is required when applying formulas above.

5. Step-by-step tuning procedure for the lunar-lander simulation
1. Implement a velocity-control loop (inner loop). Setpoint is desired vertical velocity.
2. With Ki = 0 and Kd = 0, run multiple trials increasing Kp until the inner-loop exhibits sustained oscillation. Record Ku and Tu.
3. Apply Ziegler–Nichols formulas to compute Kc, Ti, Td and derive Ki and Kd.
4. Test resulting gains in the full simulation (altitude+velocity). Observe landing behaviour. Expect aggressive response and adjust gains downward if excessive overshoot or fuel consumption occurs.
5. If actuator is quantized (integer fuel units), reduce Kp or add derivative damping to avoid limit cycling.

6. Practical caveats and modifications
- Ziegler–Nichols yields aggressive gains; for systems with limited actuator resolution (integer fuel units) or strict fuel limits, scale Kc down (e.g., 50-70% of suggested) and re-tune Ki/Kd manually.
- For non-linear systems or when outer-loop altitude shaping is present, use Ziegler–Nichols results only as initial guesses and prefer empirical tuning or model-based methods.
- When system safety is critical (landing), prioritise conservative gains to ensure stability and gradual approach rather than minimal settling time.

Supplementary details
- Measuring Ku robustly: use averaged trials and ensure the oscillation is sustained (not decaying) for at least several periods.
- Use anti-windup (see CTMS_PID document) when applying integral action in a fuel-limited environment.

Digest (source excerpt and retrieval)
- Source: Ziegler–Nichols method (Wikipedia)
- Retrieved: 2026-03-22
- Bytes downloaded during crawl: 121576 bytes
- Extracted the method steps, Ku/Tu definitions, and canonical tuning formulas for P, PI, PID.

Attribution
- Original page: https://en.wikipedia.org/wiki/Ziegler%E2%80%93Nichols_method
- License: refer to source page (Wikipedia content is CC BY-SA).
