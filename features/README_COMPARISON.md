# README_COMPARISON

Overview

Keep the README comparison table accurate and reproducible by deriving numbers from listEncodings results and a deterministic UUID fixture.

Goals

- Ensure README.md contains a comparison table that lists Encoding, Charset size, Bits/char, and UUIDLength for the canonical UUID.
- Provide a short note describing how the numbers were measured (no padding, URL-safe variants when applicable).

Acceptance Criteria

- README.md contains a comparison table with entries for: hex, base64 (no padding), base62, base85, base91, and ascii94 (or the chosen densest encoding).
- The table values are derivable from listEncodings and the canonical fixture 00112233-4455-6677-8899-aabbccddeeff; documentation describes measurement method.
- If the README table is out of date, a small script or maintainer action is documented for how to refresh it from metadata.

Status

Implemented: table present in README.md; keep this feature as a maintenance task to ensure the table is refreshed when encodings change.

---
