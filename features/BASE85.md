# BASE85

Overview

Provide a base85 encoder/decoder (Z85 or Ascii85 variant) offering higher density (~6.41 bits/char). Choose a deterministic variant and document which is used.

Acceptance criteria

- Expose base85 as a named encoding in the public API (name "base85").
- encode/decode round-trip for arbitrary inputs including edge cases.
- A v7 UUID encoded with base85 matches the expected 20 character length for the chosen variant.
- Unit tests at tests/unit/base85.test.js validate round-trip and UUID length.

Implementation notes

- Pick one well-documented base85 variant (recommend Z85 for clarity) and cite source in SOURCES.md.
- No control characters; charset must be printable.
