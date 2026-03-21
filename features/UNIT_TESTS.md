# UNIT_TESTS

Summary
Add comprehensive unit tests in tests/unit/main.test.js to cover normal operation, edge cases, and all mission acceptance criteria.

Test cases to implement
- fizzBuzz(15) returns the exact array:
  ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz'] (length 15).
- fizzBuzzSingle(3) -> 'Fizz'
- fizzBuzzSingle(5) -> 'Buzz'
- fizzBuzzSingle(15) -> 'FizzBuzz'
- fizzBuzzSingle(7) -> '7'
- fizzBuzz(0) -> []
- TypeError tests for non-integers (e.g., 2.5) for both functions.
- RangeError tests for negative integers for both functions.

Acceptance Criteria
- tests/unit/main.test.js contains the listed tests with clear assertions.
- The test suite can be run with npm test and asserts the specified outputs and thrown errors.
