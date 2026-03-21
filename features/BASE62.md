# BASE62

Purpose

Implement the base62 encoding as a built-in encoding. This file records the canonical charset, expected density, and deterministic fixed-length behaviour for UUIDs.

# ACCEPTANCE CRITERIA

- Provide a built-in encoding named base62 using the charset ordered as digits then lowercase then uppercase (0-9 a-z A-Z).
- The encoding metadata must advertise bitsPerChar approximately 5.9542 and charsetLength 62.
- encode and decode must accept and return Uint8Array inputs and must round-trip arbitrary binary input including empty, single-byte, all-zero and all-0xFF buffers.
- For a 16-byte UUID input the library must be able to produce a fixed-length base62 output of exactly 22 characters using a fixed-length option or deterministic left-padding so that decoding can reconstruct leading zeros.
- listEncodings must include base62 with correct metadata.

# IMPLEMENTATION NOTES

- Recommended implementation uses a BigInt conversion for UUID-sized inputs. Provide an option to left-pad encoded output to computed fixed length to guarantee deterministic decoding.