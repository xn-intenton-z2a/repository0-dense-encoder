# UNIT_TESTS

## Summary
Add a comprehensive suite of unit tests that validate correct operation and all edge cases required by the mission.

## Motivation
Unit tests are the ground truth for acceptance criteria and provide regression protection as the library evolves.

## Implementation
- Create tests in tests/unit/main.test.js that import the named exports from src/lib/main.js.
- Test cases to include:
  - fizzBuzz(15) returns the correct 15-element array ending with FizzBuzz.
  - fizzBuzzSingle(3) returns Fizz, fizzBuzzSingle(5) returns Buzz, fizzBuzzSingle(15) returns FizzBuzz, fizzBuzzSingle(7) returns 7.
  - fizzBuzz(0) returns an empty array.
  - Negative inputs to either function throw RangeError.
  - Non-integer numeric inputs to either function throw TypeError.
  - Exports exist and are callable.
- Use Vitest as the test runner; keep tests fast and deterministic.

## Acceptance Criteria
- All unit tests pass when running npm test.
- Tests assert the exact string outputs and the correct exception types for invalid inputs.