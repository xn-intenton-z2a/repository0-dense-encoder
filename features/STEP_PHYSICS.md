# STEP_PHYSICS

Purpose

Specify the single-tick physics step that advances the lander state by one tick applying thrust and gravity.

Description

Provide a pure function step(currentState, thrustUnits) that returns a new state object after one tick. Requirements:

- Clamp thrustUnits to an integer between 0 and currentState.fuel inclusive; handle non-integer/negative inputs deterministically (floor then clamp).
- Thrust effect: each unit reduces downward velocity by 4 m/s.
- Gravity effect: adds 2 m/s to downward velocity each tick.
- Update fuel by subtracting applied thrust units.
- Compute new altitude by subtracting the resulting velocity from the previous altitude. If altitude would fall to or below zero, set altitude to zero and compute landed/crashed flags using the touchdown velocity.
- Determine landed true when touchdown velocity ≤ 4 m/s; crashed true when touchdown velocity > 4 m/s.
- Increment tick by one.
- Return a new plain object and do not mutate the input.

Acceptance criteria

- [ ] step reduces fuel by the applied thrust and respects available fuel limits.
- [ ] step adjusts velocity by thrust and gravity producing the expected net change.
- [ ] step updates altitude consistent with velocity and clamps to zero on touchdown.
- [ ] step sets landed true and crashed false for touchdown velocity ≤ 4, and crashed true otherwise.
- [ ] step returns a new object and does not mutate the input state.
- [ ] Tests exercise zero fuel, exact-fuel, fractional thrust input and touchdown cases.
