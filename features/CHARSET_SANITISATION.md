# CHARSET_SANITISATION

Overview

Ensure charset handling is safe, deterministic, and well-documented. The library must provide a deterministic sanitiser for user-supplied charsets and make it possible to register cleaned charsets without weakening registry validation.

Goals

- Provide a public sanitizeCharset(charset: string): string helper exported from src/lib/main.js.
- Add an options parameter to createEncodingFromCharset so callers may request sanitisation instead of strict validation.
- Document the exact sanitisation rules and ensure stable canonicalisation so tests and UI can rely on the outcome.

Acceptance Criteria

- Export: sanitizeCharset(charset: string): string is exported as a named export from src/lib/main.js.
  - Behaviour:
    - Removes any character outside U+0021..U+007E (printable ASCII excluding space U+0020).
    - Removes visually ambiguous characters: 0, O, 1, l, I.
    - Removes duplicate characters but preserves first-seen order (stable canonicalisation).
    - Does not perform case-folding or other transformations.
    - If the resulting canonical charset length is less than 2, sanitizeCharset throws a RangeError with a clear message.

- API: createEncodingFromCharset(charset: string, options?: { name?: string, sanitize?: boolean })
  - If options?.sanitize === true, createEncodingFromCharset calls sanitizeCharset and registers the resulting charset.
  - If options?.sanitize is omitted or false, current strict validation applies (behaviour unchanged).
  - The function returns the registered encoding object (same shape as registry entries).

- Tests: Add tests in tests/unit/charset.test.js that assert:
  - sanitizeCharset removes invalid characters, ambiguous characters, and duplicates and produces a stable canonical string for a set of input examples.
  - sanitizeCharset throws when the canonical result would be shorter than 2 characters.
  - createEncodingFromCharset(..., { sanitize: true }) registers an encoding usable by encode/decode and listEncodings.
  - createEncodingFromCharset(..., { sanitize: false }) throws on invalid input where current validation would fail.

Implementation Notes

- Implementation must be deterministic across platforms; tests should compare returned strings exactly.
- Prefer a small, well-tested helper that wraps the existing internal validateCharset logic where practical.
- Avoid altering existing registry semantics: registerEncoding may keep its skipValidation option for internal use.

Status

Open — the repository already contains an internal validateCharset function and registry-level validation for createEncodingFromCharset, but the named sanitizeCharset helper and the sanitize option are not yet exported/implemented and tests are missing.

---
