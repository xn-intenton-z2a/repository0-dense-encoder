Title: WIKIPEDIA_HAMMING_DISTANCE

Table of Contents:
- Definition
- Formal definition and formula
- Use cases and constraints
- Implementation notes for software

Definition:
Hamming distance between two strings of equal length is the number of positions at which the corresponding symbols are different.

Formal definition and formula:
Given two equal-length sequences x and y over an alphabet, HammingDistance(x,y) = sum_{i=1..n} [x_i != y_i] where [P] is 1 if predicate P is true, else 0.

Use cases and constraints:
- Error detection and correction: measure of substitutions between codewords.
- Applicable only to equal-length sequences; unequal lengths must be rejected or normalized prior to comparison.
- Distance is an integer in range [0, n].

Implementation notes for software:
- Validate inputs: both must be strings; if not, throw TypeError.
- Validate equal length: if lengths differ, throw RangeError.
- For Unicode-correct comparison, iterate over Unicode code points (not JS UTF-16 code units). Convert each string to an array of code points using a safe method (e.g., language-provided code point iterator) and compare element-wise.
- Counting algorithm: simple loop incrementing a counter when code points differ. Time O(n), space O(n) if code-point arrays created; O(1) extra space if iterators used.

Supplementary details:
- For very large inputs, prefer streaming iterators that yield code points to avoid full-array allocation; process code points pairwise until end.
- Normalisation: Unicode canonical equivalence means visually identical sequences may have different code point sequences; if intent is logical character equality, perform Unicode Normalization Form Canonical Composition (NFC) on both inputs before comparing.

Reference details (practical API and behavior):
- API contract:
  - function hammingString(a, b)
    - Parameters: a: string, b: string
    - Throws: TypeError if a or b is not a string; RangeError if code point length of a != code point length of b
    - Returns: integer >= 0 equal to number of differing code points
- Behavior examples:
  - hammingString('karolin','kathrin') -> 3
  - hammingString('','') -> 0
  - hammingString('a','ab') -> throws RangeError

Digest:
- Source: https://en.wikipedia.org/wiki/Hamming_distance
- Retrieved: 2026-03-21
- Extract size: raw HTML fetched for extraction (see SOURCES.md)

Attribution:
- Content derived from Wikipedia: Hamming distance (https://en.wikipedia.org/wiki/Hamming_distance)