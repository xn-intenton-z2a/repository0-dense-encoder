TITLE: MDN_STRING_CODEPOINT

Table of contents:
1. Behavior of String code points in JavaScript
2. String normalization for code point iteration
3. Correct comparison algorithm for Unicode strings
4. Edge cases: surrogate pairs, combining marks
5. Implementation notes and examples (technical patterns)
6. Supplementary specifications
7. Digest and retrieval metadata
8. Attribution and data size

1. Behavior of String code points in JavaScript
- JavaScript strings are sequences of UTF-16 code units; characters outside BMP (U+10000+) are represented by surrogate pairs.
- Use String.prototype.codePointAt(pos) to obtain the full Unicode code point at a code unit index.
- To iterate by code points, use for-of on the string (which yields Unicode code points) or use Array.from(string) which splits by code points.

2. String normalization for code point iteration
- Unicode normalization (NFC/NFD) affects combining marks; for canonical equivalence, normalize strings with String.prototype.normalize(form) before comparison when required.

3. Correct comparison algorithm for Unicode strings
- For Hamming distance per-mission: compare sequences of code points, i.e., logical characters.
- Steps: convert each string to an array of code points (e.g., Array.from(str)), verify lengths equal, then compare array elements by numeric code point equality.
- On unequal lengths, throw RangeError.

4. Edge cases: surrogate pairs, combining marks
- Surrogate pairs: codePointAt and for-of/Array.from handle surrogate pairs correctly; do not compare code units.
- Combining marks: normalization may be necessary; if mission requires canonical character equality, call normalize('NFC') on both strings prior to code point array creation.

5. Implementation notes and examples (technical patterns)
- Use: const aPoints = Array.from(a.normalize('NFC')); const bPoints = Array.from(b.normalize('NFC'));
- Compare lengths: if (aPoints.length !== bPoints.length) throw RangeError
- Count differences: for (let i=0;i<aPoints.length;i++) if (aPoints[i] !== bPoints[i]) count++

6. Supplementary specifications
- codePointAt returns integer code point values; equality comparison uses numeric equality.
- For performance on very long strings, consider iterating with for-of rather than creating intermediate arrays if memory is constrained.

7. Digest and retrieval metadata
- Retrieved: 2026-03-21
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt

8. Attribution and data size
- Source: MDN Web Docs — String.prototype.codePointAt
- Crawl size: 162097 bytes (HTML)
