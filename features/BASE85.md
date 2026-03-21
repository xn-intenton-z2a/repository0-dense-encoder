# BASE85

Description

Implement a built-in encoding named base85 using an established Ascii85 or Z85-compatible 85-character printable subset that contains no control characters.

Properties

- Charset size: 85
- Approximate bits per character: 6.41
- Expected encoded length for a 16-byte UUID: 20 characters

Behavior and constraints

- Use a deterministic variant (Z85 or Ascii85) that guarantees round-trip for arbitrary-length buffers.
- Avoid control and whitespace characters so the encoding is safe for CLI and web use.

Acceptance Criteria

- encode('base85', data) and decode('base85', str) invert for all unit test vectors including edge cases.
- listEncodings reports base85 with charsetSize 85 and bitsPerChar ≈ 6.41.
- For a 16-byte UUID, encode('base85', uuidBytes) returns 20 characters.