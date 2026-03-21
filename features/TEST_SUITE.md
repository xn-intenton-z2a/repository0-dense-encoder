# TEST_SUITE

Description

Add comprehensive unit tests covering all encodings, core API functions, custom charset creation, and the UUID shorthand. Tests must assert round-trip correctness and cover edge cases such as empty buffer, single byte, all-zero and all-0xFF inputs.

Acceptance Criteria

- [ ] Tests exist under tests/unit for base62, base85, base91, custom encodings, and UUID shorthand.
- [ ] Edge-case tests cover empty buffer, single byte, all zeros, and all 0xFF.
- [ ] A test computes encoded length of a sample v7 UUID for each encoding and asserts the densest encoding is shorter than base64 (22 chars).
- [ ] Running npm test executes the new tests and they pass on a correct implementation.

Notes

- Tests must be deterministic and avoid external network or time dependencies.
