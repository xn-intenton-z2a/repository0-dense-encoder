# CLI_EXAMPLES

Overview

Provide small, practical examples and documentation for using the library from the command line so contributors can quickly exercise encode/decode and length-comparison scenarios without writing new JS files from scratch.

Goals

- Add an examples/cli/README.md that documents how to run the library's CLI entrypoint and what example scripts are available.
- Add lightweight example scripts under examples/cli that demonstrate common tasks: encode a fixed 16-byte UUID with all built-in encodings and print lengths; decode an encoded string back to bytes; run a simple comparison of built-in encodings for a canonical UUID.
- Ensure examples use the public named exports and no external dependencies.

Acceptance Criteria

- examples/cli/README.md exists and documents the available example scripts and a one-line example invocation for each, with expected deterministic outputs for the canonical UUID fixture.
- examples/cli/encode-sample.js (or encode-sample.mjs) demonstrates encoding a fixed 16-byte UUID and prints the encoded string and its length for each built-in encoding.
- Project README includes a short pointer to examples/cli and a single example command that a contributor can copy-paste to run the sample.
- Running the example script produces deterministic output for the canonical UUID fixture (manual verification accepted).

Implementation Notes

- Keep scripts dependency-free and small; they are documentation and smoke-checks rather than full tests.
- Use the library's public API only and avoid importing internal modules.

---
