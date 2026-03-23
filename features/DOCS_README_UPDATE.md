# DOCS_README_UPDATE

Summary

Update README and docs to include a clear UUID encoding comparison table, a list of available encodings with metadata, and a short usage section that points to the library API and CLI entrypoint.

Motivation

A single authoritative README table makes it easy for users to compare encoding density and to validate that the library meets the mission benchmark (shorter than base64 for v7 UUIDs). Good documentation also reduces support friction and speeds adoption.

Specification

- Add a UUID encoding comparison table to README showing: format name, character set size, bits per character, and encoded length for a v7 UUID for each built-in encoding (hex, base64, base62, base85, base91, and the densest custom encoding).
- Document the public named exports from src/lib/main.js and the expected inputs/outputs for encode, decode, createEncoding and listEncodings.
- Add a section describing the UUID shorthand behaviour (strip dashes, encode 16 bytes, reverse) and point readers to the unit tests for concrete examples.
- Ensure the docs avoid control characters and mention that custom charsets must exclude visually ambiguous characters.

Acceptance Criteria

1. README contains a UUID encoding comparison table with rows for hex and all built-in encodings and columns for charset size, bits/char, and UUID length.
2. README lists the public API names and describes expected types (Uint8Array input, string output for encode, Uint8Array for decode).
3. Documentation references the tests that validate round-trip behaviour and the UUID shorthand.
4. All documentation changes are limited to README and docs/ and do not alter source behaviour.

Implementation Notes

- Keep examples in README minimal and link to tests for exact usage; avoid embedding long code examples that will drift.
- Update package.json scripts only if needed to expose a demo or benchmark runner referenced by the README.