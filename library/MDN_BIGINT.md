MDN_BIGINT

TABLE OF CONTENTS
- BigInt constructor and literals
- Methods: asIntN, asUintN, toString
- Arithmetic and bitwise semantics
- Mixing types and errors
- Implementation guidance for popcount with BigInt

NORMALISED EXTRACT
BigInt constructor and literals
- BigInt(value) -> bigint
  - Accepts numeric or string inputs that represent integers. Use BigInt literal notation with suffix n, e.g., 123n.

Methods
- BigInt.asIntN(width, bigint) -> bigint
  - Returns the signed integer represented by bigint in a two's-complement representation with the specified width in bits.
- BigInt.asUintN(width, bigint) -> bigint
  - Returns the unsigned integer represented by bigint with the specified width in bits.
- BigInt.prototype.toString([radix]) -> string
  - Produces string representation; optional radix parameter allowed.

Arithmetic and bitwise semantics
- BigInt supports standard arithmetic and bitwise operators between BigInt operands: +, -, *, /, %, **, &, |, ^, ~, <<, >> (operands must be BigInt).
- Results are BigInt values when operands are BigInt.

Mixing types and errors
- Mixing BigInt and Number in the same arithmetic or bitwise operation throws TypeError. Convert values explicitly to BigInt or Number before combining.

IMPLEMENTATION GUIDANCE (popcount and hamming distance)
- For integer Hamming distance when inputs may exceed 32 bits, convert arguments to BigInt and compute R = A ^ B where A and B are BigInt.
- Use Kernighan's algorithm adapted to BigInt to count set bits in R:
  - count = 0n
  - while (R !== 0n):
      R &= (R - 1n)
      count += 1n
  - return Number(count) // or bigint count depending on API
- Use BigInt.asUintN(width, R) if you need to constrain popcount to a fixed width in bits (for masked arithmetic or fixed-width comparisons).

REFERENCE DETAILS (signatures and behaviors)
- BigInt(value): constructs a BigInt from a numeric or string value
- BigInt.asIntN(width, bigint): width: number (interpreted as non-negative integer), bigint: bigint -> returns bigint
- BigInt.asUintN(width, bigint): same parameter types -> returns bigint
- Operators between BigInt operands return BigInt; mixing Number and BigInt throws TypeError

DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
- Retrieved: 2026-03-21T23:22:22.035Z
- Data size fetched: 176888 bytes

ATTRIBUTION
Condensed from MDN Web Docs: BigInt reference and examples; used to ensure BigInt-based implementations follow platform constraints and error behaviors.
