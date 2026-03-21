UUID

TABLE OF CONTENTS:
- Canonical string format
- Byte layout (16 bytes)
- Parsing algorithm (hex -> Uint8Array)
- UUID shorthand for encoding (strip hyphens -> encode -> reverse)
- Round-trip and validation notes

NORMALISED EXTRACT:
Canonical representation: 32 hexadecimal digits arranged as 8-4-4-4-12 with hyphens, example: 123e4567-e89b-12d3-a456-426614174000.
To obtain the 16-octet binary form from the canonical string: remove all hyphens to produce a 32-character hex string; verify length == 32; for i from 0 to 15 parse the two hex characters at positions 2*i and 2*i+1 into an integer 0..255 and set bytes[i] = that value. The resulting Uint8Array is the canonical 16-byte UUID.
Byte layout summary (RFC 4122):
- bytes 0..3: time_low (32 bits)
- bytes 4..5: time_mid (16 bits)
- bytes 6..7: time_hi_and_version (16 bits)
- byte 8: clock_seq_hi_and_reserved
- byte 9: clock_seq_low
- bytes 10..15: node (48 bits)
All multi-octet fields use network byte order in the canonical binary form; therefore parse hex pairs left-to-right to produce bytes[0]..bytes[15].

SHORTHAND UUID ENCODING (mission-specific):
1. Remove hyphens from canonical UUID string.
2. Parse the 32 hex characters into a 16-byte Uint8Array.
3. Encode the 16 bytes using the chosen binary-to-text encoding (encode(Uint8Array) -> string).
4. Reverse the encoded string to produce the library's UUID shorthand representation (reverse step is part of the mission shorthand).
Decoding is the inverse: reverse the encoded string, decode to 16 bytes, convert each byte to two lowercase hex digits, then insert hyphens at positions 8,12,16 and 20 to restore the canonical UUID string.

SUPPLEMENTARY DETAILS:
- Validate the input canonical string strictly: correct hyphen positions and only hex characters (0-9a-fA-F). Reject or normalise uppercase hex as lowercase during parsing.
- Version check: the 4 most significant bits of byte 6 (bytes[6] >> 4) indicate the UUID version (1..5, or 7 for v7), if version validation is required check these bits after parsing.
- Endianness caution: do not reorder bytes for platform-specific structures; prefer parsing hex pairs for deterministic behavior.

REFERENCE DETAILS (implementable signatures):
- encodeUUID(uuidString: string, encodingName: string): string
  - Input: canonical UUID string (8-4-4-4-12).
  - Output: encoded shorthand string (the mission requires reversing the encoded output as final step).
  - Implementation outline: remove hyphens -> parse to Uint8Array(16) -> encoded = encode(bytes, encodingName) -> return reverse(encoded).

- decodeUUID(encodedString: string, encodingName: string): string
  - Input: encoded shorthand string produced by encodeUUID.
  - Output: canonical UUID string.
  - Implementation outline: rev = reverse(encodedString) -> bytes = decode(rev, encodingName) -> hex32 = concat for each byte: hexPad(bytes[i]) -> insert hyphens at 8,12,16,20 -> return canonical string.

DIGEST:
- Source: https://www.rfc-editor.org/rfc/rfc4122.html
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 81507

ATTRIBUTION:
RFC 4122 (P. Leach et al.)
