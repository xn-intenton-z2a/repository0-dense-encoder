# STRING_DISTANCE

Summary

Compute the Hamming distance between two strings of equal length using Unicode code points (not UTF-16 code units). This feature defines the public API for string distance and validation rules, plus the unit-test behaviours required to satisfy the mission.

Behaviour

- Export a named function stringHamming(a, b) from src/lib/main.js (or the library entry point).
- Accept only string arguments; if either argument is not a string, throw TypeError.
- If the strings are of different length (in code points), throw RangeError.
- Distance is the count of positions where corresponding Unicode code points differ.
- Must handle empty strings and full Unicode code points (use for...of or Array.from to iterate code points).

API

- stringHamming(a: string, b: string) -> number
  - Throws TypeError for non-strings.
  - Throws RangeError for unequal-length strings (measured in code points).

Acceptance criteria

- Hamming distance between "karolin" and "kathrin" is 3.
- Hamming distance between "" and "" is 0.
- Hamming distance between strings of different lengths throws RangeError.

Tests

- Unit tests should live in tests/unit/ and call stringHamming directly.
- Include tests for normal ASCII strings, empty strings, strings with multi-code-point emoji/supplementary characters, and invalid types.
- Ensure tests assert specific thrown error types (TypeError, RangeError) where applicable.

Notes

- Use code-point iteration (for...of or [...str]) to ensure correct Unicode handling.
- Keep behaviour minimal and focused so it can be implemented entirely inside src/lib/main.js with small unit tests.