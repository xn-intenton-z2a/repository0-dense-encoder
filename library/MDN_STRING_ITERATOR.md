MDN_STRING_ITERATOR

Table of contents:
1. Overview
2. Behavior of the iterator
3. Interaction with Array.from and spread
4. Iterator return values and structure
5. Implementation pattern for Hamming distance
6. Supplementary details and pitfalls
7. Detailed digest and attribution

1. Overview
The string iterator (String.prototype[@@iterator]) iterates over a string by Unicode code points; each iteration step yields a string containing exactly one code point (which may be a surrogate pair combined into one value).

2. Behavior of the iterator
- The iterator advances by code point, not by UTF-16 code units. Each yielded value is a string of length 1 in terms of ECMAScript string indexing semantics, but may consist of two UTF-16 code units for astral code points.
- The iterator conforms to the ECMAScript Iterator protocol and returns objects with properties { value: <string>, done: <boolean> }.

3. Interaction with Array.from and spread
- Array.from(someString) and [...someString] both use the string iterator and therefore produce an array of strings where each element is one Unicode code point.
- These idioms are the recommended, simple way to obtain code-point arrays for Hamming comparisons: let a = Array.from(s1); let b = Array.from(s2);

4. Iterator return values and structure
- Type: Object with properties value (string) and done (boolean).
- value contains the code point as a string; for use in numeric comparisons convert to numeric code points using codePointAt(0) or compare the string values directly when normalised.

5. Implementation pattern for Hamming distance
- Normalize both inputs to the chosen normalization form (optional but recommended).
- Convert inputs to code-point arrays using Array.from or the spread operator.
- If arrays have different lengths, throw RangeError for Hamming distance of equal-length string requirement.
- Count differing positions by strict inequality of corresponding array elements or by comparing numeric code point values.

6. Supplementary details and pitfalls
- Combining marks and grapheme clusters: the iterator yields individual code points; combining sequences yield multiple iterator steps. To operate on grapheme clusters (user-visible characters), use Intl.Segmenter with granularity 'grapheme'.
- Performance: Array.from creates a new array; for large inputs prefer a single-pass comparison using iterators to avoid allocating two full arrays when memory is constrained.

7. Detailed digest and attribution
- Source: MDN Web Docs — String.prototype[@@iterator]
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator
- Retrieved: 2026-03-21
- Data size obtained during crawl: 160433 bytes
