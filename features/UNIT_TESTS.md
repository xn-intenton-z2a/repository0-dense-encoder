# UNIT_TESTS

Overview

Add unit tests that verify correct behaviour, edge cases and error handling for both string and bit Hamming functions using Vitest.

Test locations

- Add tests to tests/unit/hamming.test.js (or extend tests/unit/main.test.js) alongside existing unit tests.

Test cases

- String tests:
  - 'karolin' vs 'kathrin' => 3
  - '' vs '' => 0
  - unequal code-point lengths throw RangeError
  - 'a𝔘' vs 'ab' => 1 (code-point example)
  - non-string inputs throw TypeError
- Bit tests:
  - 1 vs 4 => 2
  - 0 vs 0 => 0
  - negative integers throw RangeError
  - non-integers throw TypeError
  - BigInt inputs supported and verified
- Integration and identity:
  - Library still exports name, version, description, getIdentity and main
  - CLI main runs without error when invoked as a script

Acceptance Criteria

- All new hamming tests pass and are included under tests/unit.
- Existing tests remain unchanged and pass.