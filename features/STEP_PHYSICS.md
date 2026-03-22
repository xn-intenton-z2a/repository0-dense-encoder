# STEP_PHYSICS

Purpose

Specify the single-tick physics step that advances the lander state by one tick applying thrust and gravity.

Description

Implement a pure function step(currentState, thrustUnits) that returns a new state object representing the simulator after one tick. The function must:

- Clamp thrustUnits to an integer between 0 and currentState.fuel inclusive. Non-integer or negative inputs should be handled deterministically (round or floor then clamp) rather than throwing.
- Apply thrust effect: each unit of thrust reduces downward velocity by 4 meters per second.
- Apply gravity effect: add 2 meters per second to downward velocity each tick.
- Update fuel by subtracting the applied thrust units.
- Compute new altitude by subtracting the resulting velocity from the previous altitude. Altitude must never become negative in the returned state; when altitude would fall to or below zero, final altitude must be set to zero and the landed flag computed.
- Determine landed and crashed flags when altitude reaches zero: landed is true when final altitude is zero and landing velocity is less than or equal to 4 m/s, crashed is true when landing velocity is greater than 4 m/s. When landed or crashed, the returned state should reflect the final tick and velocity at touchdown.
- Increment tick by one.
- Return a new plain object (do not mutate input state).

Order of operations

The step implementation should first compute the applied thrust (clamped), then apply thrust and gravity to compute the new velocity, then update altitude, fuel and flags, and finally increment tick.

Acceptance criteria

- [ ] step reduces fuel by the applied thrust and respects the available fuel.
- [ ] step decreases velocity by thrust effect, then increases it by gravity, producing the expected net change.
- [ ] step updates altitude consistent with the computed velocity and clamps altitude to zero on touchdown.
- [ ] step sets landed true and crashed false for touchdown velocity less or equal to 4, and crashed true when touchdown velocity greater than 4.
- [ ] step returns a new object and does not mutate the input state.
- [ ] Tests demonstrate behavior for zero fuel, exact-fuel, fractional thrust input, and touchdown cases.
