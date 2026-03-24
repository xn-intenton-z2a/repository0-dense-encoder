# ENCODING_METADATA

Overview

Ensure the library exposes a consistent encoding metadata API so callers can list available encodings and their density characteristics programmatically.

Goals

- Provide a listEncodings function (or ensure existing function does this) that returns metadata objects for each encoding.
- Metadata should enable UI and README generation without executing an encode on sample data.

Acceptance Criteria

- listEncodings returns an array of objects with at minimum these fields: name (string), bitsPerChar (number), charsetSize (integer), urlSafe (boolean), and charsetPreview (string or short sample).
- Unit tests assert that base62, base85 and base91 appear in the list with expected charset sizes and bitsPerChar within a small tolerance of the documented values.
- The README comparison table is derivable from this metadata.

Implementation Notes

- Keep bitsPerChar calculated from charsetSize using log2(charsetSize) and rounded to two decimal places for display.
- Add tests in tests/unit/metadata.test.js to assert contents and shapes.

---
