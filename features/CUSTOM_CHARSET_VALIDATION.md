# CUSTOM_CHARSET_VALIDATION

Purpose

Document and verify the library's strict validation for user-supplied custom charsets and ensure tests assert the behaviour.

Current state

The public createEncoding(charset, opts) helper exists and enforces a strict policy: the charset must be a string, contain no control characters or space, contain no duplicate characters, and must not include visually ambiguous characters (0, O, 1, l, I). If these checks fail createEncoding throws a descriptive Error.

Description

This feature documents the enforced validation behaviour and ensures unit tests cover both valid and invalid inputs. Normalization (removing ambiguous characters automatically) is intentionally not performed by default; a separate maintenance feature (CUSTOM_CHARSET_NORMALIZATION) can add optional normalization behaviour.

Acceptance criteria

- Tests assert createEncoding throws when the charset contains ambiguous characters, duplicates, or control/space characters.
- Tests assert createEncoding succeeds for a valid sanitized charset and that encodings created with createEncoding round-trip correctly.
- README / API docs state that createEncoding enforces strict validation and will throw on invalid charsets.

Notes

This is a behavioural documentation and test-strengthening task; it reflects the current implementation rather than changing it. If maintainers prefer normalization instead of throwing, see the CUSTOM_CHARSET_NORMALIZATION feature.