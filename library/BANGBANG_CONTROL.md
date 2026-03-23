BANGBANG_CONTROL

Table of Contents
1. Definition and use-cases
2. Mathematical kernel (switching law)
3. Implementation recipe for discrete lander
4. Hysteresis and anti-chatter measures
5. Reference function signatures
6. Digest and attribution

Normalised extract (direct technical items)
- A bang–bang controller is a feedback controller that switches abruptly between two states (on/off or two extrema). It commonly appears as an optimal solution in minimum-time problems where the control is bounded.
- Practical systems require hysteresis to avoid chattering and to limit mechanical/electrical wear.

Detailed information for items above
- Switching law: for a bounded-control system the optimal control often takes values at extremes; the controller decision is based on the sign of a switching function (often derived from Pontryagin's principle). In practice, use a computed required-deceleration or stopping-condition to decide ON vs OFF.

Discrete implementation recipe for lunar lander (actionable)
- Constants (mission): gravity_per_tick = 2 (m/s/tick), dv_per_fuel = 4 (m/s per fuel unit), safe_v = 4 (m/s).
- At each tick compute an estimate of required deceleration to stop before reaching the surface:
  - if altitude <= 0 then return 0 (already landed or terminal)
  - stopping_decel = (velocity * velocity) / (2 * altitude)  (kinematic stopping acceleration in m/s^2)
  - required_delta_v = max(0, stopping_decel + gravity_per_tick)
  - required_units = ceil(required_delta_v / dv_per_fuel)
  - thrustUnits = min(required_units, fuel)
- Example: when required_units == 0 => do not fire; when required_units > 0 => fire that many units (clamped).
- Rationale: stopping_decel approximates the constant deceleration needed so that v^2 = 2 * a * s; adding gravity_per_tick accounts for the per-tick gravity increment that must be countered.

Hysteresis and anti-chatter
- Add a margin: required_units_with_margin = max(0, required_units - marginUnits) where marginUnits = 1 (or fractional margin) to avoid toggling. Alternatively, hold previous thrust for one tick if change would be small.
- Introduce a minimum dwell: once thrust > 0, continue for at least N ticks unless a larger required thrust is computed.

Reference details (signatures)
- computeRequiredThrust(state, constants) -> integer
  - params: state: {altitude, velocity, fuel}, constants: {gravity_per_tick, dv_per_fuel}
  - returns: integer thrustUnits (0..fuel)
- bangbangController(state) -> integer
  - implements recipe above and should be deterministic and stateless except optionally for hysteresis state (previous thrust/dwell counter).

Digest (extracted and retrieval)
- Extract (Wikipedia "Bang–bang control"): "A bang–bang controller... switches abruptly between two states... often used in minimum-time problems; practical implications include oscillating error signal and wear from frequent switching." (retrieved 2026-03-22)
- Retrieved bytes: 4838 bytes

Attribution
- Source: https://en.wikipedia.org/wiki/Bang%E2%80%93bang_control
- Retrieval date: 2026-03-22
- Retrieved content size: 4838 bytes
