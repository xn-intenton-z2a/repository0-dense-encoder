# CUSTOM_CHARSET

Overview

Allow users to define a custom encoding from an explicit charset string. The library must validate charsets and reject control characters, spaces, and visually ambiguous characters.

Acceptance criteria

- createEncoding accepts a charset string and registers an encoding that can be used with encode/decode.
- Invalid charsets (contains control characters, space, duplicate code points, or disallowed ambiguous characters) are rejected with a clear error.
- Round-trip tests exist for custom encodings created at runtime and persist for the life of the program instance.
- Unit tests at tests/unit/custom_charset.test.js cover validation, encoding, and decoding.

Implementation notes

- Disallowed characters include control chars, space, and characters in the ambiguous set: 0 O 1 l I. Provide a helper validation routine and reuse it in the high-density feature.
