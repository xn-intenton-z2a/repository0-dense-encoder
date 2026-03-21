BASE64

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Alphabet and variants
2. Bits per character
3. Block sizes and mapping
4. Encoding algorithm (bit-level)
5. Padding rules and URL-safe variant
6. Length formulas and edge cases

DETAILED INFORMATION

Alphabet (RFC 4648, canonical):
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/

URL-safe alphabet (base64url):
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_  (when url option is set)

Bits per character: 6 bits/char.
Block size: 3 input bytes (24 bits) -> 4 output characters (4*6=24).

Encoding algorithm (exact bit operations):
Given up to three input bytes b0,b1,b2 (absent bytes treated as zero for the final partial block):
  i0 = (b0 >> 2) & 0x3F
  i1 = ((b0 & 0x03) << 4) | ((b1 >> 4) & 0x0F)
  i2 = ((b1 & 0x0F) << 2) | ((b2 >> 6) & 0x03)
  i3 = b2 & 0x3F
Map each index iN to alphabet[iN] and append.

Padding rules (RFC behavior):
- If input length mod 3 == 1: output two base64 chars for the single byte then append '==' to reach 4-character block.
- If input length mod 3 == 2: output three base64 chars then append '='.
- When options.padding === false (commonly used for base64url) do not emit '=' padding; decoders must infer and accept missing padding.

Decoding algorithm (reverse):
- Map each base64 character to its 6-bit value (0..63).
- For every 4-character group v0..v3, reconstruct 3 bytes:
  b0 = (v0 << 2) | (v1 >> 4)
  b1 = ((v1 & 0x0F) << 4) | (v2 >> 2)
  b2 = ((v2 & 0x03) << 6) | v3
- For final partial groups, account for absent '=' padding and trim the reconstructed bytes accordingly.

Length formulas:
  encodedLen = 4 * ceil(inputLen / 3)
  decodedLen = 3 * floor(encodedLen / 4) - paddingCount

Edge cases:
- Empty input -> empty output.
- All-zero input encodes to repeated 'A' characters per rules above.
- Decoding must reject invalid characters unless options.ignoreInvalid is set.

SUPPLEMENTARY DETAILS

Streaming/Incremental encoding:
- Maintain 0-2 leftover bytes between chunks; flush at end with padding rules.
Performance:
- Pre-allocate output using encodedLen formula to avoid reallocations.
- Use lookup tables for index->char and char->index mappings.
Security:
- Validate input length and characters when decoding; avoid trusting unbounded or attacker-controlled encoded strings for memory allocation without limits.

REFERENCE DETAILS (API signatures)

encodeBase64(bytes: Uint8Array, options?: { url?: boolean, padding?: boolean, ignoreInvalid?: boolean }): string
- bytes: input binary data
- url: when true, use URL-safe alphabet ('-' and '_' instead of '+' and '/')
- padding: default true; when false omit '=' padding
- returns: encoded string

decodeBase64(str: string, options?: { url?: boolean, ignoreWhitespace?: boolean }): Uint8Array
- str: base64/base64url encoded string
- url: treat input as base64url if true
- ignoreWhitespace: when true, ignore spaces/newlines
- returns: decoded bytes as Uint8Array

Implementation patterns:
- Use integer bit operations to construct indices.
- For base64url with omitted padding, compute required padding length as (4 - (str.length % 4)) % 4 and treat missing padding as '=' when decoding.

DIGEST
Source: RFC 4648 - The Base16, Base32, and Base64 Data Encodings
Retrieved: 2026-03-21
Crawled data size: ~87.5 KB
Key extracted implementable points: 6-bit grouping, exact bit formulas for i0..i3 above, canonical alphabet and padding rules; URL-safe variant and how to decode omitted padding.

ATTRIBUTION
URL: https://datatracker.ietf.org/doc/html/rfc4648
Data size: ~87.5 KB
