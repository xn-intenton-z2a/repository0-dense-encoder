# README_EXAMPLES

Summary
Document usage examples for library and CLI and explicitly document edge-case behaviours.

Contents
- How to import: import { fizzBuzz, fizzBuzzSingle } from './src/lib/main.js' (ES module) and short examples.
- Examples:
  - fizzBuzzSingle(3) -> 'Fizz'
  - fizzBuzz(15) -> array ending with 'FizzBuzz'
  - CLI: node src/lib/main.js 15 prints one-per-line output
- Error handling: describe that non-integers throw TypeError and negatives throw RangeError; show example assertions.

Acceptance Criteria
- README.md is updated with the above examples and error-handling notes so users can copy-paste them into node >=24 and reproduce results.
