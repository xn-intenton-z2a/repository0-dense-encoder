STRING_HAMMING

# Purpose

Specify the library feature for computing Hamming distance between two strings of equal length, handling Unicode code points correctly and providing input validation.

# Description

Provide a named export stringHamming(a, b) in src/lib/main.js that:

- Accepts two arguments a and b.
- Throws TypeError if either argument is not a string.
- Throws RangeError if strings are of unequal length.
- Compares strings by Unicode code points (not UTF-16 code units), so characters outside the BMP are compared correctly.
- Returns a non-negative integer equal to the number of positions where corresponding code points differ.

# API

- Export name: stringHamming
- Signature: stringHamming(a: string, b: string) -> number
- Errors: TypeError for non-strings, RangeError for unequal lengths

# Acceptance criteria

- Hamming distance between "karolin" and "kathrin" is 3
- Hamming distance between "" and "" is 0
- Passing non-string arguments throws TypeError
- Passing strings of different lengths throws RangeError
- Multicode-point characters (e.g., emoji) are compared by code point and counted correctly

# Test suggestions

- tests/unit/string-hamming.test.js covering normal cases, empty strings, unequal lengths, TypeError cases, and Unicode surrogate pairs.

# Notes

- Use Array.from to iterate code points or equivalent to ensure correct Unicode handling.
- Keep behaviour deterministic and pure; no side effects.
