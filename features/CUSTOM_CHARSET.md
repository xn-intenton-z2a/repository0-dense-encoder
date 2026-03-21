# CUSTOM_CHARSET

Description

Allow creation of custom encodings by registering a charset string. registerEncoding(name, charset) validates the charset, computes metadata and makes the encoding available to encode/decode and listEncodings.

Validation rules

- Charset must contain at least 2 characters.
- Characters must be printable ASCII characters in the range U+0021 to U+007E (no control characters or whitespace).
- Charset characters must be unique; duplicates are rejected.
- Charset must not include the visually ambiguous characters 0 uppercase-O 1 lowercase-l uppercase-I; registration should reject charsets containing them.

Acceptance Criteria

- registerEncoding successfully registers valid charsets and makes them visible in listEncodings with correct metadata.
- registerEncoding throws or returns a clear error for invalid charsets (duplicates, too short, non-printable, or containing ambiguous characters).
- Encodings registered via registerEncoding satisfy round-trip encode/decode for unit tests.