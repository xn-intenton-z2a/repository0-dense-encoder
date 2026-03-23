# TEST_COVERAGE

# Summary
Increase unit test coverage and add focused tests to make maintenance safe and regression-resistant.

# Scope
Add unit tests covering:
- step function physics (gravity and thrust updates)
- simulate function producing a complete trace
- autopilot safety for default initial conditions
- autopilot safety across at least 10 different (altitude, velocity, fuel) combinations including edge cases
- scoreLanding correctness for crashes and safe landings
- edge cases: zero fuel, already landed, and thrust clamping

# Acceptance Criteria
- Automated tests added to tests/unit/ verifying each bullet above
- Running npm test passes and reports line coverage >= 80%
- Tests assert exact state shape and immutability of state objects
- Tests cover simulated terminal states (landed and crashed) and verify scoring formula
- Tests are deterministic and runnable on Node.js >= 24 as per engines field