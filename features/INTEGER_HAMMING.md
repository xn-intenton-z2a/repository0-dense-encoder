# INTEGER_HAMMING

Summary

Provide a library feature that computes bit-level Hamming distance between two non-negative integers by counting differing bits. This is a named export in src/lib/main.js and must be covered by unit tests for normal, edge and error cases.

Behavior

- Export a function named hammingInt(x, y) that returns the number of differing bits between two non-negative integers.
- Validate inputs: if either argument is not a non-negative integer, throw TypeError for wrong type and RangeError for negative values.
- Support large integers within JavaScript safe integer bounds; treat 0 as valid.

API

- Named export: hammingInt(x: number, y: number) -> number

Acceptance Criteria

- hammingInt(1, 4) === 2
- hammingInt(0, 0) === 0
- hammingInt(-1, 0) throws RangeError
- hammingInt called with a non-integer argument throws TypeError
- Implementation is testable in tests/unit/main.test.js and documented in README.md
