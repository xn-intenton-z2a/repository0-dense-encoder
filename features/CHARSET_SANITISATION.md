# CHARSET_SANITISATION

Overview

Ensure charset handling is safe, deterministic, and well-documented. The codebase must both validate incoming custom charsets and provide a small helper that deterministically sanitises a charset string into a canonical form when requested.

Goals

- Provide a public sanitizeCharset(charset: string): string helper that returns a deterministic, clean charset string.
- Maintain strict validation for createEncodingFromCharset by default; offer an optional sanitise flag to accept and clean input instead of throwing.
- Document exactly which characters are disallowed and how duplicates and ordering are handled.

Acceptance Criteria

- The library exposes sanitizeCharset(charset: string): string which:
  - Removes any character outside U+0021..U+007E (printable ASCII excluding space).
  - Removes visually ambiguous characters: 0, O, 1, l, I.
  - Removes duplicate characters but preserves the first-seen order (canonicalisation is stable).
  - Returns a string length >= 2 for valid results; otherwise throws a clear error.
- createEncodingFromCharset accepts an optional options object { name?, sanitize?: boolean }:
  - When sanitize is true it uses sanitizeCharset to derive a canonical charset and registers it;
  - When sanitize is false (default) it validates strictly and throws on invalid input.
- Unit tests cover sanitizeCharset behaviour (duplicates, ambiguous chars, control chars, space) and createEncodingFromCharset with sanitize true/false paths.

Implementation Notes

- Keep sanitisation deterministic and well-documented; tests must rely on a deterministic canonical form.
- Tests should live in tests/unit/charset.test.js and import only public API.

Status

Open — validation exists in src/lib/main.js but sanitizeCharset and optional sanitize path are not yet implemented.

---
