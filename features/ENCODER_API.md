# ENCODER_API

Overview

Define the public API surface exported from src/lib/main.js. All public functions must be named exports and accept/return the types specified in the mission.

Public API

- createEncoding(name, charset): register a new encoding by name using the provided charset string. Returns an encoding descriptor.
- encode(nameOrDescriptor, data: Uint8Array): returns encoded string for the given encoding.
- decode(nameOrDescriptor, string): returns Uint8Array for the given encoding.
- listEncodings(): returns an array of metadata objects for each encoding: { name, charsetSize, bitsPerChar, uuidLength }.
- encodeUUID(uuidString, encoding): shorthand that strips dashes, converts hex to 16 bytes, encodes, and reverses the encoded string as the canonical output.
- decodeUUID(encodedString, encoding): inverse of encodeUUID, returning canonical UUID string with dashes.

Acceptance criteria

- All above items are exported as named exports from src/lib/main.js.
- Functions accept and return the correct types; encode/decode only accept Uint8Array for binary inputs.
- API is covered by unit tests in tests/unit/api.test.js that verify behavior and error handling for invalid inputs.

Implementation notes

- Implement a small registry internally for named encodings to support createEncoding and listEncodings.
- Ensure deterministic ordering for listEncodings to make tests stable.
