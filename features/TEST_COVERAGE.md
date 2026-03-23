# TEST_COVERAGE

Summary
Increase and stabilise unit test coverage to make maintenance safe; add focused tests for boundary conditions and document coverage targets for contributors.

Scope
- Add unit tests for boundary and edge cases not yet exhaustively covered (large velocities, fuel-starvation scenarios, floating-point edge cases)
- Document coverage targets: line >= 80%, branch >= 30% and instruct how to measure locally with Vitest
- Optionally add a CI coverage check (documented as a follow-up change) that fails when thresholds are not met

Acceptance Criteria
- New tests are added to tests/unit/ covering additional boundary cases and run successfully with npm test
- Documentation in README or CONTRIBUTING.md explains how to run coverage locally and states the target thresholds
- A follow-up CI plan to enforce coverage is described in the feature doc (implementation may be done in a subsequent change)
