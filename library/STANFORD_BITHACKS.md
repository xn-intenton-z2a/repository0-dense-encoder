STANFORD_BITHACKS

TABLE OF CONTENTS
- Purpose: bit-level utilities
- Kernighan's popcount algorithm (detailed)
- Other popcount methods (fixed-width SWAR, lookup tables)
- Trade-offs and performance notes

NORMALISED EXTRACT
Purpose
- The Bit Twiddling Hacks collection enumerates compact and efficient bit-manipulation algorithms; it is a practical reference for fast popcount implementations and other bit-level utilities.

Kernighan's popcount algorithm (detailed)
- Algorithm: repeatedly clear the lowest set bit until number becomes zero; count iterations.
- Pseudocode (integer):
  - count = 0
  - while n != 0:
      n = n & (n - 1)
      count += 1
  - return count
- BigInt adaptation: use bigint arithmetic and compare to 0n; the loop variable and constants must be BigInt (e.g., 1n).

Other methods
- SWAR (SIMD Within A Register) methods use masks and shifts to compute popcount for fixed-width integers in O(1) arithmetic operations (constant time for word size), suitable for 32/64-bit words.
- Table lookup methods split the word into bytes and add precomputed counts for each byte (useful when counting many numbers and memory is available for a table of size 256).

Trade-offs
- Kernighan: iteration count equals number of set bits; best when numbers are sparse.
- SWAR / table-based: predictable time per word regardless of set bits; better for dense or fixed-width workloads.

REFERENCE DETAILS
- Use Kernighan for simplicity and correctness on BigInt; use SWAR/table when working with 32/64-bit fixed-width numbers in performance-sensitive contexts.

DIGEST
- Source URL: https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan
- Retrieved: 2026-03-21T23:22:22.035Z
- Data size fetched: 101072 bytes

ATTRIBUTION
Condensed from Sean Eron Anderson's Bit Twiddling Hacks (public domain snippets where indicated); used for concrete popcount algorithms and decision guidance.
