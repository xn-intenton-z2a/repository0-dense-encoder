BINARY-TO-TEXT

TABLE OF CONTENTS:
- Purpose and trade-offs
- Bits-per-character formula
- Length calculation formulas
- Block encoding patterns (3->4 base64, 4->5 base85, etc.)
- Implementation patterns (bitstream vs big-int)
- Best practices for custom charsets

NORMALISED EXTRACT:
Purpose:
Binary-to-text encodings map arbitrary binary data (byte sequences) to printable character strings using a finite alphabet to ease transmission and storage.

Bits-per-character:
- bits_per_char = log2(alphabet_size)
- For an alphabet of size B, each character encodes floor(log2(B)) bits of entropy; effective density is log2(B) bits/char.

Length calculation:
- Estimated encoded length = ceil((8 * input_length_bytes) / bits_per_char)
- For block-based encodings with exact grouping, use exact formulas:
  - Base64: groups of 3 bytes (24 bits) -> 4 characters (4*6=24) => 4 * ceil(input_len / 3)
  - Base85 (Ascii85/Z85): groups of 4 bytes (32 bits) -> 5 chars (5*~6.4 bits) => 5 * ceil(input_len / 4)

Encoding strategies:
- Bitstream method: accumulate bits from input bytes into an integer buffer, read off chunks of k = floor(log2(B)) or variable k bits to map to characters; handle leftover bits and padding explicitly.
- Big-integer method: interpret entire input as a big-endian integer and perform repeated division by B to obtain encoded digits (used for base58, base91).

Custom charsets:
- Prefer printable ASCII range U+0021..U+007E excluding space for maximal printable density.
- Omit visually ambiguous characters (0/O, 1/l/I) when human-reading is expected; this reduces alphabet size and affects density calculation.

Round-trip:
- Implementations must ensure decode(encode(bytes)) equals original bytes for all inputs including empty and special patterns.

SUPPLEMENTARY DETAILS:
- Choose algorithm based on alphabet size and performance requirements: bitstream is faster for power-of-two-friendly alphabets (base64, base32); big-integer method is required for non-power-of-two alphabets (base58, base91).
- When building custom encodings using full printable ASCII (~94 characters), practical alphabet size = 94 - omitted_ambiguous_count.

REFERENCE DETAILS:
Common signatures:
- encode(bytes: Uint8Array, alphabet: string): string
- decode(str: string, alphabet: string): Uint8Array
Implementation checklist:
- Validate alphabet length and uniqueness.
- Provide deterministic mapping and canonical case handling.

DIGEST:
- Source: https://en.wikipedia.org/wiki/Binary-to-text_encoding
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 123730

ATTRIBUTION:
Wikipedia: Binary-to-text encoding
