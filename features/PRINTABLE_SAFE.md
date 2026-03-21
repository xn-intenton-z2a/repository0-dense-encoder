# PRINTABLE_SAFE

Description

Implement a higher-density built-in encoding named printable_safe that uses the printable ASCII range U+0021 (!) to U+007E (~) excluding visually ambiguous characters: 0 uppercase-O 1 lowercase-l uppercase-I. Space is not included.

Properties

- Charset size: 89 (94 printable ASCII characters minus the 5 ambiguous characters listed)
- Approximate bits per character: log2(89) ≈ 6.48
- Expected encoded length for a 16-byte UUID: ceil(128 / 6.48) = 20 characters

Behavior and constraints

- Charset must contain only printable, non-control characters and no visually ambiguous characters.
- Must satisfy round-trip property for arbitrary inputs.
- This encoding is intended to be the densest built-in option and must produce fewer than 22 characters for a 16-byte UUID.

Acceptance Criteria

- encode('printable_safe', data) and decode('printable_safe', str) invert for edge-case vectors.
- listEncodings includes printable_safe with charsetSize 89 and bitsPerChar ≈ 6.48.
- For a canonical 16-byte UUID input, encode('printable_safe', uuidBytes) returns 20 characters (i.e., < 22).