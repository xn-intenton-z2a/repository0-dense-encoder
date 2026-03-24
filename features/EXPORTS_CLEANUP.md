# EXPORTS_CLEANUP

Overview

Document and stabilise the public exports so consumers import named symbols and tests import the public API predictably.

Goals

- Confirm the public API surface and ensure tests and README use named imports (no default import required for library use).

Acceptance Criteria

- src/lib/main.js exports the following named symbols: encode, decode, registerEncoding, createEncodingFromCharset, listEncodings, encodeUUID, decodeUUID, sanitizeCharset (when implemented).
- Unit tests import the functions by name and assert each exported symbol is a function where applicable.
- README API examples use named imports and show short usage examples for encode/decode and creating custom encodings.
- If shorthand aliases are provided for backwards compatibility, they are small shim exports and documented as deprecated.

Implementation Notes

- Avoid introducing large compatibility layers; prefer a clear public surface and tiny shims if absolutely required.

Status

Mostly satisfied — named exports are present in the shipped codebase. Small aliasing may remain; ensure tests import by name and documentation shows named imports.

---
