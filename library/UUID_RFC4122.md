UUID_RFC4122

NORMALISED EXTRACT

Canonical textual form: 36 characters using lower- or upper-case hexadecimal, grouped 8-4-4-4-12 with hyphen separators (example: 123e4567-e89b-12d3-a456-426655440000).

Parse procedure to bytes (implementation-grade):
- Remove hyphen characters; resulting string must be exactly 32 hexadecimal characters (0-9, a-f, A-F).
- For i from 0 to 15: byte[i] = parseInt(hexString[2*i : 2*i+2], 16).
- Output is a 16-byte Uint8Array in the textual (network) byte order: the bytes appear in the same order as the hex pairs.

UUID field layout (canonical groups -> bytes):
- time_low: 4 bytes (hex digits 0..7)
- time_mid: 2 bytes (hex digits 8..11)
- time_hi_and_version: 2 bytes (hex digits 12..15)
- clock_seq_hi_and_reserved + clock_seq_low: 2 bytes (hex digits 16..19)
- node: 6 bytes (hex digits 20..31)

SHORTHAND FOR LIBRARY (exact steps)
- Input: UUID string (with or without dashes).
- Step 1: canonicalHex = uuidString.replace(/-/g, '').toLowerCase(); validate length===32 and chars are hex.
- Step 2: bytes = hexPairs -> Uint8Array(16) as described above.
- Step 3: encoded = encodeNamed(encodingName, bytes)  // use encoding implementation from library
- Step 4: shorthand = reverseString(encoded)  // mission shorthand: reverse the encoded string when producing the short UUID form

SUPPLEMENTARY DETAILS
- Allowed hex characters: 0-9 A-F a-f. Accept both cases but normalise to lower-case when validating.
- Input validation: reject any string that does not reduce to 32 hex digits.
- When converting bytes back to UUID string, insert hyphens at positions 8, 12, 16, 20 (counting from 0) to produce 8-4-4-4-12 grouping.

REFERENCE DETAILS (API signatures and patterns)
- uuidStringToBytes(uuid: string): Uint8Array
  - Parameters: uuid (string) — canonical or dashed UUID text
  - Returns: Uint8Array length 16
  - Behavior: throws on invalid format

- bytesToUuidString(bytes: Uint8Array): string
  - Parameters: bytes (Uint8Array) length 16
  - Returns: canonical dashed lowercase UUID string (8-4-4-4-12)

- shorthandUuidEncode(uuid: string, encodingName: string): string
  - Steps: bytes = uuidStringToBytes(uuid); s = encodeNamed(encodingName, bytes); return reverseString(s);

IMPLEMENTATION PATTERNS
- For hex parsing use a single-pass loop converting two characters at a time to a byte (avoid intermediate BigInt for speed).
- Avoid locale-sensitive operations when mapping hex characters; use explicit table or parseInt with radix 16.
- Validate lengths strictly to guarantee round-trip.

DETAILED DIGEST
- Source: RFC 4122 (UUID), retrieved 2026-03-23
- Extracted technical points: canonical textual format (8-4-4-4-12), mapping of groups to bytes, parsing algorithm from hex to 16 bytes.
- Source bytes retrieved during crawl: 59319 bytes

ATTRIBUTION
- Source: RFC 4122, Network Working Group (IETF). Content used to extract canonical formats and byte layout.
