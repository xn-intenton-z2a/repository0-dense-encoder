WIKIPEDIA_HAMMING_WEIGHT

Table of contents
- Definition of Hamming weight
- Relationship to bitwise Hamming distance
- Efficient bit population count algorithms

Normalised extract
Hamming weight of a non-negative integer is the number of 1 bits in its binary representation. The bitwise Hamming distance between two integers a and b equals the Hamming weight of (a XOR b). Efficient population count algorithms include: Kernighan’s algorithm (repeatedly clear lowest set bit), lookup-table methods for words/bytes, and CPU-specific instructions (POPCNT) when available.

Detailed information
- Kernighan’s algorithm: count = 0; while (v !== 0) { v &= v - 1; count++; }
- XOR-based distance: distance(a,b) = popcount(a ^ b).
- For JavaScript numbers (up to 53-bit integers), use bigint or repeatedly process 32-bit chunks via >>> 0 to safely count bits for large integers.

Supplementary details
- For non-negative integers up to 2^53-1, prefer BigInt to avoid precision loss when shifting beyond 32 bits.
- When using 32-bit operations, ensure values are coerced using >>> 0 to treat as unsigned 32-bit.

Reference details
- Exact implementation pattern: use XOR then population count. Examples: using Kernighan loop on BigInt by replacing arithmetic with bigint operations.

Detailed digest
Source: https://en.wikipedia.org/wiki/Hamming_weight
Retrieved: 2026-03-21
Data size: not recorded in-file

Attribution
Wikipedia — Hamming weight
