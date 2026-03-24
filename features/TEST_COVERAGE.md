# TEST_COVERAGE

Overview

Ensure unit tests exercise round-trip correctness, edge cases, and the UUID shorthand so regressions are caught early.

Goals

- Expand and document unit tests that assert round-trip encode/decode for all built-in encodings and representative custom encodings.

Acceptance Criteria

- tests/unit/encodings.test.js exists and asserts round-trip for: empty buffer, single byte, 16 bytes all-zero, 16 bytes all-0xFF, and a small non-trivial sample.
- Tests include the UUID shorthand encodeUUID/decodeUUID round-trip for a canonical fixture.
- A deterministic test asserts the densest encoding produces a UUID shorter than 22 characters.
- Running npm test completes successfully locally (CI may vary).

Status

Implemented: tests exist (tests/unit/encodings.test.js) but keep coverage goal to maintain or expand tests as encodings evolve.

---
