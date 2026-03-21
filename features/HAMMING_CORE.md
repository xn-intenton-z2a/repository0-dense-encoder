# HAMMING_CORE

Summary

Provide the primary library feature that computes Hamming distance for strings and non-negative integers and exposes a clear, testable API that implements the mission's required capabilities.

Goals

- Export named functions from src/lib/main.js: hammingString and hammingBits.
- hammingString(a, b): accepts two strings, compares Unicode code points and returns the Hamming distance (number of differing code points).
- hammingBits(a, b): accepts two non-negative integers and returns the bitwise Hamming distance (count of differing bits).
- Throw TypeError for incorrect argument types and RangeError for unequal-length strings or negative integers.

Behaviour and API

1) hammingString(a, b)
- Arguments: two values expected to be strings.
- Validation: if either argument is not a string, throw TypeError.
- Validation: if strings have different code-point lengths, throw RangeError.
- Implementation: iterate code points (not UTF-16 code units) and count positions where code points differ.
- Return: integer >= 0.

2) hammingBits(a, b)
- Arguments: two values expected to be integers >= 0.
- Validation: if either argument is not a finite integer or is negative, throw TypeError for non-integers and RangeError for negatives.
- Implementation: compute XOR and use a population-count (popcount) approach to count set bits.
- Return: integer >= 0.

Edge cases

- Empty strings: should be allowed and return 0 when both are empty.
- Zero and large integers: support numbers representable as safe integers in JavaScript; for very large integers, prefer BigInt support if implementation chooses to use BigInt.

Acceptance criteria

- Hamming distance between "karolin" and "kathrin" is 3.
- Hamming distance between "" and "" is 0.
- hammingString throws RangeError for strings of unequal lengths (by code points).
- Bit-level Hamming distance between 1 and 4 is 2.
- Bit-level Hamming distance between 0 and 0 is 0.

Notes for implementers

- Use Array.from(str) or spread over [...str] to iterate code points safely.
- Use Number.isInteger for integer checks; if using BigInt, document expected input types in README and tests.
- Export both functions as named exports from src/lib/main.js to satisfy mission requirement.
