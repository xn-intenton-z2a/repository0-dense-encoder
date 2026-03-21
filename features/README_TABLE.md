# README_TABLE

Purpose

Specify the README addition: a compact comparison table showing the density and UUID-length results for each encoding so users can quickly compare tradeoffs.

# ACCEPTANCE CRITERIA

- README must include a table with columns: Encoding, CharsetSize, BitsPerChar, SampleUUIDLength.
- The table must include at least these entries: hex, base64 (no padding), base62, base85, base91, printable-safe custom encoding.
- Values in the table must be derived from implemented encodings and must be validated by automated tests described in TEST_SUITE.

# IMPLEMENTATION NOTES

- The README entry is a human-friendly summary; link to API docs for precise signatures and to the TEST_SUITE for verification instructions.