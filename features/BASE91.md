# BASE91

Description

Implement a basE91-style encoding registered as base91. Use a standard basE91 alphabet and the variable-bit buffer algorithm to maximise packing density and produce the shortest printable representation possible.

Acceptance Criteria

- [ ] Encoding registered as base91 with charsetSize 91 and bitsPerChar ≈ 6.508.
- [ ] encode/decode are round-trip for edge-cases and typical inputs.
- [ ] Unit tests verify that a 16-byte UUID encodes to fewer than 22 characters for the densest implementation.
- [ ] listEncodings reports base91 metadata.

Notes

- The alphabet and bit-buffer logic must match the chosen reference implementation to preserve interoperability and round-trip correctness.
