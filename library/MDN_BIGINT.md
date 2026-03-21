Title: MDN_BIGINT

Table of contents:
- What is BigInt
- Creation and literals
- Operators and mixing with Number
- Bitwise support and limitations
- Important behaviors and caveats
- Use cases for integer Hamming distance
- Reference details and spec links
- Retrieval digest and attribution

What is BigInt
BigInt is a primitive type for arbitrarily large integers. Denoted with an 'n' suffix (e.g., 123n) or constructed with BigInt(value).
typeof 1n === "bigint".

Creation and literals
- Literal: append n, e.g., 9007199254740991n
- Constructor: BigInt("123") or BigInt(123) (Number -> BigInt conversion only if integer value)
- Hex, octal, binary string forms supported (prefixes 0x, 0o, 0b)

Operators and mixing with Number
- Arithmetic and bitwise operators support BigInt, but operands must be the same type; mixing BigInt and Number in arithmetic throws TypeError (except comparisons and boolean context which coerce differently).
- Boolean-returning operators allow mixing (==, !=, <, >).
- Unary plus (+) not supported on BigInt; unsigned right shift >>> is unsupported.

Bitwise support and limitations
- Supported: >>, <<, &, |, ^, ~ when both operands are BigInts.
- All BigInts are signed; unsigned right shift is not available.

Important behaviors and caveats
- Division truncates toward zero (5n / 2n === 2n).
- JSON.stringify throws TypeError for BigInt; use replacer or toJSON to serialize.
- Not constant-time; avoid for cryptographic secrets without mitigations.

Use for integer Hamming distance
- BigInt supports bitwise XOR (a ^ b) and bitwise operations necessary to compute differing bits between non-negative integers beyond Number.MAX_SAFE_INTEGER.
- Implementation pattern: ensure inputs are non-negative integers (Number or BigInt). Convert Numbers to BigInt when large or when mixing is possible: BigInt(x). Compute diff = a ^ b; then compute popcount of diff (see bithacks/COUNTBITS) using BigInt-aware operations or convert to Number when safe.

Reference details and spec links
- ECMAScript spec: https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-bigint-objects

Retrieval digest and attribution
Source: MDN Web Docs — BigInt; retrieved 2026-03-21
Data size fetched: approximately 24KB (MDN page extract)
Attribution: MDN contributors; page last modified Jul 10, 2025
