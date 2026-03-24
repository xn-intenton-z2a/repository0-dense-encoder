# CHARSET_SANITISATION

Overview

Ensure custom character-set creation and validation enforce printable, non-ambiguous characters and deterministic behaviour. Prevent control characters, space, and visually ambiguous characters from entering custom charsets.

Goals

- Centralise charset validation logic used by createEncoding or equivalent factory.
- Provide deterministic sanitisation behavior: remove duplicates and normalise ordering in a documented way.

Acceptance Criteria

- A validation rule set is defined and documented: charset must be a string of printable ASCII characters in range U+0021 to U+007E excluding space, control characters, and the ambiguous characters: 0, O, 1, l, I.
- createEncoding throws a clear error for invalid charsets (too short, includes disallowed chars) and returns a deterministic charset for valid input (duplicates removed, stable order).
- Unit tests verify that invalid charsets are rejected, valid charsets are normalised, and the sanitisation rules are documented in README.

Implementation Notes

- Implement a small helper sanitizeCharset and add tests in tests/unit/charset.test.js.
- Document the sanitisation behaviour in the README section that covers custom encodings.

---
