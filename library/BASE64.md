BASE64

TABLE OF CONTENTS:
- Alphabet and charset size
- Bits per character
- Encoding algorithm (3-byte -> 4-char block)
- Padding rules and unpadded variants
- URL-safe variant (base64url)
- Implementation notes and JavaScript APIs

NORMALISED EXTRACT:
Alphabet (standard): A-Z a-z 0-9 + /
Alphabet string: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
Charset size: 64 (bits per char = log2(64) = 6.0 bits/char)
Encoding algorithm (precise):
- Take input bytes in groups of 3 (24 bits total).
- Split the 24 bits into four 6-bit values v0..v3 where v0 is the most significant 6 bits.
- Map each 6-bit value to a character via the alphabet string.
- If input length is not a multiple of 3, the final block is padded with zero bits; output uses '=' padding characters to make the final encoded length a multiple of 4.
Length calculation:
- Standard padded length = 4 * ceil(input_length_bytes / 3)
- Unpadded length (if padding removed) = ceil((8 * input_length_bytes) / 6)
URL-safe variant (base64url): replace '+' -> '-' and '/' -> '_' and optionally omit padding '='. Many transport protocols prefer the url-safe alphabet.

SUPPLEMENTARY DETAILS:
- JavaScript (Node): encode: Buffer.from(uint8array).toString('base64'); decode: Buffer.from(base64String, 'base64') -> Buffer (convert to Uint8Array).
- Browser: btoa/atob operate on binary strings; for Uint8Array conversion use TextEncoder-like helpers or typed array to string converters.
- Avoid embedding raw base64 in contexts with whitespace sensitivity unless using standard padding; when removing padding, consumers must know the variant and restore padding length during decode.

REFERENCE DETAILS (API signatures and behaviour):
- encode(bytes: Uint8Array): string
  - Deterministic mapping; returns padded base64 string by default.
- decode(str: string): Uint8Array
  - Accepts padded or unpadded variants if implementation adds missing '=' before decoding; rejects invalid characters not in allowed alphabet (standard or url-safe).

DIGEST:
- Source: https://en.wikipedia.org/wiki/Base64
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 186366

ATTRIBUTION:
Wikipedia: Base64
