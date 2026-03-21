ASCII85

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Output alphabet and offset
2. Bits per char and block mapping
3. Encoding algorithm and special-case shorthand
4. Padding and partial-block handling
5. Variants and compatibility notes

DETAILED INFORMATION

Alphabet and mapping:
- Canonical Ascii85 maps digit value d (0..84) to character code 33 + d (ASCII '!'-'u').
- Many variants exist; Adobe Ascii85 uses '<~' and '~>' wrappers and supports 'z' shorthand for a 4-byte zero block.

Bits per character: log2(85) = 6.409394 (same base as Z85 but different alphabet and variant rules).
Block mapping: 4 input bytes (32-bit BE integer V) -> 5 output chars where each char is (V / 85^(4-k)) % 85 plus offset 33.

Encoding algorithm (exact steps):
- For each 4-byte chunk (pad final chunk with zeros for calculation):
  1) Construct V = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3
  2) For i from 4 downto 0: digit[i] = V % 85; V = Math.floor(V / 85)
  3) Map digit[i] to char code 33 + digit[i]
- Adobe shorthand: if original 4 bytes are all zero, encode as single 'z' (only in Adobe variant; not in all variants).

Padding/partial-block handling:
- For final partial block of N bytes (N < 4): pad with zeros to form V, produce 5 output chars, then output only the first N+1 characters of that 5-char block (Adobe and other variants vary; consult chosen variant for exact final-character trimming rules).

Variants and compatibility:
- Ensure your encode/decode pair uses the same variant. For mission purposes, support a generic Ascii85 and Adobe variant toggle.

REFERENCE DETAILS (API signatures)

encodeAscii85(bytes: Uint8Array, options?: { variant?: 'adobe'|'generic', useZ?: boolean }): string
decodeAscii85(str: string, options?: { variant?: 'adobe'|'generic' }): Uint8Array

Behavior:
- variant='adobe' accepts/produces '<~' '~>' wrappers and interprets 'z' shorthand.
- variant='generic' uses simple 5-char-per-4-byte encoding without 'z' shorthand.

DIGEST
Source: https://en.wikipedia.org/wiki/Ascii85
Retrieved: 2026-03-21
Crawled data size: ~110.3 KB
Key extracted implementable points: mapping offset +33, 4->5 mapping, 'z' shorthand in Adobe variant, padding rules for final partial block.

ATTRIBUTION
URL: https://en.wikipedia.org/wiki/Ascii85
Data size: ~110.3 KB
