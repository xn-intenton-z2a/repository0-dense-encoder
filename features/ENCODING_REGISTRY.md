# ENCODING_REGISTRY

Purpose

Centralise encoding metadata into a single registry inside src/lib/main.js and expose a stable metadata API so callers and tests can discover encoding properties without depending on implementation details.

Description

The project currently implements several encodings (base62, base85, base91 and others). This feature defines a single source-of-truth registry for each encoding and a small public metadata API:

- listEncodings() — returns an array of encoding metadata objects
- getEncoding(name) — returns metadata for a named encoding or throws if unknown

Each metadata object must include at least: name, charset (string), charsetSize (integer), bitsPerChar (number, approximate), and uuidLength (characters required to encode a 16-byte UUID).

Scope

- Move or mirror existing hard-coded encoding configuration into a registry object in src/lib/main.js
- Export listEncodings and getEncoding as named exports without changing encode/decode semantics
- Add unit tests that assert the registry contains the built-in encodings and that bitsPerChar values are correct within reasonable tolerance

Acceptance criteria

- listEncodings is exported as a named export and returns an array of objects with fields: name, charset, charsetSize, bitsPerChar, uuidLength
- getEncoding(name) is exported and returns exactly one metadata object or throws a descriptive error for unknown names
- The registry includes at minimum: base62, base85, base91, and the custom-dense encoding used by benchmarks
- Unit tests under tests/unit assert registry entries exist and that bitsPerChar approximations match expected values within ±0.05
- README references listEncodings for programmatic discovery of encodings

Notes

Keep the work minimal and local to src/lib/main.js and new tests; avoid changing encode/decode behaviour beyond routing through the registry.