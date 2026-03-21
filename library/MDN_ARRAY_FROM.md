Title: MDN_ARRAY_FROM

Table of Contents:
- Purpose
- Behavior with strings and iterables
- Use for Unicode-safe conversion
- Performance considerations

Purpose:
- Array.from(source) creates a new Array instance from an array-like or iterable object.

Behavior with strings and iterables:
- When given a string, Array.from iterates the string by code points (using the string iterator), producing one array element per Unicode code point (not per UTF-16 code unit).
- This makes Array.from suitable for converting strings into arrays of characters that respect surrogate pairs.

Use for Unicode-safe conversion (practical):
- aPoints = Array.from(String(a)); bPoints = Array.from(String(b));
- Then compare lengths and elements element-wise to compute Hamming distance.

Performance considerations:
- Array.from allocates a new array of length equal to the number of code points. For very large strings prefer streaming iterators or manual iterator consumption to avoid peak memory.

Digest:
- Source: MDN: Array.from (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- Retrieved: 2026-03-21

Attribution:
- Content based on MDN Web Docs