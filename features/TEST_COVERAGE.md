# TEST_COVERAGE

Overview

Expand unit test coverage to cover all encodings, edge cases, and the UUID shorthand path. Tests should assert round-trip correctness for every supported encoding and verify density comparisons for a canonical 16-byte UUID.

Goals

- Ensure deterministic, idempotent unit tests using Vitest.
- Cover edge cases: empty buffer, single byte, 16 bytes all 0x00, 16 bytes all 0xFF.
- Verify that the densest encoding produces a UUID representation shorter than base64 (less than 22 characters) for at least one canonical sample.

Acceptance Criteria

- Add tests under tests/unit/encodings.test.js (or similar) that assert:
  - encode and decode round-trip for base62, base85, base91 and a representative custom encoding for the test fixtures.
  - edge case round-trips for empty Uint8Array, single byte, all-zero 16 bytes, and all-0xFF 16 bytes.
  - a deterministic 16-byte fixture (explicit bytes) when encoded by the densest encoding has length < 22.
- Tests run with npm test and pass locally.
- Source line coverage for src/ meets or exceeds the project minimum (50% line coverage) when running the unit coverage script.

Implementation Notes

- Import named exports from src/lib/main.js in the tests.
- Keep tests deterministic: use fixed byte arrays rather than random values.
- Place new test file in tests/unit/ and keep it focused on API behaviour, not internal implementation.

---
