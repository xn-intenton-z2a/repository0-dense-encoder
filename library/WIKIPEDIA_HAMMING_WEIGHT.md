WIKIPEDIA_HAMMING_WEIGHT

TABLE OF CONTENTS
- Definition
- Relation to Hamming distance
- Efficient algorithms for population count (popcount)
- Kernighan's algorithm (detailed)
- Implementation notes for Number and BigInt

NORMALISED EXTRACT
Definition
- Hamming weight: the number of symbols equal to 1 in a binary string; equivalently, the number of set bits in the binary representation of an integer.

Relation to Hamming distance
- For integer Hamming distance between a and b compute r = a XOR b; the Hamming distance equals the Hamming weight (popcount) of r.

EFFICIENT ALGORITHMS
Kernighan's algorithm (population count by clearing lowest set bit each iteration)
- Outline (integer variant):
  - count = 0
  - while n != 0:
      n = n & (n - 1)
      count += 1
  - return count
- Complexity: number of iterations equals the number of set bits in n; best when n has few set bits.

BigInt variant (use when working with arbitrarily large integers):
- count = 0n
- while n != 0n:
    n &= (n - 1n)
    count += 1n
- return Number(count) // or count as BigInt if caller expects BigInt

Alternate approaches
- Table lookup: split into 8/16/32-bit blocks and use a precomputed table to sum bytes; time O(words).
- SWAR/parallel bit arithmetic methods exist for fixed-width integers; they require masking and shifts and are efficient for 32/64-bit words.

IMPLEMENTATION NOTES
- For JavaScript Number type, built-in bitwise operators operate on signed 32-bit integers; using them truncates values to 32 bits. For values potentially larger than 2^32-1, use BigInt.
- When using BigInt, apply Kernighan's algorithm with BigInt arithmetic to count bits safely for arbitrarily large integers.

REFERENCE DETAILS (API patterns)
- popcountNumber(n: number): number
  - Precondition: Number.isInteger(n) and n >= 0 and n <= 0x7FFFFFFF (or treat as unsigned 32-bit by n >>> 0)
  - Convert to unsigned 32-bit: u = n >>> 0
  - Use Kernighan loop or table lookups to count bits

- popcountBigInt(n: bigint): number
  - Precondition: typeof n === 'bigint' and n >= 0n
  - Use: count = 0n; while (n !== 0n) { n &= (n - 1n); count += 1n } ; return Number(count)

DIGEST
- Source URL: https://en.wikipedia.org/wiki/Hamming_weight
- Retrieved: 2026-03-21T23:22:22.035Z
- Data size fetched: 164874 bytes

ATTRIBUTION
Condensed from the Wikipedia entry "Hamming weight" and common algorithm descriptions; used to provide correct popcount algorithms and constraints for JS implementations.
