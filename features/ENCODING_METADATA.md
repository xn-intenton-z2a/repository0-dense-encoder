# ENCODING_METADATA

Overview

Ensure encodings expose consistent metadata so README, UI, and tests can derive density numbers without sampling encoded data.

Goals

- listEncodings() returns structured metadata for each registered encoding so UIs and docs can compute densities and render comparison tables.

Acceptance Criteria

- listEncodings() returns an array of objects with fields:
  - name: string
  - bitsPerChar: number (display rounded to two decimal places)
  - charsetSize: integer
  - urlSafe: boolean
  - charsetPreview: string (first 6 characters or an abbreviated sample)
- bitsPerChar is computed from charsetSize as log2(charsetSize) and is represented to two decimal places for display; tests may assert a tolerance of ±0.01.
- Unit tests in tests/unit/metadata.test.js assert that base62, base85, and base91 appear with expected charset sizes and that bitsPerChar is within expected ranges.

Implementation Notes

- listEncodings must be side-effect free and fast; derive display values rather than mutating registry entries.

Status

Done — listEncodings and metadata tests have been implemented (see closed issue #114). Keep this feature to ensure future encodings populate the metadata correctly.

---
