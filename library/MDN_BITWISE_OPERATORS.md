MDN_BITWISE_OPERATORS

Table of contents:
- Overview
- Bitwise operator semantics in JavaScript
- Counting differing bits between non-negative integers
- Implementation patterns and edge cases

Overview:
JavaScript bitwise operators operate on 32-bit signed integers. For calculating Hamming distance between non-negative integers, convert numbers into bit representations and count differing bits using XOR and bit counting.

Key operator and pattern:
- XOR (^) returns a number whose bits are 1 where the corresponding bits of its operands differ.
- To compute differing bits: let x = a ^ b; count set bits in x.

Counting set bits (population count) implementations:
- Kernighan's algorithm (fast, loop over set bits):
  while (x !== 0) { count++; x &= x - 1; }
  This loops once per set bit.
- Builtins: For environments supporting BigInt and large integers, use BigInt(x) and similar bit methods; for mission scope use 32-bit integers.

Validation and integer handling:
- Validate inputs are numbers and non-negative integers (Number.isInteger(n) && n >= 0); else throw TypeError or RangeError respectively.
- Coerce to 32-bit unsigned for bit operations: use >>> 0 to ensure unsigned 32-bit integer before XOR and counting, e.g., const xa = a >>> 0; const xb = b >>> 0; const diff = xa ^ xb;
- Edge cases: large integers beyond 32 bits will be truncated by bitwise operators; for values > 2^32-1, use BigInt-based population count: let diff = BigInt(a) ^ BigInt(b); then count bits using loop: while (diff > 0n) { count++; diff &= diff - 1n; }

Supplementary details:
- Use Kernighan algorithm for performance and simplicity when using 32-bit numbers.
- For 0 vs 0, XOR yields 0 and count remains 0.

Reference & retrieval:
- Source: MDN — Bitwise Operators
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
- Retrieved: 2026-03-21
- Data size: fetched HTML (cached) via HTTP
