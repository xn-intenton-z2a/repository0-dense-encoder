DISCRETE_TIME_CONTROL

NORMALISED EXTRACT:
Table of contents:
- Discrete per-tick update equations (exact implementation)
- Order of operations and rounding rules
- Stability and discretisation notes

Discrete per-tick update equations (exact, from src/lib/main.js):
- Inputs: state = { altitude, velocity, fuel, tick, landed, crashed } and integer burnUnits requested.
- Burn clamping: burn = max(0, min(floor(requested), state.fuel)).
- Fuel update: fuel' = state.fuel - burn.
- Velocity update: velocity' = state.velocity + 2 - 4 * burn.
  (Gravity contributes +2 m/s per tick; each fuel unit burned reduces velocity by 4 m/s.)
- Altitude update: altitude' = state.altitude - velocity'.
- Landing check: if altitude' <= 0 then altitude' = 0, landed = true, crashed = abs(velocity') > 4.
- Tick increment: tick' = state.tick + 1.

Order of operations and exact semantics (critical for reproducing behaviour):
1. Compute integer burn from controller output, clamped to available fuel.
2. Subtract burn from fuel to get new fuel value for the next state.
3. Apply gravity and thrust to compute the NEXT velocity: v_next = v_current + 2 - 4*burn.
4. Subtract v_next from altitude to obtain next altitude: h_next = h_current - v_next.
5. If h_next <= 0, set h_next to 0 and mark landed. Crash is determined solely by |v_next| > 4 at touchdown.
6. Return new immutable state object with altitude, velocity, fuel, tick+1, landed, crashed.

Stability and discretisation notes for implementers:
- The model is explicit Euler-like: velocity is updated using per-tick impulse then altitude is decremented by the updated velocity.
- Because thrust reduces velocity by a fixed amount per fuel unit (discrete jump), controller design must consider integer granularity and one-tick reaction time.
- Use margins in ignition logic to account for discrete step between ticks (1–2 meters recommended).

REFERENCE DETAILS (API signatures and exact behavior):
- createState({ altitude = 1000, velocity = 40, fuel = 25 }) -> { altitude, velocity, fuel, tick:0, landed, crashed }
- step(state, burnUnits = 0) -> nextState as defined above; throws if state not object; returns a shallow copy if state.landed || state.crashed (no-op).
- simulate(initialState, controller) -> trace array of states; controller(state) => integer burnUnits called each tick until landing/crash or MAX_TICKS reached.

DETAILED DIGEST:
Source: simulator implementation and Wikipedia discrete-time control references; the exact step equations were taken from src/lib/main.js (repository code) and verified against discrete-control references.
Source page (discrete control reference): https://en.wikipedia.org/wiki/Discrete-time_control_system — retrieved 2026-03-22 — bytes downloaded: 53342

ATTRIBUTION:
Primary implementation reference: src/lib/main.js in repository. Supplemental background from Wikipedia 'Discrete-time control system' (CC BY-SA).