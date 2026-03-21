TITLE: WIKIPEDIA_HAMMING_DISTANCE

Table of contents:
1. Definition and formal statement
2. Mathematical properties and formulae
3. Applications relevant to implementation
4. Edge cases and constraints
5. Supplementary technical specifications
6. Reference details (extracts and exact statements)
7. Digest and retrieval metadata
8. Attribution and data size

1. Definition and formal statement
Hamming distance d(x, y) for two equal-length strings or vectors x and y is the number of positions at which the corresponding symbols are different.
For binary vectors, equivalently d(x,y) = weight(x XOR y), where weight counts 1 bits.
For strings: require equal length; if lengths differ, operation is undefined and should raise a RangeError in strict implementations.

2. Mathematical properties and formulae
- Non-negativity: d(x,y) >= 0
- Identity: d(x,y)=0 iff x and y identical
- Symmetry: d(x,y)=d(y,x)
- Triangle inequality: d(x,z) <= d(x,y) + d(y,z)
- For binary integers: use bitwise XOR then popcount: d(a,b)=popcount(a ^ b)

3. Applications relevant to implementation
- Error-detecting/correcting codes: Hamming distance is used to compute minimum distance between codewords; implementation must support efficient bit counting for large integers.
- Similarity metrics for strings: use code point comparison for Unicode; must compare code points not UTF-16 code units.

4. Edge cases and constraints
- Empty strings: distance 0
- Unequal-length strings: should raise RangeError
- Non-string inputs: should raise TypeError
- Negative integers: should raise RangeError (mission requirement)

5. Supplementary technical specifications
- For integer inputs up to JavaScript safe integer (Number.MAX_SAFE_INTEGER), implement XOR and count bits using fast algorithm (Brian Kernighan's loop or built-in popcount via BigInt if needed).
- For very large bit sequences, treat as arrays of words and sum popcounts per word.

6. Reference details (extracts and exact statements)
- Hamming distance is defined as the number of positions with differing symbols between two strings of equal length.
- For binary sequences, it equals the number of differing bits which is the popcount of the XOR.

7. Digest and retrieval metadata
- Retrieved: 2026-03-21
- Source: https://en.wikipedia.org/wiki/Hamming_distance
- Note: HTML crawl captured for extraction; select passages were extracted and condensed into above technical items.

8. Attribution and data size
- Source: Wikipedia — Hamming distance
- Crawl size: 156785 bytes (HTML)

