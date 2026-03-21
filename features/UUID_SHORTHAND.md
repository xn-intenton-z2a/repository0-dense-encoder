# UUID_SHORTHAND

Description

Provide convenience helpers encodeUUID(uuidString, encodingName) and decodeUUID(encoded, encodingName). The shorthand must: strip dash characters from the UUID input, parse the 16 bytes, encode those bytes with the named encoding, and reverse the encoded string to produce the compact representation. decodeUUID must reverse those steps and return a canonical dashed lowercase UUID string.

Acceptance Criteria

- [ ] encodeUUID accepts UUID input with or without dashes and returns a short encoded string for the chosen encoding.
- [ ] decodeUUID reverses encodeUUID and returns the canonical dashed lowercase UUID string.
- [ ] Round-trip: decodeUUID(encodeUUID(uuid, encoding)) equals the canonical UUID for many test vectors.
- [ ] Tests assert that the densest encoding produces fewer than 22 characters for a v7 UUID.
- [ ] Malformed UUID inputs are rejected with clear, documented errors.

Notes

- Define canonical output (lowercase hex with dashes) in tests and documentation.
