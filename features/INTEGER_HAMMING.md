INTEGER_HAMMING

# Purpose

Specify the library feature for computing bit-level Hamming distance between two non-negative integers and validating inputs.

# Description

Provide a named export integerHamming(x, y) in src/lib/main.js that:

- Accepts two arguments x and y.
- Throws TypeError if either argument is not a number or not an integer.
- Throws RangeError if either integer is negative.
- Computes the number of differing bits between the two values (count of 1 bits in x XOR y).
- Returns a non-negative integer representing differing bit count.

# API

- Export name: integerHamming
- Signature: integerHamming(x: number, y: number) -> number
- Errors: TypeError for non-integer or non-number, RangeError for negative integers

# Acceptance criteria

- Bit-level Hamming distance between 1 and 4 is 2 (001 vs 100)
- Bit-level Hamming distance between 0 and 0 is 0
- Passing negative integers throws RangeError
- Passing non-integer or non-number arguments throws TypeError
- Large integers (within JS safe integer range) are supported and return correct counts

# Test suggestions

- tests/unit/integer-hamming.test.js covering normal cases, zero, large integers, negative inputs, and TypeError cases.

# Notes

- Use x ^ y then count set bits using an efficient built-in-friendly approach (e.g., Brian Kernighan loop) and validate Number.isInteger and bounds.
- Ensure behaviour is defined for inputs up to Number.MAX_SAFE_INTEGER; document limitations in README if needed.
