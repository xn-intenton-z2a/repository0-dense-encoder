# BASE85

Purpose

Provide base85 family encodings (Ascii85 and Z85 variants) as built-in encodings suitable for dense printable binary representation.

# ACCEPTANCE CRITERIA

- Provide at least one base85 variant (named base85 or z85) and allow either an options flag or separate named encoding for Adobe Ascii85 versus Z85 behaviour.
- Encoding metadata must advertise bitsPerChar approximately 6.409 and appropriate charsetLength (85 for Ascii85 or 85 for Z85 semantics where applicable).
- encode and decode must correctly handle full 4-byte blocks and final partial blocks, per the chosen variant rules, and must round-trip arbitrary inputs.
- For a 16-byte UUID the block-based base85 mapping must produce 20 characters for the variant that maps 4 input bytes to 5 output characters with no extra wrapper.
- listEncodings must include the base85 entry with accurate metadata and a brief note of the selected variant.

# IMPLEMENTATION NOTES

- Support a variant option for Adobe-style Ascii85 and a Z85-like variant. Document differences in padding and shorthand handling in code comments and tests.