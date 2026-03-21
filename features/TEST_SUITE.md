# TEST_SUITE

Purpose

Define the unit test requirements needed to validate the mission acceptance criteria and the features above. Tests guide implementation and act as guardrails for correctness and density comparisons.

# ACCEPTANCE CRITERIA

- Unit tests must exercise encode/decode round-trip for every built-in encoding (base62, base85, base91, and the printable-safe custom) over edge cases: empty buffer, single byte, all-zero buffer (16 bytes), all-0xFF buffer (16 bytes).
- Unit tests must verify UUID shorthand round-trip on a set of sample UUIDs and assert that the canonical output formatting is preserved.
- Unit tests must compute and compare encoded lengths for a canonical test UUID across encodings and assert the densest encoding length is strictly less than 22 characters.
- Unit tests must validate that listEncodings returns metadata objects containing name, bitsPerChar and charsetLength and that createEncodingFromCharset rejects invalid charsets.
- Tests should be written using the existing Vitest harness and import named exports from src/lib/main.js.

# IMPLEMENTATION NOTES

- Provide fixtures for the canonical UUID hex string, its 16-byte representation, and expected baseline lengths for hex (32), base64 (22 no padding) so tests can assert relative density.