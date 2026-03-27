# CUSTOM_CHARSET_NORMALIZATION

Purpose

Provide an optional normalization helper so callers can request tolerant behaviour when supplying custom charsets that include ambiguous or duplicate characters.

Description

Implement a small, test-covered normalization path that can be used in two ways:

- Export a helper normalizeCharset(charset) that returns a sanitized charset string after removing control/whitespace characters, removing visually ambiguous characters (0, O, 1, l, I), and removing duplicate characters while preserving first occurrence order.
- Or accept an option on createEncoding: createEncoding(charset, { normalize: true }) which will call normalizeCharset before validation and creation.

Normalization rules

- Remove control characters and whitespace entirely.
- Remove ambiguous characters: 0, O, 1, l, I.
- Remove duplicate characters keeping first occurrence.
- After normalization if fewer than 2 characters remain, throw a TypeError with a helpful message.

Acceptance criteria

- normalizeCharset is exported or createEncoding supports { normalize: true } to enable normalization.
- Unit tests cover: ambiguous characters stripped, duplicates removed, normalization followed by successful encoding creation, and normalization leading to an error when too few characters remain.
- Documentation updated in README describing the optional normalization behaviour and examples.

Notes

Normalization is opt-in; default behaviour remains strict validation (createEncoding throws on ambiguous characters) to avoid surprising silent character loss.