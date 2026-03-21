MDN_STRING_CODEPOINT

Table of contents:
- Overview
- String code points vs UTF-16 code units
- String.prototype.codePointAt(index) signature and behavior
- Iterating over code points (for...of) and surrogate pair handling
- Implementation notes for Unicode-correct string comparison

Overview:
The String.codePointAt method returns the Unicode code point value at a given position in a string, properly interpreting surrogate pairs. Use codePointAt to obtain numeric code points for accurate per-code-point comparison instead of comparing UTF-16 code units.

Signature and behavior:
- codePointAt(index) -> number | undefined
- Parameters: index: integer (0-based index of code unit position). If index is out of range, returns undefined.
- Return: integer code point value (e.g., U+1F600 -> 128512) when a full code point exists starting at the given index.
- If the code unit at index is the high surrogate of a valid surrogate pair (high-surrogate followed by low-surrogate), codePointAt returns the combined code point value and should be advanced by 2 code units when iterating.
- If the code unit is a low surrogate or an isolated surrogate, codePointAt returns the code unit's value.

Iterating over code points:
- Using for (const ch of string) iterates by Unicode code points (ES2015 iterator) rather than 16-bit code units.
- To compare two strings by code points, iterate both using for...of or convert to arrays of code points using Array.from(str) which uses the string iterator semantics.

Implementation notes for Hamming string distance:
- Validate both inputs are strings; throw TypeError for non-strings.
- Convert both strings to arrays of code points: const a = Array.from(strA); const b = Array.from(strB);
- If a.length !== b.length, throw RangeError for unequal-length strings.
- Count positions where a[i] !== b[i]. Use strict equality on code point strings (not numeric code points) or compare numeric code point values via codePointAt on iterator output.
- Empty strings: both Array.from("") -> [] ; distance between two empty arrays is 0.

Supplementary details (specification snippets):
- ECMAScript string iterator and Array.from semantics: string iterator yields full Unicode code point sequences; this is the correct way to normalise for per-code-point operations.

Reference & retrieval:
- Source: MDN — String.prototype.codePointAt
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
- Retrieved: 2026-03-21
- Data size: fetched HTML (cached) via HTTP
