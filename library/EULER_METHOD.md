EULER_METHOD

Table of contents
- Purpose in simulation
- Forward Euler discrete integration steps
- Error characteristics and stability
- Implementation notes for 1D lander
- Supplementary and reference details

Purpose in simulation
- Use Forward Euler to integrate velocity and altitude over discrete ticks when using continuous forces.
- For this mission the per-tick velocity update is explicit (velocity += gravity - thrustEffect) and altitude is updated using new velocity.

Forward Euler discrete integration steps
- Given state variables at tick t: altitude_t, velocity_t
- velocity_{t+1} = velocity_t + a*dt where dt=1 tick and a is net acceleration (gravity - thrustAcceleration)
- altitude_{t+1} = altitude_t - velocity_{t+1}

Error characteristics and stability
- Euler is first-order accurate (O(dt)). For dt=1 ticks, errors are coarse but acceptable for the simplified discrete model.
- For stiff or high-precision needs, use smaller dt or higher-order integrators; here the mission defines gravity and thrust as per-tick discrete updates so Euler is the appropriate match.

Implementation notes for 1D lander
- Use dt=1; treat gravityFixed=2 m/s per tick as acceleration contribution.
- Thrust is modelled as an immediate change in velocity: v_new = v_old + gravity - thrustUnit*4
- Perform fuel consumption before applying thrust to ensure clamps are correct.

Reference details
- Euler method summary and formulae from: https://en.wikipedia.org/wiki/Euler_method

Crawl digest
- Retrieved Euler method page on 2026-03-23; extracted discrete-time formulas and matched with mission tick semantics. Crawl size: ~120KB HTML.

Attribution
- Source: Wikipedia — Euler method
