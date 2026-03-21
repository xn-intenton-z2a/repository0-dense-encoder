# UNIT_TESTS

Description

Define unit tests that precisely verify the mission acceptance criteria and the features above. Tests should be runnable with the repository test command and deterministic.

Core test cases

- Round-trip tests for each encoding produced by listEncodings: empty buffer, single byte, all-zero 16-byte buffer, all-0xFF 16-byte buffer, and a few random vectors.
- UUID tests: for each built-in encoding verify encodeUUID/decodeUUID invert and collect encoded lengths for a canonical UUID; assert the densest encoding produces fewer than 22 characters.
- API tests: assert named exports exist in src/lib/main.js and correct types are returned/accepted.
- Custom charset tests: register a valid custom charset and verify round-trip; attempt to register invalid charsets and assert failures.
- Encoding list tests: listEncodings returns accurate charsetSize and bitsPerChar values.

Acceptance Criteria

- Tests cover the edge cases listed above and are written so they can be executed with npm test.
- Tests provide clear assertions for the mission acceptance criteria including densest-encoding length and round-trip correctness.