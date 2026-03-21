# HAMMING_BITS

Overview

Add a function hammingBits that computes the Hamming distance between two non-negative integers by counting differing bits.

Behavior

- Accepts non-negative integer inputs of type number or bigint.
- If an argument is not an integer type the function throws TypeError.
- If an argument is negative the function throws RangeError.
- Compute XOR of the two inputs and count set bits in the result; return a non-negative integer.

API

- Export a named function hammingBits from src/lib/main.js.

Acceptance Criteria

- hammingBits(1, 4) returns 2.
- hammingBits(0, 0) returns 0.
- Negative integers cause RangeError.
- Non-integer values cause TypeError.
- BigInt inputs are supported and produce correct results for large values.

Notes for implementer

- For numbers ensure integerness via Number.isInteger; accept BigInt where larger ranges are required.
- Use an efficient popcount algorithm for number and bigint variants.