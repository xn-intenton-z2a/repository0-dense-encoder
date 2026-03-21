MDN_STRING_ITERATOR

Table of contents
- String iteration behaviour
- Code point iteration vs UTF-16 code unit iteration
- Usage details for comparing Unicode code points

Normalised extract
String iteration in JavaScript uses the String.prototype[@@iterator] method which iterates over Unicode code points, not UTF-16 code units. The iterator yields each Unicode code point as a string (may be length 1 or 2 code units). This makes it suitable for correct Unicode-aware comparisons: iterate both strings with their iterators and compare yielded code points pairwise.

Detailed information
- The iterator returns an object conforming to the iterable protocol; for (const ch of str) yields code points.
- Use Array.from(str) to obtain an array of code points (each entry is a string for a single Unicode character).
- Surrogate pairs (characters outside BMP) are presented as single items by the iterator and by codePointAt-related iteration.
- When implementing Hamming distance over Unicode strings: compare code points, not string.length; ensure both sequences have same count of code points before pairwise compare.

Supplementary details
- To count code points precisely: use for...of loop or Array.from(str).length to get the number of Unicode characters.
- Normalising with Unicode Normalization Form (NFC/NFD) is recommended before comparison to ensure canonically equivalent sequences are matched.

Reference details
- String.prototype[@@iterator] returns an iterator which yields strings representing single Unicode code points.
- Array.from(str) uses the same iterator to produce an array of code points.

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator
Retrieved: 2026-03-21
Data size: not recorded in-file

Attribution
MDN Web Docs — String.prototype[@@iterator]
