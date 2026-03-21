Title: WIKIPEDIA_POPCOUNT (Population count)

Table of Contents:
- Definition
- Common algorithms (software)
- Bitwise popcount implementations and complexity
- Use in Hamming distance for integers

Definition:
Population count (popcount) of a non-negative integer is the number of 1-bits in its binary representation.

Common algorithms:
- Naive loop: repeatedly test lowest bit and shift right; O(k) where k = number of bits.
- Parallel algorithms (Hacker's Delight style) using masking and multiplication reduce operations per word (e.g., SWAR) to O(1) word operations for fixed machine width.
- CPU instruction: many architectures provide POPCNT instruction returning popcount for a machine word in one cycle.

Bitwise Hamming distance between two non-negative integers x and y:
- Compute xor = x ^ y; the Hamming distance is popcount(xor).
- Input validation: accept only integers >= 0; throw TypeError for non-number or non-integer values; RangeError for negative integers.

Reference details (API patterns):
- function hammingInt(x, y)
  - Parameters: x: non-negative integer, y: non-negative integer
  - Throws: TypeError for non-integer or non-number types; RangeError for negative integers
  - Returns: integer equal to number of differing bits
- Example: hammingInt(1,4) -> 2 because 1 (001) xor 4 (100) = 101 which has popcount 2

Implementation notes:
- For arbitrary-size integers (BigInt), apply same xor + popcount approach but use BigInt-aware bit operations or convert to binary strings and count '1' characters (less efficient).
- For JS Number (IEEE 754 double), safe integer range must be enforced (Number.isSafeInteger) or use BigInt for large integer inputs.

Digest:
- Source: https://en.wikipedia.org/wiki/Population_count
- Retrieved: 2026-03-21

Attribution:
- Content derived from Wikipedia: Population count