# UUID_SHORTCUT

Overview

Implement the UUID shorthand helpers: strip dashes from a UUID string, parse the 16-byte hex, encode the bytes with a chosen encoding, and reverse the encoded string as the canonical short form. Provide the inverse decodeUUID.

Acceptance criteria

- encodeUUID(uuidString, encoding) accepts canonical UUID string with dashes, strips dashes, encodes the 16 bytes, reverses the encoded string, and returns the result.
- decodeUUID(encodedString, encoding) reverses the input, decodes to 16 bytes, and returns the canonical dashed UUID string.
- Unit tests in tests/unit/uuid_shortcut.test.js include test vectors: a known v7 UUID, all zeros, all-0xFF; round-trip property holds.

Implementation notes

- Ensure strict validation of UUID input format and clear errors on malformed input.
- Document the reversal step so users understand deterministic behavior and how to implement interoperably.
