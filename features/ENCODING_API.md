# ENCODING_API

Description

This feature specifies the library public API and the export contract for src/lib/main.js. The library must expose the following named functions and behaviors:

- encode(name, data: Uint8Array) -> string
- decode(name, input: string) -> Uint8Array
- registerEncoding(name, charset: string) -> void
- listEncodings() -> Array of metadata objects
- encodeUUID(uuidString, encodingName) -> string (shorthand: strip dashes, encode the 16 bytes, reverse result)
- decodeUUID(encodedString, encodingName) -> string (inverse: reverse, decode to bytes, format canonical UUID)

Behavior

- All encode/decode functions operate on Uint8Array for binary input and must preserve round-trip correctness for arbitrary inputs and all encodings.
- registerEncoding validates charsets (printable ASCII, unique characters, length >= 2) and computes bitsPerChar as log2(charsetSize).
- listEncodings returns objects with fields: name, charsetSize, bitsPerChar (numeric, two decimals), and charsetPreview (first up to 12 chars).

Acceptance Criteria

- Public named exports exist in src/lib/main.js: encode, decode, registerEncoding, listEncodings, encodeUUID, decodeUUID.
- encode/decode preserve round-trip property for edge cases: empty buffer, single byte, all-zero buffer, all 0xFF buffer.
- registerEncoding enforces validation rules and listEncodings exposes the registered encodings with correct metadata.
- Unit tests assert API signatures, types, and behavior described above.