WIKIPEDIA_HAMMING_DISTANCE

Table of contents
1. Definition
2. Formal definition and formula
3. Binary / codeword use-cases
4. Properties and bounds
5. Examples

1. Definition
Hamming distance between two strings of equal length is the number of positions at which the corresponding symbols are different. It applies to sequences over any alphabet; for binary vectors it equals number of differing bits.

2. Formal definition and formula
Given two strings x and y of length n, HammingDistance(x,y) = |{ i in 0..n-1 : x[i] != y[i] }|. For bit-vectors, this equals the population count of x XOR y.

3. Binary / codeword use-cases
- Error detection and correction: minimum Hamming distance of a code determines its error-detecting and -correcting capability: distance d can detect up to d-1 bit errors and correct up to floor((d-1)/2) bit errors.
- Metric space: Hamming distance induces metric properties (non-negativity, identity, symmetry, triangle inequality).

4. Properties and bounds
- Symmetry: H(x,y)=H(y,x)
- Triangle inequality: H(x,z) <= H(x,y)+H(y,z)
- Relationship to XOR for integers: HammingDistanceInt(a,b) = popcount(a XOR b)

5. Examples
- "karolin" vs "kathrin" -> differing positions count = 3
- Empty strings: H("") = 0

Reference: https://en.wikipedia.org/wiki/Hamming_distance (retrieved 2026-03-21)

Attribution: content extracted from Wikipedia Hamming distance page. Approx bytes retrieved: ~72KB
