# ENCODING_LISTING

Overview

Provide a listing facility that returns metadata for each registered encoding: name, charsetSize, bitsPerChar (floating point), and expected UUID length when encoding 16 bytes.

Acceptance criteria

- listEncodings() returns an array of objects with fields: name, charsetSize, bitsPerChar, uuidLength.
- bitsPerChar is computed precisely as log2(charsetSize) rounded to two decimal places for display but available with higher precision in metadata.
- Unit tests at tests/unit/listing.test.js assert presence and correctness of built-in encodings and that uuidLength matches the measured length from encoding a 16-byte buffer.

Implementation notes

- Use deterministic ordering for the list to make tests stable.
- Include sample values for base62 and base85 in the README comparison table.
