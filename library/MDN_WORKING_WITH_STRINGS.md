MDN_WORKING_WITH_STRINGS

TABLE OF CONTENTS
- String internals: UTF-16 code units vs Unicode code points
- Iteration and code-point access
- String.prototype.codePointAt(pos)
- String.prototype.normalize([form])
- Best practice for equality and indexing

NORMALISED EXTRACT
String internals
- JavaScript strings are sequences of UTF-16 code units. Individual user-perceived characters (Unicode code points) may be represented by one or two code units (surrogate pairs).

Iteration and code-point access
- for (const ch of someString) iterates by Unicode code point; each iteration yields a string value that corresponds to one Unicode code point (which may be one or two UTF-16 code units internally).
- Using the spread operator or Array.from on a string yields an array of code-point strings: Array.from(str) or [...str]. This is the recommended way to obtain code points for indexing or length checks.

String.prototype.codePointAt(pos)
- Signature: codePointAt(pos: number) -> number | undefined
- Behavior: returns the Unicode code point value at the given UTF-16 code unit index pos; returns undefined if pos is out of range.

String.prototype.normalize([form])
- Signature: normalize(form?: 'NFC'|'NFD'|'NFKC'|'NFKD') -> string
- Behavior: returns a string normalized to the specified Unicode normalization form. Default behavior is 'NFC' when form is omitted.

BEST PRACTICES FOR IMPLEMENTING Hamming distance on strings
- Normalize both input strings to a chosen canonical form (e.g., NFC) using String.prototype.normalize before comparing to avoid mismatches caused by composed vs decomposed sequences.
- Convert normalized strings to code-point arrays with Array.from(normalizedString) (or [...normalizedString]). Compare arrays element-by-element. Do not use str[i] for code-point indexing, as str[i] accesses UTF-16 code units.

REFERENCE DETAILS
- Array.from signature: Array.from(arrayLike, mapFn?, thisArg?) -> Array
  - When arrayLike is a string, iteration uses the string iterator and yields code-point strings.
- For examples and edge cases: empty string yields [] from Array.from; combining marks and composed characters affect length of Array.from(normalizedString).

DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_strings
- Retrieved: 2026-03-21T23:22:22.035Z
- Data size fetched: 86425 bytes

ATTRIBUTION
Core technical guidance derived from MDN Web Docs: "Working with strings" and related reference pages for exact method semantics.
