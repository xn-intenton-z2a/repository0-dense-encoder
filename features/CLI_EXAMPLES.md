# CLI_EXAMPLES

Overview

Provide small, dependency-free CLI examples so contributors can exercise the public API quickly without writing new code.

Goals

- Add examples/cli/ with a README and two tiny scripts demonstrating encode and decode flows using only Node 24+ ESM.
- Scripts must use the public named exports only and print deterministic output for a canonical UUID fixture.

Acceptance Criteria

- examples/cli/README.md documents the example scripts and how to run them (node file).
- examples/cli/encode-sample.mjs encodes the canonical UUID 00112233-4455-6677-8899-aabbccddeeff with each built-in encoding and prints: encoding name, encoded string, length.
- examples/cli/decode-sample.mjs demonstrates decoding an encoded value back to a UUID string and prints the round-tripped UUID.
- README at project root contains a short copy-pasteable example invoking the encode-sample script.
- Examples are deterministic and dependency-free (use only the public API: listEncodings, encodeUUID, decodeUUID).

Implementation Notes

- Keep scripts tiny (<= 100 lines) and place them under examples/cli/.
- These examples are for maintainers and new contributors to run locally; they are not required for CI, but should be runnable.

Status

Open — examples/cli/ is a requested maintenance addition and not yet present in the repository.

---
