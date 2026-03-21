# STRING_HAMMING

Summary

Provide a library feature that computes Hamming distance between two strings of equal length using Unicode code point comparison (not UTF-16 code units). This feature is a named export in src/lib/main.js and must be covered by unit tests demonstrating normal, edge and error cases.

Behavior

- Export a function named hammingString(a, b) that returns the number of code point positions where a and b differ.
- Treat empty strings as valid; hammingString("", "") returns 0.
- Validate inputs: if either argument is not a string, throw TypeError; if strings have different code point lengths, throw RangeError.
- Use Unicode code point aware iteration (for example using for...of or Array.from) to ensure characters such as emoji and composed characters are treated correctly.

API

- Named export: hammingString(a: string, b: string) -> number

Acceptance Criteria

- hammingString("karolin", "kathrin") === 3
- hammingString("", "") === 0
- hammingString("a", "ab") throws RangeError
- hammingString called with a non-string argument throws TypeError
- Implementation can be tested in tests/unit/main.test.js and documented in README.md
