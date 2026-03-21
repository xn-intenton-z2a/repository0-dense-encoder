# UUID_SHORTHAND

Description

Provide a UUID shorthand API that accepts a UUID string (with or without dashes), strips dashes, interprets the 32 hex characters as 16 bytes, encodes the bytes with a named encoding, and returns the encoded value reversed. The inverse operation reverses the encoded input, decodes to bytes, and returns the canonical dashed UUID string.

Behavior

- encodeUUID(uuidString, encodingName) accepts canonical or compact UUID strings, validates length and hex digits, produces the reversed encoded result.
- decodeUUID(encodedString, encodingName) reverses the string, decodes to bytes, validates length, and returns the canonical dashed lowercase UUID string.

Acceptance Criteria

- encodeUUID and decodeUUID are inverses for a range of test UUIDs (v7 and other valid 128-bit UUIDs).
- encodeUUID accepts inputs with or without dashes and rejects invalid hex strings.
- Unit tests verify that for each built-in encoding, a sample UUID round-trips and that the densest encoding returns fewer than 22 characters.