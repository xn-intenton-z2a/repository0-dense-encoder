BIT_TWIDDLING_POPCOUNT

Table of contents
1. Purpose
2. Common algorithms (32-bit/64-bit)
3. Constant-time parallel popcount algorithm
4. Implementation patterns in C/JS
5. Performance notes and best practice

1. Purpose
Population count (popcount) returns the number of 1-bits in a binary integer. For Hamming distance on integers compute popcount(x ^ y).

2. Common algorithms (32-bit/64-bit)
- Loop: repeatedly clear lowest set bit: count += 1; x &= x - 1; (O(k) where k=popcount)
- Table-lookup: precompute byte-wise counts and sum for each byte of the integer.
- Parallel bit-count: use arithmetic and masks to count bits in O(log wordsize) operations.

3. Constant-time parallel popcount algorithm (from Bit Twiddling Hacks)
For 32-bit integer x:
x = x - ((x >> 1) & 0x55555555);
x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
x = (x + (x >> 4)) & 0x0F0F0F0F;
x = x + (x >> 8);
x = x + (x >> 16);
count = x & 0x0000003F;

4. Implementation patterns in JavaScript
- For numbers within 32-bit unsigned range use >>>0 to coerce: let v = (a ^ b) >>> 0; then apply parallel popcount sequence using >>> and & with 0x... constants.
- For integers exceeding 32 bits, split into 32-bit chunks and sum popcounts per chunk (e.g., BigInt support: compute XOR as BigInt and use loop/lookup per 64-bit segment).
- Simpler: use Kernighan's method: let count=0; while (v) { v &= v - 1; count++; }

5. Performance notes and best practice
- For typical JS usage where integers fit 32 bits, the parallel arithmetic method is fast and avoids loops.
- For very large integers (BigInt), chunking with table lookup or Kernighan loop per 64-bit segment is practical.

Reference: https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel (retrieved 2026-03-21)

Attribution: Sean Eron Anderson Bit Twiddling Hacks. Approx bytes retrieved: ~98KB
