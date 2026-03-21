# BASE62

Description

Implement canonical base62 encoding registered under the name base62. Use the alphanumeric alphabet 0-9 a-z A-Z and provide deterministic encode/decode behaviour suitable for fixed-length inputs such as UUIDs.

Acceptance Criteria

- [ ] A named encoding base62 is registered with charsetSize 62 and bitsPerChar ≈ 5.954.
- [ ] encode and decode are round-trip for edge-cases: empty buffer, single byte, all zeros, all 0xFF.
- [ ] Unit tests verify that a 16-byte UUID round-trips and that encoded length matches the calculated length for base62 (ceil((8*16)/log2(62))).
- [ ] listEncodings returns metadata for base62 including name, charsetSize and bitsPerChar.

Notes

- Implementations may use big-integer division or a bit-buffer approach; document chosen approach in code comments.
