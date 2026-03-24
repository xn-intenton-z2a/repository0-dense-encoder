# EXPORTS_CLEANUP

Overview

Document and stabilise the public exports so consumers import named symbols and tests import the public API predictably.

Goals

- Confirm the public API surface and ensure tests and README use named imports (no default import required for library use).

Acceptance Criteria

- src/lib/main.js exports the following named symbols: encode, decode, registerEncoding, createEncodingFromCharset, listEncodings, encodeUUID, decodeUUID.
- Unit tests import the functions by name and assert each exported symbol is a function where applicable.
- README API examples use named imports and show short usage examples for encode/decode and creating custom encodings.

Implementation Notes

- If backward compatibility is required, provide small shim aliases (e.g., export const createEncoding = createEncodingFromCharset) and mark them for later cleanup.

Status

Mostly satisfied: current code exports named symbols but some aliasing (createEncoding vs createEncodingFromCharset) may be added for clarity.

---
