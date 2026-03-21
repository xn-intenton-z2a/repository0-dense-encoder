MDN_BITWISE_OPERATORS

TABLE OF CONTENTS
- Bitwise operators with Number operands (32-bit semantics)
- Bitwise operators with BigInt operands
- Coercion and error rules
- Implementation guidance for JavaScript hamming distance

NORMALISED EXTRACT
Bitwise operators with Number operands
- When applied to Number operands, JavaScript bitwise operators convert values to signed 32-bit integers (ToInt32 coercion) and results are signed 32-bit integers.
- Operators: &, |, ^, ~, <<, >>, >>> operate on 32-bit integers; >>> is unsigned right shift and is not available for BigInt.

Bitwise operators with BigInt operands
- BigInt supports bitwise operators between BigInt operands: &, |, ^, ~, <<, >> (these operate on arbitrarily large integers and produce BigInt results).
- Note: the unsigned right shift operator >>> is not defined for BigInt.

Coercion and error rules
- Mixing Number and BigInt in a single bitwise or arithmetic expression throws TypeError. Convert explicitly to the intended type.
- For Number operands, beware of 32-bit truncation: using bitwise ops on numbers implicitly limits them to 32 bits.

IMPLEMENTATION GUIDANCE
- For integer Hamming distance of values that fit in signed 32-bit range, you can use Number bitwise XOR (a ^ b) and then count set bits of the 32-bit result using usual 32-bit popcount techniques.
- For values beyond 32 bits or when arbitrary precision is required, convert inputs to BigInt and use BigInt XOR (A ^ B). Then compute popcount with BigInt-aware algorithm (see STANFORD_BITHACKS and MDN_BIGINT).
- Do not use >>> with BigInt (unsupported). Use BigInt.asUintN to mask and emulate unsigned behavior for fixed widths when needed.

DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
- Retrieved: 2026-03-21T23:22:22.035Z
- Data size fetched: 244981 bytes

ATTRIBUTION
Condensed from MDN Web Docs: bitwise operator semantics for JavaScript numbers and BigInt; used to ensure correct choice of operator families and to avoid coercion bugs.
