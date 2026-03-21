# EDGE_CASES

Summary
Define and enforce input validation and boundary behaviours for both fizzBuzz and fizzBuzzSingle.

Scope
- Validate inputs using Number.isInteger and clear, conventional error types.
- n = 0 returns [] for fizzBuzz.
- Negative integers throw RangeError.
- Non-integer numeric values throw TypeError.

Acceptance Criteria
- fizzBuzz(0) returns an empty array [].
- fizzBuzzSingle(-1) throws RangeError.
- fizzBuzzSingle(2.5) throws TypeError.
- fizzBuzz(-3) throws RangeError.
- The README documents the error types and boundary behaviours.
