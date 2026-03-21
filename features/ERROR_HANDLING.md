# ERROR_HANDLING

## Summary
Define and document the input validation and error semantics for both library functions so behaviour is explicit and testable.

## Motivation
Clear error semantics reduce ambiguity for callers and make unit tests deterministic; they also satisfy mission acceptance criteria for edge cases.

## Implementation
- Inputs must be numbers. Where an integer is required, the value must be an integer.
- For fizzBuzz(n):
  - If n is 0, return an empty array.
  - If n is a negative number, throw RangeError.
  - If n is not an integer, throw TypeError.
- For fizzBuzzSingle(n):
  - If n is a negative number, throw RangeError.
  - If n is not an integer, throw TypeError.
- Document these rules in README.md and cover them with unit tests.

## Acceptance Criteria
- Passing a negative integer to either function throws a RangeError.
- Passing a non-integer numeric value to either function throws a TypeError.
- Passing 0 into fizzBuzz returns an empty array rather than throwing an exception.
- The README documents the validation rules and expected exception types.