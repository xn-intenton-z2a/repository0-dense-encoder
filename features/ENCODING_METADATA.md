# ENCODING_METADATA

Overview

Ensure encodings expose consistent metadata so README, UI, and tests can derive density numbers without encoding sample data.

Goals

- listEncodings() returns structured metadata for each registered encoding so UIs and docs can compute densities and render comparison tables.

Acceptance Criteria

- listEncodings returns an array of objects with fields:
  - name: string
  - bitsPerChar: number (rounded to two decimal places for display)
  - charsetSize: integer
  - urlSafe: boolean
  - charsetPreview: string (first 6 characters or an abbreviated sample)
- bitsPerChar is computed from charsetSize as log2(charsetSize) and rounded to two decimal places for presentation; tests may accept a small numeric tolerance (±0.01).
- Unit tests (tests/unit/metadata.test.js) assert that base62, base85, and base91 appear with expected charset sizes and that bitsPerChar is in the expected range.

Implementation Notes

- Keep listEncodings fast and side-effect free; derive display values rather than mutating registry entries.

---
