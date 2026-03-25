# EDGECASE_TESTS

Description
Add a focused test suite for edge cases and for verifying encoded UUID lengths across all encodings.

# ACCEPTANCE CRITERIA

- Tests included under tests/unit/uuid-lengths.test.js that use a fixed 16-byte sample (canonical UUID bytes) and assert encoded length for each provided encoding.
- Tests assert round-trip property for the special buffers: all-zero 16 bytes, all-0xFF 16 bytes, single byte, and empty buffer.
- A test asserts that the densest encoding produces a UUID representation shorter than base64 (i.e. < 22 characters) for the canonical 16-byte sample.

# IMPLEMENTATION NOTES

- Use a deterministic 16-byte buffer rather than relying on runtime UUID generation to keep tests stable.
- Files to change: tests/unit/uuid-lengths.test.js and optional reference data in tests/fixtures/.