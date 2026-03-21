BASE85 — Z85 / Ascii85 (dense 85-base encodings)

Table of contents
- Overview: 85-base encodings and goals
- Z85 formal specification (alphabet and mapping)
- Encoding algorithm (4 bytes -> 5 chars)
- Decoding algorithm (5 chars -> 4 bytes)
- Padding and frame size constraints
- Implementation notes and API signatures
- Use for UUIDs (length calculation)
- Supplementary details
- Detailed digest and retrieval
- Attribution and crawl size

Normalised extract (direct technical details)
Overview
- Base-85 encodings convert 4 octets (32 bits) into 5 printable characters (5 * log2(85) ~= 32). This yields ~6.41 bits per character for Z85.
- Z85 is a variant optimized for source-code and textual safety; Ascii85 is older and has different character mappings and escape rules.

Z85 formal specification (exact mapping values 0..84 -> characters)
- The Z85 mapping for values 0..84 (in order) is:
  0..9  : 0 1 2 3 4 5 6 7 8 9
 10..19 : a b c d e f g h i j
 20..29 : k l m n o p q r s t
 30..39 : u v w x y z A B C D
 40..49 : E F G H I J K L M N
 50..59 : O P Q R S T U V W X
 60..69 : Y Z . - : + = ^ ! /
 70..79 : * ? & < > ( ) [ ] {
 80..84 : } @ % $ #
Note: this ordering is taken verbatim from the Z85 specification; the mapping table is the authoritative lookup for encode/decode.

Encoding algorithm (precise)
- Precondition: binary frame length MUST be divisible by 4. Applications must pad input to a multiple of 4 bytes before encoding or encode partial frames using application-level padding.
- For each 4-byte chunk (b0,b1,b2,b3):
  1. Construct 32-bit unsigned integer value = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3 (big-endian network order).
  2. For i from 4 down to 0 compute digit_i = floor(value / 85^i) mod 85 and map digit_i to the Z85 character table above.
  3. Output characters from most significant digit to least (i.e., digit_4 then digit_3 ... digit_0) producing 5 characters.

Decoding algorithm (precise)
- Precondition: encoded string length MUST be divisible by 5.
- For each 5-character group c0..c4:
  1. Map each character cN to its numeric value vN using the Z85 lookup table (0..84).
  2. Accumulate value = (((v0 * 85) + v1) * 85 + v2) * 85 + v3) * 85 + v4.
  3. Extract bytes: b0 = (value >> 24) & 0xFF, b1 = (value >> 16) & 0xFF, b2 = (value >> 8) & 0xFF, b3 = value & 0xFF.
  4. Append b0..b3 to output buffer.

Padding and frame size constraints
- Z85 does not define an internal padding character; the application MUST ensure frames are padded to 4 bytes or use an external mechanism to convey original length.
- For a UUID (16 bytes): encoded length = (16 / 4) * 5 = 20 characters.

Implementation notes and API signatures
- encodeZ85(input: Uint8Array) -> string
  - Throws if input.length % 4 !== 0; callers should pad using application-specific policy.
- decodeZ85(text: string) -> Uint8Array
  - Throws if text.length % 5 !== 0; callers must supply properly framed input.
- Use a 256-entry decode map to map ASCII code -> value for O(1) decoding per character.
- Use integer arithmetic (32-bit unsigned) to avoid floating point rounding errors.

Use for UUIDs
- Z85 encodes 16 bytes to 20 characters; this is denser than base64 no-padding (22 chars) and base62 (22+ chars typically).

Supplementary details
- Z85 chooses printable characters safe for inclusion in source code and shells; check the mapping for characters that may need escaping in specific contexts.
- Ascii85 differs in the chosen symbol range and historically supports special sequences for runs of zeros; Z85 intentionally avoids special-case sequences to be simpler and more predictable.

Detailed digest
- Source: Z85 specification (ZeroMQ spec 32/Z85)
- Retrieved: 2026-03-21
- Crawl size: small HTML (Z85 spec page) and full text previously fetched; measured download returned a small content (redirect/summary) in a size probe; authoritative mapping extracted from the spec content.
- Extracted: exact Z85 mapping table, encoding/decoding integer arithmetic, frame size constraints.

Attribution
- Source URL: https://rfc.zeromq.org/spec:32/Z85/
- Date retrieved: 2026-03-21
- Bytes downloaded (measured): 28 (note: main spec content also available as full HTML; use canonical spec URL for authoritative mapping)
