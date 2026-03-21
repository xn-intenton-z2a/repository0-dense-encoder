MDN_ARRAY_FROM

TABLE OF CONTENTS
- Signature
- Behavior when used with strings
- mapFn and thisArg semantics
- Edge cases and examples

NORMALISED EXTRACT
Signature
- Array.from(arrayLike[, mapFn[, thisArg]]) -> Array
  - arrayLike: an array-like or iterable object
  - mapFn: optional mapping function applied to each element during creation of the new array
  - thisArg: optional value to use as this when executing mapFn

Behavior with strings
- When arrayLike is a string, Array.from uses the string iterator which yields Unicode code-point strings (not raw UTF-16 code units). Therefore Array.from(str) returns an array where each element is a single Unicode character (as a JS string) corresponding to a single code point.
- Examples: Array.from('𝌆') produces ['𝌆'] (single code point represented by a surrogate pair internally).

MAP FUNCTION
- If mapFn is provided, it is applied to each item produced by the iterator prior to insertion into the new array. The function receives (element, index) and executes with thisArg as its this value when provided.

EDGE CASES
- Empty string yields an empty array.
- Combining marks and normalization forms can change the number of code points; to compare canonical user-visible characters normalize first.

REFERENCE DETAILS (usage pattern)
- Use Array.from(normalize(s)) to obtain a canonical code-point array for equality or position-wise comparison.
- Complexity: O(n) time and O(n) space to produce the array of code points.

DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
- Retrieved: 2026-03-21T23:22:22.035Z
- Data size fetched: 171641 bytes

ATTRIBUTION
Condensed from MDN Web Docs (Array.from reference) for precise iterator and mapping semantics.
