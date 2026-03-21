# BASE62

Overview

Provide a base62 encoder and decoder using the charset 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ. This encoding is URL-safe and serves as a baseline higher-than-hex density encoding.

Acceptance criteria

- Expose base62 encoding via the public API (named export or registered encoding named "base62").
- encode(Uint8Array) then decode(...) round-trips exactly for arbitrary inputs including edge cases: empty, single byte, all-zero, all-0xFF.
- A v7 UUID encoded with base62 produces 22 characters for the canonical UUID test vector.
- Unit tests live at tests/unit/base62.test.js and assert round-trip and expected UUID length.

Implementation notes

- Charset size 62, bits per char ~5.95. Implement canonical padding-free behavior and avoid control characters.
- Update README comparison table with base62 row.
