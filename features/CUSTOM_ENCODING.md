# CUSTOM_ENCODING

Description

Allow callers to create custom encodings from a supplied charset string. The createEncoding API must validate and normalise the charset: remove duplicates, reject or omit ambiguous characters (0 O 1 l I) by default, and ensure the charset length is at least 2.

Acceptance Criteria

- [ ] createEncoding registers a new encoding under the supplied name and returns its metadata.
- [ ] Duplicate characters are removed and charset length is validated to be >= 2.
- [ ] Ambiguous characters are omitted by default; an explicit option allows preserving them with a documented warning.
- [ ] Custom encodings exhibit round-trip decode(encode(bytes)) == bytes in unit tests.
- [ ] listEncodings includes metadata for created custom encodings.

Notes

- Charset input scope: printable ASCII U+0021..U+007E excluding space by default. Document any deviations.
