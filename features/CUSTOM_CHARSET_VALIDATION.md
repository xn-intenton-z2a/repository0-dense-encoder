# CUSTOM_CHARSET_VALIDATION

Purpose

Introduce well-defined validation and normalization for user-supplied custom charsets so custom encodings are safe, dense, and free of visually ambiguous characters.

Description

Add a public helper (createCustomEncoding or similar) that accepts a charset string and returns a validated custom encoding descriptor. Validation rules:

- Remove control characters and whitespace
- Remove visually ambiguous characters: 0 (digit zero), O (capital oh), 1 (digit one), l (lowercase L), I (capital i)
- Ensure all remaining characters are unique
- Require a minimum of 2 unique characters; otherwise throw a descriptive error

The helper should be exported as a named export and covered by unit tests.

Acceptance criteria

- createCustomEncoding (or similarly named export) exists and is documented
- The helper removes ambiguous characters automatically and returns a stable charset string and metadata
- If the charset is invalid after normalization (fewer than 2 unique characters), the helper throws a TypeError with a helpful message
- Unit tests cover: a charset containing ambiguous characters, a charset with duplicates, and an invalid charset that triggers the error
- Behaviour is compatible with existing encode/decode functions when passed a custom encoding produced by the helper

Notes

Prefer normalization (removing ambiguous characters) rather than silently accepting them; document behaviour in README.