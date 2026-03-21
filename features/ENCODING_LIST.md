# ENCODING_LIST

Description

Implement listEncodings that returns metadata for all built-in and custom encodings to aid comparison and selection.

Metadata fields

- name: encoding name string
- charsetSize: integer count of characters in the charset
- bitsPerChar: numeric value equal to log2(charsetSize), reported to two decimal places
- charsetPreview: the first up to 12 characters of the charset for human inspection

Acceptance Criteria

- listEncodings returns entries for base62, base85, printable_safe and any custom encodings registered during runtime.
- bitsPerChar equals log2(charsetSize) (rounded to two decimals) and is present for every returned encoding.
- Unit tests assert the presence and correctness of these metadata fields.