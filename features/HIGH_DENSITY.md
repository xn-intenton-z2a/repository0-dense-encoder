# HIGH_DENSITY

Overview

Implement a high-density encoding using printable ASCII characters U+0021..U+007E excluding space and visually ambiguous characters (0/O, 1/l/I). The goal is to beat base64 for a UUID (produce <22 chars).

Acceptance criteria

- Provide a named encoding conceptually called "high_density" (or configurable name) created from a charset string.
- For a canonical v7 UUID test vector the encoded length is strictly less than 22 characters.
- encode/decode round-trip for all edge case buffers.
- Unit tests at tests/unit/high_density.test.js assert length comparison against base64 and round-trip correctness.

Implementation notes

- Compute bits per char using log2(charsetSize) to present precise metrics in metadata.
- Validate charset excludes control and ambiguous characters.
