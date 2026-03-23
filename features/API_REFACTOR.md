# API_REFACTOR

Summary

Refactor and clarify the public API surface in src/lib/main.js so exports are explicit, documented, and easy to test. Ensure listEncodings returns consistent metadata and that createEncoding accepts a charset string and returns a well-formed encoding object.

Motivation

A clear, stable API reduces accidental breaking changes and makes it easier to write tests and documentation. It also supports the mission goals by making it straightforward to discover encodings and their density properties programmatically.

Specification

- Ensure the module exports named bindings: encode, decode, createEncoding, listEncodings, encodeUUIDShorthand, and any helper constructors necessary for tests.
- Define the listEncodings return shape: an array of objects with fields name (string), bitsPerChar (number), charsetSize (number), charsetPreview (string, short sample), and uuidEncodedLength (number) which is the encoded length for a 16-byte UUID.
- Ensure createEncoding accepts a charset string and returns an encoding object compatible with encode/decode functions and the listEncodings metadata shape.
- Add unit tests that import and validate the exported names and the structure of the objects returned by listEncodings.

Acceptance Criteria

1. src/lib/main.js exports the named API bindings listed above and tests assert the exports exist.
2. listEncodings returns an array of metadata objects matching the specified schema and tests validate values for built-in encodings.
3. createEncoding produces an encoding that round-trips and appears in listEncodings metadata when registered.
4. All changes are covered by unit tests and documented in README update referenced by DOCS_README_UPDATE.

Implementation Notes

- Keep changes focused on API surface; avoid mixing this refactor with algorithmic changes in PERFORMANCE_OPTIMISATION.
- Make metadata generation deterministic and derived from the same charset definitions used by the encoders.