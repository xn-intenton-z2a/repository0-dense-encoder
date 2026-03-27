# EDGECASE_TESTS

Purpose

Improve unit test coverage for encoding round-trip behaviour by exercising known edge cases and a small randomized property test suite.

Description

Add a focused test file under tests/unit that verifies the round-trip property for every registered encoding across the following edge cases and a small fuzz set:

- Empty buffer (length 0)
- Single byte (length 1) with various values
- All-zero bytes (e.g., 16 bytes of 0x00)
- All-0xFF bytes (e.g., 16 bytes of 0xFF)
- Random buffers: 1000 random buffers with lengths drawn from 0..64 bytes

Tests should use the library API (encode/decode and listEncodings) so they exercise the public surface rather than implementation internals.

Acceptance criteria

- A new test file exists in tests/unit (edgecases.test.js) covering all listed cases
- All tests assert exact equality between input Uint8Array and decode(encode(input)) for each encoding
- A test asserts that the repository's densest encoding produces a shorter encoded length for a 16-byte UUID than base64 (i.e., fewer than 22 characters)
- Tests are deterministic aside from random seed; document the seed or use a stable RNG in tests

Notes

Keep test runtime reasonable: 1000 randomized samples is suggested but may be reduced if CI cost is high. Ensure tests run with npm test.