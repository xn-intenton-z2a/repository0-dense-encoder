UUID7

NORMALISED EXTRACT

TABLE OF CONTENTS
1. UUID binary layout (16 bytes)
2. v7 concept (timestamp-ordered UUID)
3. Shorthand encoding rules for this project
4. Byte-order and formatting rules

DETAILED INFORMATION

UUID binary layout:
- UUIDs are 16 octets (128 bits); canonical textual form is 32 hex digits displayed in five groups separated by hyphens: 8-4-4-4-12.
- For binary encoding/decoding use network byte order for the octet sequence derived from the hex pairs (hex pair -> single byte in natural left-to-right order).

UUID v7 (timestamp-ordered):
- v7 is an evolving format placing a Unix timestamp (typically milliseconds since epoch) in the most significant bits followed by randomness; implementations vary in the exact bit partitioning for timestamp vs randomness.
- For this library the important invariant is to treat UUIDs as 16-byte opaque binary sequences when encoding/decoding; do not attempt to reinterpret fields unless explicitly implementing v7 features.

Shorthand encoding used by mission (explicit recipe):
1) Accept canonical UUID string with or without dashes. Normalize to lowercase hex and remove hyphens to obtain 32 hex characters.
2) Convert each hex pair to a byte in order to produce a 16-byte Uint8Array (byte 0 = hex[0..1]).
3) Reverse the byte array (bytes.reverse()) per mission shorthand instruction.
4) Pass the reversed 16-byte buffer to the chosen encoding (e.g., Z85, base91, base62) to obtain concise printable representation.
5) To decode shorthand: decode into bytes using chosen encoding, reverse bytes back, convert to canonical dashed hex string grouping 8-4-4-4-12 and lowercase.

Byte-order and rounding rules:
- Always use big-endian for conversions from byte arrays to integers for encoders that treat multi-byte blocks (Z85/Ascii85 operate on big-endian 32-bit words).
- Preserve exact 16-byte binary content across round trips.

REFERENCE DETAILS (API signatures)

uuidToBytes(uuidString: string): Uint8Array
bytesToUuid(bytes: Uint8Array): string  // returns dashed canonical hex
shorthandEncodeUuid(uuidString: string, encoding: { encode(bytes: Uint8Array): string }): string
shorthandDecodeUuid(encoded: string, encoding: { decode(str: string): Uint8Array }): string

DIGEST
Sources: RFC 4122 (UUID), and uuid7 project implementations (https://github.com/uuid6/uuid7). Retrieved: 2026-03-21. Crawled GitHub listing ~304 KB.
Key extracted implementable points: treat UUIDs as 16-octet binary sequences; mission shorthand: strip dashes -> bytes -> reverse -> encode; preserve byte-by-byte identity for round-trip.

ATTRIBUTION
URLs:
- RFC 4122: https://datatracker.ietf.org/doc/html/rfc4122
- UUIDv7 project: https://github.com/uuid6/uuid7
Data size: GitHub page ~304 KB
