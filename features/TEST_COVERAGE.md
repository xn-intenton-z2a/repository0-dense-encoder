# TEST_COVERAGE

Summary

Increase unit test coverage for the encoding library and add focused tests that lock in the round-trip behaviour and edge-case handling required by the mission.

Motivation

Reliable, repeatable unit tests are required to maintain the round-trip property across encodings, to prevent regressions when densification optimisations are made, and to satisfy the repository coverage goals.

Specification

- Add unit tests under tests/unit that exercise encode and decode for all built-in encodings (base62, base85, base91 plus the existing custom highest-density encoding) using the public API exposed by src/lib/main.js.
- Tests must include edge cases: empty buffer, single byte, 16-byte UUID buffer (round-trip + expected length assertions), all-zero bytes, all-0xFF bytes, and at least 100 random buffers for fuzz coverage.
- Verify UUID shorthand behaviour: stripping dashes, encoding 16 bytes, reversing, and round-tripping back to the same bytes.
- Add tests that assert listEncodings returns metadata objects containing name, bitsPerChar, and charsetSize and that these values match the documented library files.

Acceptance Criteria

1. New unit tests exist in tests/unit and verify round-trip encode/decode for every encoding and for the edge cases listed above.
2. Tests include a fuzz test of at least 100 random buffers that assert decode(encode(x)) equals x.
3. A test asserts the densest encoding produces a UUID string shorter than base64 (i.e., length < 22 for the sample UUID).
4. Running npm test exits with zero and coverage meets the repository goals (line coverage >= 50% and branch coverage >= 30%), or test output documents the coverage delta if thresholds are adjusted.

Implementation Notes

- Prefer adding concise tests that import named API exports from src/lib/main.js.
- Keep tests deterministic where possible; seed the random generator for fuzz tests.
- Place tests alongside existing unit tests and avoid changing unrelated tests.
