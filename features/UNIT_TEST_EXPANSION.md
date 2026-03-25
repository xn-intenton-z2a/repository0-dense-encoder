# UNIT_TEST_EXPANSION

Description
Add comprehensive unit tests covering the core encode/decode API surface and the custom-encoding factory. Tests should assert the round-trip property across all built-in encodings and for representative buffer sizes.

# ACCEPTANCE CRITERIA

- Tests added under tests/unit/ that exercise named exports for encodings: base62, base85, and the repository's densest encoding.
- For each encoding assert that decode(encode(buf)) equals buf for buffers: empty, single byte, two bytes, 16 bytes (UUID), 100 bytes, all-zero, all-0xFF, and at least 100 pseudo-random samples using a fixed seed.
- Tests validate that listEncodings (or equivalent) returns metadata objects including name, bitsPerChar, and charset size.
- Running npm test exits with status zero and the new tests are included in coverage reports.

# IMPLEMENTATION NOTES

- Use Vitest; keep tests deterministic by seeding or using fixed vectors.
- Minimal source changes are allowed only to expose named exports if missing.
- Files to change: add tests to tests/unit/, small adjustments in src/lib/main.js if required.