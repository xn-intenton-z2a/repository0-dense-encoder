# BIT_DISTANCE

Summary

Compute the bit-level Hamming distance between two non-negative integers by counting differing bits. This feature defines the public API, validation rules, and unit-test behaviours required by the mission.

Behaviour

- Export a named function hammingBits(x, y) from src/lib/main.js (or the library entry point).
- Accept only non-negative integers; if a parameter is not a number or not an integer, throw TypeError.
- If a parameter is negative, throw RangeError.
- Compute the number of differing bits between x and y (XOR then popcount).
- Support large integers within JavaScript safe integer limits; include test cases that cover zero and small/large values.

API

- hammingBits(x: number, y: number) -> number
  - Throws TypeError for non-number or non-integer arguments.
  - Throws RangeError for negative integers.

Acceptance criteria

- Bit-level Hamming distance between 1 and 4 is 2 (001 vs 100).
- Bit-level Hamming distance between 0 and 0 is 0.
- Invalid types produce TypeError and negative integers produce RangeError.

Tests

- Unit tests should call bitHamming with representative values including 0, 1, 4, large safe integers, and invalid inputs.
- Include edge-case tests (zero, identical numbers, maximum safe integer comparisons where reasonable).

Notes

- Use x ^ y and a fast popcount (e.g., Kernighan loop or Number.prototype.toString(2) fallback) to compute differing bits.
- Keep implementation in src/lib/main.js and expose as a named export so tests can import directly.