MDN_FOR_OF

Table of contents
1. Purpose
2. Signature / syntax
3. Iteration behavior for strings
4. Unicode-correct iteration
5. Implementation notes for Hamming distance

1. Purpose
for...of iterates over iterable objects producing each element value; for strings this yields contiguous Unicode characters (by code point), not UTF-16 code units.

2. Syntax
for (const element of iterable) { /* ... */ }

3. Iteration behavior for strings
- Each loop yields a JS string containing a single Unicode character (which may be length 2 in UTF-16 for astral characters).
- This behavior ensures code-point-correct processing without manual surrogate handling.

4. Unicode-correct iteration
- Use for...of to iterate code points when computing positions for Hamming distance on Unicode strings. Alternative: Array.from(string) or spread operator [...string] produces an array of code points.

5. Implementation notes for Hamming distance
- Convert both strings into arrays of code points: const a = [...s1]; const b = [...s2]; then compare lengths and iterate indices to count differences.
- Avoid using s.charCodeAt(i) or s[i] index-based comparisons that treat surrogate pairs as separate positions.

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of (retrieved 2026-03-21)

Attribution: MDN for...of page. Approx bytes retrieved: ~12KB
