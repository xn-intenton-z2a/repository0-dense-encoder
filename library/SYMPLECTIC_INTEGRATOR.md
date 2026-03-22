SYMPLECTIC INTEGRATOR

NORMALISED EXTRACT:
Table of contents:
- Definition and motivation
- Semi-implicit (symplectic) Euler method (algorithm and mapping to simulator)
- Stability and energy behaviour compared to explicit Euler
- Implementation-relevant formulas and per-tick code pattern

Definition and motivation:
- Symplectic integrators are numerical integration methods that preserve geometric properties of Hamiltonian systems (energy/phase volume) better than plain explicit Euler for certain problems.
- For simple 1D gravity/thrust systems the semi-implicit Euler (also called symplectic Euler) updates velocity first using acceleration and then updates position using the new velocity; this reduces artificial energy growth and produces more stable behaviour for long-running simulations.

Semi-implicit Euler method (algorithm and mapping to simulator):
- Continuous ODEs: dv/dt = a(t, x, v), dx/dt = v
- Semi-implicit Euler discrete step (dt = 1 in simulator):
  1. v' = v + a * dt     // update velocity using acceleration at start of tick
  2. x' = x + v' * dt    // update position using updated velocity
- Mapping to project's sign conventions and step:
  a = gravityPerTick - thrustPerFuel * thrustUnits
  v' = velocity + a
  altitude' = altitude - v'   // simulator uses downward-positive velocity; subtract v' to reduce altitude
- This is exactly the project's STEP_PHYSICS update order and therefore already semi-implicit Euler.

Stability and energy behaviour:
- Compared to explicit Euler (x' = x + v * dt; v' = v + a * dt), semi-implicit Euler couples velocity into the position update using the newer velocity which tends to bound energy growth for gravity-like systems.
- For the lander simulator with dt = 1, semi-implicit Euler prevents certain numerical instabilities and is preferred where simple per-tick updates are acceptable.

Implementation-relevant formulas and patterns:
- Use semi-implicit Euler when mapping continuous formulas to discrete tick updates to match STEP_PHYSICS:
  v_next = v_current + gravityPerTick - thrustPerFuel * thrustUnits
  altitude_next = altitude_current - v_next
- For finer fidelity reduce dt and scale gravityPerTick and thrustPerFuel proportionally.
- When writing controller forward-simulators, ensure the same update order; otherwise predicted ignition timings will be inconsistent.

DETAILED DIGEST:
Source: https://en.wikipedia.org/wiki/Symplectic_integrator — retrieved 2026-03-22 — approx bytes downloaded: 332186 (~324.4 KB)
This extract documents semi-implicit Euler (symplectic Euler) and ties it directly to the project's step function, explaining why the chosen update order is numerically preferable and how to map continuous accelerations to per-tick updates.

ATTRIBUTION:
Extracted and condensed from Wikipedia 'Symplectic integrator' (CC BY-SA) and adapted to the project's per-tick simulator semantics.
