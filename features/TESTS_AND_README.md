# TESTS_AND_README

Overview

Create comprehensive unit tests covering round-trip behavior, edge cases, and a README comparison table that shows lengths for hex, base64 (no padding), base62, base85, and the densest high-density encoding for a sample v7 UUID.

Acceptance criteria

- Unit tests exist for all encodings and API functions under tests/unit/ and assert round-trip correctness for empty, single byte, all-zero, all-0xFF, and canonical v7 UUID.
- A comparison test computes encoded lengths for the sample v7 UUID across all encodings and asserts the densest encoding produces fewer than 22 characters.
- README.md contains a UUID encoding comparison table with at least: hex, base64 (no padding), base62, base85, high-density.

Implementation notes

- Tests should be deterministic and independent of system locale and ordering.
- Place sample UUID values in tests fixtures for reuse.
