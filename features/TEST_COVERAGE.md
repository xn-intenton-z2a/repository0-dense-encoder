# TEST_COVERAGE

Overview

Ensure unit tests exercise round-trip correctness, edge cases, and the UUID shorthand so regressions are caught early.

Goals

- Expand and document unit tests that assert round-trip encode/decode for all built-in encodings and representative custom encodings.

Acceptance Criteria

- tests/unit/encodings.test.js asserts round-trip for: empty buffer, single byte, 16 bytes all-zero, 16 bytes all-0xFF, and a small non-trivial sample.
- Tests include the UUID shorthand encodeUUID/decodeUUID round-trip for the canonical fixture.
- A deterministic test asserts the densest encoding produces a UUID shorter than 22 characters.
- Tests are deterministic and kept in tests/unit/ to run with npm test.

Status

Done — unit tests exist in tests/unit/encodings.test.js and related metadata tests; maintainers should expand tests as encodings evolve. See closed issues #108, #110, #112 for the initial test work.

---
