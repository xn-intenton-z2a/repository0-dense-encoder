NPM_HAMMING_DISTANCE

Table of contents:
- Package overview
- API surface (exported functions and parameters)
- Typical usage patterns and examples
- Limitations and input validation

Package overview:
- The npm package 'hamming-distance' provides utilities to compute Hamming distance between buffers, strings, or integers. Behaviour varies by package; inspect package README for exact method signatures.

API surface (common patterns):
- distance(a, b) -> number
  - a, b: inputs of same type (strings, Buffers, numbers)
  - Throws TypeError for mismatched types or invalid inputs
- For strings, many packages assume UTF-8 / byte-level comparison; for Unicode-aware code-point comparisons prefer implementing via Array.from and comparing code points.

Limitations:
- Many npm packages perform byte-level comparisons and may not handle Unicode code points correctly — they compare UTF-8/UTF-16 code units or buffer bytes.
- For integer bitwise distance, packages may use 32-bit operations and thus truncate numbers > 32 bits.

Reference & retrieval:
- Source: npm — hamming-distance package page
- URL: https://www.npmjs.com/package/hamming-distance
- Retrieved: 2026-03-21
- Data size: request blocked by cloud protections; use package page for summary and README when available.
