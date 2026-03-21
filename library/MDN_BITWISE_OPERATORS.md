TITLE: MDN_BITWISE_OPERATORS

Table of contents:
1. JavaScript bitwise operators semantics
2. Integer conversion rules and limits
3. XOR and popcount pattern for Hamming distance
4. Implementation details for counting differing bits
5. Edge cases and numeric limits (negative numbers, signed 32-bit behavior)
6. Supplementary reference details
7. Digest and retrieval metadata
8. Attribution and data size

1. JavaScript bitwise operators semantics
- Bitwise operators operate on 32-bit signed integers: operands are converted using ToInt32. Operators include &, |, ^, ~, <<, >>, >>>.
- For Hamming distance between non-negative integers within 32-bit range, compute a ^ b then count set bits.

2. Integer conversion rules and limits
- ToInt32 conversion reduces numbers to 32-bit signed two's complement; large integers outside 32-bits will be truncated.
- For mission requiring non-negative integers and potentially larger ranges, use BigInt and BigInt bitwise operations (available in modern Node) to avoid 32-bit truncation.

3. XOR and popcount pattern for Hamming distance
- Compute xor = a ^ b (Number or BigInt). Then count set bits in xor.
- For Number (32-bit): use Kernighan's method: while (xor !== 0) { xor &= xor - 1; count++ }
- For BigInt: use while (xor !== 0n) { xor &= xor - 1n; count++ }

4. Implementation details for counting differing bits
- Brian Kernighan's algorithm is O(k) where k = number of set bits; efficient for sparse bits.
- Alternative: use table lookup per byte/16-bit word or use Number.prototype.toString(2).split('1').length-1 (less efficient and allocates).
- For very large integers beyond Number, use BigInt popcount with Kernighan loop.

5. Edge cases and numeric limits (negative numbers, signed 32-bit behavior)
- Mission requires RangeError for negative integers.
- Be explicit: validate typeof === 'number' and Number.isInteger for Number inputs; for BigInt accept typeof === 'bigint' and non-negative check.

6. Supplementary reference details
- Bitwise operators behave on 32-bit signed integers; shift semantics and sign extension apply for >>.
- Use >>> to perform unsigned right shift.

7. Digest and retrieval metadata
- Retrieved: 2026-03-21
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

8. Attribution and data size
- Source: MDN Web Docs — Bitwise operators
- Crawl size: 238419 bytes (HTML)
