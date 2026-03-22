# LANDING_SCORING

Purpose

Define a scoring function to evaluate the quality of a landing trace according to the mission formula.

Description

Implement a function scoreLanding(initialState, finalState, trace) or score(trace) that computes a numeric score for the run. The scoring rules are:

- If the final state is a crash, score must be zero.
- Otherwise score equals (initialFuel - fuelUsed) times 10 plus a touchdown velocity bonus computed as the maximum of zero and (4 minus landingVelocity) multiplied by 25.

Notes

- initialFuel is the fuel value from the initial state passed to simulate. fuelUsed is initialFuel minus finalState.fuel.
- landingVelocity is the downward velocity at the final state. If the final state is landed, landingVelocity must be used in the formula.

Acceptance criteria

- [ ] scoreLanding returns 0 for traces ending in crashed true.
- [ ] scoreLanding returns a positive integer for safe landings and follows the specified arithmetic.
- [ ] Unit tests cover the scoring behavior for at least two safe landings and one crash.
