# EXPORTS_CLEANUP

Overview

Clean up and document the public API to use explicit named exports so consumers can import only what they need and tests can import the public API predictably.

Goals

- Ensure src/lib/main.js exports the following named symbols: encode, decode, createEncoding, listEncodings, encodeUUID, decodeUUID.
- Update README API section to show the named exports and example import statements using ES module named imports.

Acceptance Criteria

- src/lib/main.js exposes the named exports listed above.
- Unit tests import functions by name, not via default import, and assert that each named export is a function.
- README contains the API section that documents these exports and one-line usage examples.

Implementation Notes

- This is a maintenance task: do not change runtime behaviour, only the module export surface and documentation.
- Where necessary, add small shim re-exports to preserve backwards compatibility before a breaking change is scheduled.

---
