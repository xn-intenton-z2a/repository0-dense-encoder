# CHARSET_SANITISATION

Overview

Ensure charset handling is safe, deterministic, and well-documented. The library must both validate incoming custom charsets and provide a small helper that deterministically sanitises a charset string into a canonical form when requested.

Goals

- Provide a public sanitizeCharset(charset: string): string helper that returns a deterministic, canonical charset string.
- Maintain strict validation for createEncodingFromCharset by default; offer an optional sanitize flag to accept and clean input instead of throwing.
- Document exactly which characters are disallowed and how duplicates and ordering are handled.

Acceptance Criteria

- Expose sanitizeCharset(charset: string): string from src/lib/main.js as a named export.
  - Removes any character outside U+0021..U+007E (printable ASCII excluding space).
  - Removes visually ambiguous characters: 0, O, 1, l, I.
  - Removes duplicate characters but preserves the first-seen order (stable canonicalisation).
  - Returns a string length >= 2 for valid results; otherwise throws a clear, testable error.
- createEncodingFromCharset(charset, options?) accepts an options object { name?: string, sanitize?: boolean }:
  - sanitize === true uses sanitizeCharset to derive a canonical charset and registers it.
  - sanitize === false (default) validates strictly and throws on invalid input.
- Unit tests in tests/unit/charset.test.js cover: duplicates, ambiguous characters, control characters, space, sanitize:true and sanitize:false paths, and expected thrown errors.

Implementation Notes

- Sanitisation must be deterministic and stable across platforms; tests must rely on this canonical form.
- Keep behaviour simple: first-seen ordering, drop invalid/ambiguous characters, do not perform case-folding.

Status

In progress — registry-level validation exists in the library but the exported sanitizeCharset helper and the dedicated tests are pending. Closed issues implementing registry and validation: #110, #112. 

---
