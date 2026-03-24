# README_COMPARISON

Overview

Add a clear, reproducible UUID encoding comparison table to README.md that demonstrates encoded lengths and charset characteristics for each built-in encoding and a representative densest custom encoding.

Goals

- Make it straightforward for maintainers and users to compare encoding density and chosen charsets.
- Show a canonical UUID sample and the measured encoded lengths for each encoding.

Acceptance Criteria

- README.md contains a comparison table with columns: Encoding, Charset (description), BitsPerChar, CharsetSize, UUIDLength (16-byte UUID length), and Notes.
- Table includes entries for: hex (baseline 32), base64 (no padding, baseline 22), base62, base85, base91, and a representative densest custom encoding.
- The README includes the canonical UUID sample used for measurements and a brief note describing how lengths were measured (no padding, URL-safe where applicable).

Implementation Notes

- Add the table under a Usage or Comparison section in README.md.
- Use a deterministic UUID fixture for the sample (hex bytes explicitly written) so results are reproducible.

---
