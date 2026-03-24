# EXPORTS_CLEANUP

Overview

Document and stabilise the public exports so consumers import named symbols and tests import the public API predictably.

Goals

- Confirm and stabilise the public API surface; ensure tests and README use named imports and rely on a small, clear export surface.

Acceptance Criteria

- src/lib/main.js exports the following named symbols (present or required):
  - encode(name: string, data: Uint8Array): string
  - decode(name: string, encoded: string): Uint8Array
  - registerEncoding(name: string, charset: string, opts?): Encoding
  - createEncodingFromCharset(charset: string, options?): Encoding
  - listEncodings(): Array<{ name: string; bitsPerChar: number; charsetSize: number }>
  - encodeUUID(name: string, uuid: string): string
  - decodeUUID(name: string, encoded: string): string
  - sanitizeCharset(charset: string): string (required to complete CHARSET_SANITISATION feature)
- Unit tests import the functions by name and assert each exported symbol is present and behaves as a function where applicable.
- README API examples use named imports and show short usage examples for encode/decode and creating custom encodings.
- Backwards-compatible shims (if provided) are tiny and clearly marked deprecated in docs.

Implementation Notes

- Keep the public surface intentionally small. Avoid adding default exports as the primary API surface; named exports are favoured.

Status

Partially satisfied — src/lib/main.js currently exports encode, decode, registerEncoding, createEncodingFromCharset, listEncodings, encodeUUID, decodeUUID and a default export for identity. The sanitizeCharset helper is not yet exported and should be added to complete the public API described above. Update tests and README to import and demonstrate sanitizeCharset when implemented.

---
