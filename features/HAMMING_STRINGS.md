# HAMMING_STRINGS

Overview

This feature adds a library function hammingString that computes the Hamming distance between two strings of equal length measured in Unicode code points.

Behavior

- Both arguments must be strings; otherwise the function throws a TypeError.
- Strings are compared by Unicode code points (not UTF-16 code units); implementations should iterate code points (for example via Array.from).
- If the strings have different code-point lengths the function throws a RangeError.
- Returns a non-negative integer equal to the number of positions where code points differ.

API

- Export a named function hammingString from src/lib/main.js.

Acceptance Criteria

- hammingString between 'karolin' and 'kathrin' returns 3.
- hammingString between '' and '' returns 0.
- Calling hammingString with strings of different code-point length throws RangeError.
- hammingString('a𝔘', 'ab') returns 1 to demonstrate code-point-aware comparison.
- TypeError is thrown when either argument is not a string.

Notes for implementer

- Use code-point iteration (Array.from or equivalent) to build position arrays before comparing.
- Keep errors precise and typed so unit tests can assert failure modes.