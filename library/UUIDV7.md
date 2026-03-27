UUIDV7

TABLE OF CONTENTS
- Purpose and context
- Binary layout (version 7) and canonical byte order
- Shorthand encoding procedure (strip-dashes, encode, reverse)
- Round-trip encode/decode steps and validation
- Edge cases and tests to run

PURPOSE AND CONTEXT
- UUIDv7 is a time-ordered UUID variant suitable for sortable identifiers. For this library we only require canonical handling of a 16-byte UUID value (binary) and a shorthand that maps the 16 bytes into a compact printable string.

BINARY LAYOUT AND BYTE ORDER
- A UUID canonical textual form is 36 characters with dashes: 8-4-4-4-12 representing 16 bytes in hex.
- To obtain the 16 raw bytes: remove dashes from the canonical form, parse each pair of hex digits as a byte in network (big-endian) order. Result: Uint8Array length 16 representing UUID raw bytes.
- UUIDv7 details (timestamp+random) are described in the UUIDv7 spec; for encoding density the library treats the UUID as opaque 16 bytes.

SHORTHAND ENCODING PROCEDURE (explicit)
Given a UUID string uuidStr in canonical form:
1. Strip dashes: hex = uuidStr.replace(/-/g, "").toLowerCase(); // 32 hex chars
2. Validate: if hex.length !== 32 -> error
3. Parse to bytes: for i from 0 to 15: bytes[i] = parseInt(hex.substr(i*2,2), 16)
   produce Uint8Array(16)
4. Encode: encoded = encodeFn(bytes)  // choose encoder e.g., base62/base85/base91/custom
5. Reverse encoded string: shorthand = encoded.split("").reverse().join("")
   The library's shorthand format stores the encoded characters reversed to match the mission's compact representation requirement.

SHORTHAND DECODING (reverse steps)
1. Reverse shorthand string back: encoded = shorthand.split("").reverse().join("")
2. bytes = decodeFn(encoded) // returns Uint8Array(16)
3. Format hex: hex = bytes.map(b => b.toString(16).padStart(2,'0')).join("")
4. Insert dashes at positions 8,12,16,20 to produce canonical UUID string.

ROUND-TRIP GUARANTEES AND VALIDATION
- Precondition: encodeFn and decodeFn must be exact inverses for arbitrary Uint8Array inputs.
- Round-trip tests to include: empty buffer, single byte, all 0x00 (16 bytes), all 0xFF (16 bytes), random bytes, and the 16-byte UUID cases.
- For a 16-byte UUID encoded with base64 (no padding) expect 22 characters; the densest encodings should be shorter than 22 characters per mission requirement.

EDGE CASES & TESTS
- Non-canonical UUID input: allow lowercase/uppercase hex, but reject non-hex characters.
- If decodeFn returns length !== 16 on decode of encoded UUID, raise an error.

DETAILED DIGEST
Parsing and shorthand mapping method described; UUIDv7 treated as opaque 16 bytes for density comparisons. Retrieved: 2026-03-27. Crawled content size: ~303 KB (UUIDv7 repo and discussion material aggregated).

ATTRIBUTION
Source: UUIDv7 discussion/repo — https://github.com/uuid6/uuid7
