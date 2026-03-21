# BASE85

Description

Implement a base85 encoding registered as base85. Choose and document a specific variant (Ascii85 or Z85) and ensure the decoder clearly documents accepted forms. The encoding should use a printable 85-character alphabet and aim for compact UUID representations.

Acceptance Criteria

- [ ] Encoding registered under the name base85 with charsetSize 85 and bitsPerChar ≈ 6.409.
- [ ] encode/decode are round-trip for edge-cases: empty buffer, single byte, all zeros, all 0xFF.
- [ ] Unit tests verify that a 16-byte UUID round-trips and that encoded length meets mission expectations (approximately 20 characters).
- [ ] listEncodings reports base85 metadata.

Notes

- Document whether the implementation supports the 'z' zero-block shortcut and whether delimiters are accepted or required.
