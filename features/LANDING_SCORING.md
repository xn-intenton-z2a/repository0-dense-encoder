# LANDING_SCORING

Purpose

Define a scoring function that evaluates a landing trace according to the mission formula.

Description

Provide a named export score(trace, initialState) that computes a numeric score for a completed run. Scoring rules:

- If the final state is a crash, score must be 0.
- Otherwise score equals remainingFuel * 10 plus touchdown bonus: Math.max(0, (4 - landingVelocity) * 25).

Notes

- remainingFuel is the fuel value in the final state (or initialFuel - fuelUsed equivalently).
- landingVelocity is the absolute value of the final state's velocity.

Acceptance criteria

- [ ] score returns 0 for traces ending with crashed true.
- [ ] score returns a positive integer value for safe landings and follows the specified arithmetic.
- [ ] Unit tests cover scoring for at least two safe landings and one crash and assert exact numeric results.
