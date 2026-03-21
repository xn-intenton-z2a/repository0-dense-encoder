Title: NPM_HAMMING_DISTANCE_PACKAGE

Table of Contents:
- Package purpose
- Typical API surface
- Validation and edge behaviors to mirror
- Notes about installation and maintenance

Package purpose:
- NPM packages named hamming-distance provide utility functions to compute Hamming distance for strings or integers; implementations vary in Unicode handling and input validation.

Typical API surface (common patterns):
- named exports: hamming, hammingDistance, distance
- function signatures seen in packages:
  - hamming(a: string, b: string): number
  - hammingInt(x: number|BigInt, y: number|BigInt): number
- Many packages do not handle Unicode code points correctly; prefer implementing Unicode-safe conversions yourself.

Validation and edge behaviors to mirror:
- Check argument types strictly and throw TypeError for wrong types.
- Enforce non-negative integers and safe integer ranges for numeric variants, or accept BigInt explicitly.

Notes about installation and maintenance:
- Use package only as reference or convenience wrapper; review source before depending. Some packages are small single-file implementations focused on ASCII or byte-wise comparison and may not handle Unicode.

Digest:
- Source: https://www.npmjs.com/package/hamming-distance
- Retrieved: 2026-03-21

Attribution:
- Content based on npm package page and typical implementations