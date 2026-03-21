WIKIPEDIA_HAMMING_DISTANCE

TABLE OF CONTENTS
- Definition
- Formal expression
- Properties (metric)
- Use for equal-length strings
- Use for integers / bit vectors
- Implementation notes and complexity

NORMALISED EXTRACT
Definition
For two sequences x and y of equal length n, the Hamming distance d_H(x,y) is the number of positions i in the range [0, n-1] for which the corresponding symbols differ. This can be expressed as:

d_H(x,y) = sum over i=0..n-1 of I(x_i != y_i)

where I(condition) is 1 when condition is true and 0 otherwise.

Use for equal-length strings
- Precondition: both operands are sequences of the same length (in code-point units when applying to Unicode strings).
- Algorithm (outline): iterate positions i, increment counter when the code points at position i differ.
- Complexity: O(n) time and O(1) additional space (besides code-point iteration storage if required).

Use for non-negative integers (bit vectors)
- Convert integers a and b to bitwise representation and compute r = a XOR b.
- Hamming distance = population count (number of 1 bits) in r.
- Compute popcount using an efficient algorithm (see HAMMING_WEIGHT / STANFORD_BITHACKS documents) or hardware POPCNT when available.
- Complexity: O(k) where k is number of machine words or proportional to number of set bits for Kernighan's algorithm.

PROPERTIES
- Non-negativity: d_H(x,y) >= 0
- Identity: d_H(x,y) = 0 iff x == y
- Symmetry: d_H(x,y) = d_H(y,x)
- Triangle inequality: Hamming distance is a metric on sequences of equal length.

VALIDATION RULES (implementation guidance)
- For string-distance function: accept only string arguments; throw TypeError when arguments are not strings; throw RangeError when normalized code-point lengths differ.
- For integer-distance function: accept only non-negative integers (Number integer or BigInt); throw TypeError for wrong types; throw RangeError for negative inputs.

EXAMPLES
- Strings: "karolin" vs "kathrin" -> 3
- Integers: 1 vs 4 -> XOR 1 ^ 4 = 5 (binary 101) -> popcount 2 -> Hamming distance 2

SUPPLEMENTARY DETAILS
- When implementing string comparison, iterate by Unicode code points (not UTF-16 code units). Use Array.from(str) or for-of iteration to obtain code points; apply Unicode normalization (String.prototype.normalize) before comparing to ensure canonical equivalence.
- For integers represented as JavaScript Number use bitwise methods only if both values fit safely into 32-bit integers; for arbitrarily large integers use BigInt and BigInt operations followed by a BigInt-aware popcount algorithm.

REFERENCE DETAILS (implementation patterns)
- String signature (exported): function hammingString(a: string, b: string): number
  - Validates types: both must be strings
  - Normalise: aN = a.normalize('NFC'); bN = b.normalize('NFC')
  - Code points: A = Array.from(aN); B = Array.from(bN)
  - If A.length !== B.length -> throw RangeError
  - Count differing positions: let d = 0; for i in 0..A.length-1: if (A[i] !== B[i]) d++
  - Return d (Number)

- Integer signature (exported): function hammingInteger(a: Number|BigInt, b: Number|BigInt): number
  - Validate: both are non-negative integers (Number.isInteger for Number, or typeof === 'bigint' for BigInt); reject negative values with RangeError
  - Convert to BigInt if either operand is BigInt: A = BigInt(a); B = BigInt(b)
  - XOR: R = A ^ B
  - Popcount: count set bits in R using Kernighan algorithm adapted to BigInt
  - Return Number(count) (or BigInt if API chooses, but prefer Number for compatibility)

DIGEST
- Source URL: https://en.wikipedia.org/wiki/Hamming_distance
- Retrieved: 2026-03-21T23:22:22.035Z
- Data size fetched: 165652 bytes

ATTRIBUTION
Material extracted and condensed from the Wikipedia article "Hamming distance" retrieved on the date above; used as the authoritative mathematical definition and high-level algorithm guidance.
