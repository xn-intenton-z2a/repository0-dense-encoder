MDN_CODEPOINTAT

Table of contents
1. Purpose
2. Signature
3. Behavior details
4. Unicode handling and surrogate pairs
5. Examples and best practices

1. Purpose
String.prototype.codePointAt returns the code point value at a given position in a string when interpreting the string as UTF-16 code units; it returns the full Unicode code point for characters represented by surrogate pairs when the index points to the lead surrogate. Use to obtain numeric code points for comparison.

2. Signature
codePointAt(position) -> Number or undefined
- position: integer (0..length-1); fractional values coerced to integer; negative or out-of-range returns undefined.

3. Behavior details
- If the code unit at position is a high surrogate (0xD800–0xDBFF) and the following code unit is a low surrogate (0xDC00–0xDFFF), returns the combined code point: ((lead - 0xD800) << 10) + (trail - 0xDC00) + 0x10000.
- Otherwise returns the code unit value at position.
- Useful to compare Unicode code points rather than UTF-16 code units.

4. Unicode handling and surrogate pairs
- For characters above U+FFFF (astral planes), JavaScript strings use surrogate pairs; codePointAt reads pairs so correct code-point comparisons require iterating by code points or using this method.
- To iterate by code points in JS, use for...of over the string (each iteration yields a full Unicode character) or use Array.from(string) which yields code point-aware units.

5. Examples and best practices
- Use codePointAt when you need numeric code point values for equality checks at particular positions.
- For Hamming distance on Unicode strings compare sequences of code points via for...of or Array.from, not simple index-based charCodeAt.

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt (retrieved 2026-03-21)

Attribution: MDN content extracted. Approx bytes retrieved: ~24KB
