# BASE62

Description

Implement a built-in encoding named base62 using the character set 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.

Properties

- Charset size: 62
- Approximate bits per character: 5.95
- Expected encoded length for a 16-byte UUID: 22 characters

Behavior and constraints

- Must be URL-safe and contain no control characters.
- Must satisfy the round-trip property for arbitrary binary inputs including the required edge cases.

Acceptance Criteria

- encode('base62', data) and decode('base62', str) are exact inverses for unit test vectors including empty, single byte, all zeros and all 0xFF.
- listEncodings includes an entry for base62 with charsetSize 62 and bitsPerChar ≈ 5.95.
- For a canonical 16-byte UUID input, encode('base62', uuidBytes) returns a 22-character string.