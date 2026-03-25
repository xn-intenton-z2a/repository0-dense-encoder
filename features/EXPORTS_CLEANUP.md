# EXPORTS_CLEANUP

Description
Ensure the library exposes a clean named-export surface and that public functions are documented and tested.

# ACCEPTANCE CRITERIA

- src/lib/main.js exports named functions: encode, decode, createEncoding, listEncodings, encodeUUIDShorthand (or equivalent names used in the codebase).
- Tests assert the presence and types of those named exports under tests/unit/exports.test.js.
- README API section documents the named exports and examples of usage.

# IMPLEMENTATION NOTES

- Make minimal changes to refactor from default export to named exports if necessary.
- Files to change: src/lib/main.js, tests/unit/exports.test.js, README.md.