MDN_STRING_CODEPOINTAT

Table of contents:
1. Overview
2. Syntax and signature
3. Surrogate-pair handling (exact algorithm)
4. Usage patterns for Unicode-aware comparisons
5. Edge cases and errors
6. Supplementary implementation notes
7. Detailed digest and attribution

1. Overview
String.prototype.codePointAt returns the Unicode code point value at the given position in a string; it operates on code points, not UTF-16 code units when surrogate pairs are present.

2. Syntax and signature
Signature: String.prototype.codePointAt(position) -> number | undefined
Parameters:
- position: integer index (0-based) into the UTF-16 code unit sequence of the string. If omitted, position defaults to 0.
Return value:
- If position is out of range (position < 0 or position >= string length in code units) returns undefined.
- Otherwise returns an unsigned integer between 0 and 0x10FFFF representing the Unicode code point starting at that position.

3. Surrogate-pair handling (exact algorithm)
When the code unit at position is a high surrogate (0xD800..0xDBFF) and the following code unit exists and is a low surrogate (0xDC00..0xDFFF), codePointAt returns the single code point constructed from both units.
Exact computation:
- Let high = codeUnitAt(position)
- Let low = codeUnitAt(position+1)
- If 0xD800 <= high <= 0xDBFF and 0xDC00 <= low <= 0xDFFF then
    return ((high - 0xD800) << 10) + (low - 0xDC00) + 0x10000
- Else return high (the single code unit value)

4. Usage patterns for Unicode-aware comparisons
- To compare strings by code points, convert both strings to arrays of code points using idioms that iterate code points (for-of, Array.from, spread operator) and compare corresponding numeric values.
- For Hamming distance between strings: produce code-point arrays a and b; if a.length != b.length throw RangeError; otherwise count positions where a[i] !== b[i].
- For performance on large strings, avoid repeated codePointAt calls inside loops; extract code points once into arrays and then compare.

5. Edge cases and errors
- codePointAt never throws for normal inputs. Passing non-integer position will coerce to integer per ToInteger behavior (i.e., floor for numbers); negative positions return undefined.
- Combining characters and grapheme clusters: codePointAt returns code points; multiple code points may still display as one user-perceived character. Use Intl.Segmenter with granularity 'grapheme' when Hamming distance should operate on grapheme clusters instead of code points.

6. Supplementary implementation notes
- Complexity: extracting code points into an array is O(n) time and O(n) space in the number of code points.
- Use typed numeric computations when converting surrogate pairs to avoid overflow; operations described above fit within 32-bit unsigned arithmetic.

7. Detailed digest and attribution
- Source: MDN Web Docs — String.prototype.codePointAt
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
- Retrieved: 2026-03-21
- Data size obtained during crawl: 162097 bytes
