ASCII_PRINTABLE

TABLE OF CONTENTS
- Printable ASCII range definition
- Allowed set for custom high-density encodings
- Characters to exclude (control + ambiguous)
- Programmatic generation and validation of charset

PRINTABLE ASCII RANGE
- Printable ASCII characters are code points U+0021 (!) through U+007E (~). Space (U+0020) is excluded from this range for compact encodings that avoid leading/trailing spaces.

ALLOWED SET FOR CUSTOM ENCODINGS
- Base character pool: codepoints 0x21 .. 0x7E (inclusive). This yields 94 characters.
- For custom high-density alphabets use a subset of these characters but ensure uniqueness and deterministic ordering.

CHARACTERS TO EXCLUDE (RECOMMENDED)
- Control characters (U+0000..U+001F, U+007F) MUST be excluded.
- Exclude visually ambiguous characters to reduce human error and mis-copying: '0' vs 'O', '1' vs 'l' vs 'I'.
- Avoid characters that require quoting in common shells or languages where possible (single quote, double quote, backslash) unless escaping is handled by calling code.

PROGRAMMATIC GENERATION & VALIDATION
- Generation: produce an array of characters by iterating codepoints 0x21..0x7E, filtering out any excluded runes, and join into a string to be used as the alphabet.
- Validation steps for custom charset input:
  1. Ensure length >= 2
  2. Ensure all characters unique
  3. Ensure no control characters present

DETAILED DIGEST
Printable character range and advisable exclusions extracted from ASCII documentation and examples. Retrieved: 2026-03-27. Crawled content size: ~428 KB (aggregate pages).

ATTRIBUTION
Source: ASCII printable characters — https://en.wikipedia.org/wiki/ASCII#Printable_characters
