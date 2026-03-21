WIKIPEDIA_HAMMING_WEIGHT

Table of contents
1. Definition
2. Relation to Hamming distance
3. Algorithms and complexity
4. Use cases

1. Definition
Hamming weight is the number of symbols that are different from the zero-symbol of the alphabet; for binary vectors it equals number of 1 bits (population count).

2. Relation to Hamming distance
HammingWeight(x) = HammingDistance(x, 0). For two integers a and b, HammingDistance(a,b) = HammingWeight(a XOR b).

3. Algorithms and complexity
- Same methods as popcount: looping clear-lowest-bit, table lookup, parallel arithmetic methods.

4. Use cases
- Cryptographic and coding theory metrics, bit-density calculations, optimization heuristics.

Reference: https://en.wikipedia.org/wiki/Hamming_weight (retrieved 2026-03-21)

Attribution: Wikipedia Hamming weight. Approx bytes retrieved: ~24KB
