Title: MDN_STRING_CODEPOINTAT

Table of Contents:
- Purpose and behavior
- Code point retrieval semantics
- Iteration recommendations for Unicode
- Example usage patterns (technical)

Purpose and behavior:
- String.prototype.codePointAt(index) returns a non-negative integer that is the Unicode code point value at the given position. It reads a code point starting at the given position and returns its code point value; for a surrogate pair, it returns the combined code point.

Code point retrieval semantics:
- Input index addresses UTF-16 code units. To read logical Unicode code points correctly, do not assume one code unit equals one character; use codePointAt where required or iterate using for..of or Array.from to obtain code points.
- If index is out of range, returns undefined.

Iteration recommendations for Unicode:
- Use for (const ch of string) { } to iterate over code points in JavaScript; this yields full code points (including astral plane characters represented by surrogate pairs) rather than raw UTF-16 code units.
- Array.from(string) also yields an array of code points (as strings) suitable for element-wise comparison.

Practical pattern for Hamming string distance:
- Convert both strings to arrays of code-point strings: aPoints = Array.from(String(a)); bPoints = Array.from(String(b));
- If aPoints.length !== bPoints.length then throw RangeError; else loop index i and compare aPoints[i] !== bPoints[i], increment count.

Digest:
- Source: MDN: String.prototype.codePointAt (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
- Retrieved: 2026-03-21

Attribution:
- Content based on MDN Web Docs