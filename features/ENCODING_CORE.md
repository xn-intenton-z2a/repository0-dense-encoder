# ENCODING_CORE

Purpose

Provide the central encoding registry and public API used by the library. This feature defines the named exports, the contract for encoding objects, and the behavior guarantees required by the mission.

# ACCEPTANCE CRITERIA

- Expose named exports from src/lib/main.js: encode, decode, createEncodingFromCharset, listEncodings, registerEncoding, uuidToBytes, bytesToUuid, shorthandEncodeUuid, shorthandDecodeUuid.
- encode accepts a named encoding or encoding object and a Uint8Array and returns a printable string. decode accepts a string and returns a Uint8Array.
- createEncodingFromCharset accepts a charset string and returns an encoding object with encode, decode and metadata fields name, bitsPerChar, charsetLength.
- listEncodings returns an array of metadata objects where each object contains name, bitsPerChar, and charsetLength.
- Round-trip guarantee: for every registered encoding E and for arbitrary inputs B including edge cases (empty buffer, single-byte, all-zero, all-0xFF), decode(encode(B)) equals B byte-for-byte.
- Unit tests validate the presence and runtime types of the named exports and the round-trip property for a representative set of inputs.

# IMPLEMENTATION NOTES

- Use BigInt-based algorithms for non-power-of-two alphabets for correctness and simplicity on UUID-sized inputs.
- Use encoding objects that carry both metadata and pure encode/decode methods so they can be exported and listed without side effects.