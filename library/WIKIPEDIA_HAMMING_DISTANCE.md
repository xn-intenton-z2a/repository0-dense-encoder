WIKIPEDIA_HAMMING_DISTANCE

Table of contents:
- Definition
- Mathematical properties
- Use cases and algorithms
- Examples relevant to strings and binary vectors

Definition:
Hamming distance between two strings of equal length is the number of positions at which the corresponding symbols are different. For binary vectors or integers represented in binary, the Hamming distance equals the number of differing bits.

Mathematical properties:
- d(x,y) = 0 iff x = y
- Symmetric: d(x,y) = d(y,x)
- For binary vectors, Hamming distance equals the population count of XOR: popcount(x XOR y)

Use cases and algorithms:
- Error detection and correction codes, similarity measures, clustering for categorical data.
- For computing on strings that may contain Unicode, normalise to code points first (see MDN String iterator / codePointAt).
- For integers, efficient computation via XOR followed by population count (Kernighan algorithm or lookup tables for fixed-width words).

Examples:
- "karolin" vs "kathrin" -> 3 differing positions.
- Integer example: 1 (001) vs 4 (100) -> XOR = 101 -> popcount = 2.

Reference & retrieval:
- Source: Wikipedia — Hamming distance
- URL: https://en.wikipedia.org/wiki/Hamming_distance
- Retrieved: 2026-03-21
- Data size: fetched HTML (cached) via HTTP
