NORMALISED EXTRACT

Table of contents
- Unicode/ASCII codepoint range
- Printable characters list (U+0021..U+007E excluding space)
- Charset size and bits/char calculation
- Rules for excluding ambiguous characters
- Creating custom encodings from a charset string (API)

Unicode / ASCII printable range
- Printable ASCII code points: U+0021 (!) through U+007E (~) inclusive.
- Decimal range: 33 through 126 inclusive.
- Total characters in this range: 94.

Printable characters (continuous string)
- !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~

Charset size and bits/char
- If a charset uses all printable ASCII (33..126) except space, charset size = 94.
- Bits per character = log2(charset_size). Example: for size 94, bits/char = log2(94) ≈ 6.5546.

Rules for excluding ambiguous characters (project requirement)
- Remove visually ambiguous characters to improve human readability. Common ambiguous characters to exclude:
  - '0' (digit zero) and 'O' (capital o)
  - '1' (digit one), 'l' (lowercase L), and 'I' (capital i)
- After exclusions, recompute charset_size and bits/char; ensure charset contains only unique printable characters.

API: creating a custom encoding from a charset string (exact signatures)
- createEncoding(name: string, charset: string): Encoding
  - name: short identifier for the encoding
  - charset: string containing unique characters in the order to be used as digits (no duplicates)
  - returns: Encoding object with properties:
    - name: string
    - charset: string
    - radix: number (charset.length)
    - bitsPerChar: number (Math.log2(radix))
    - encode(data: Uint8Array): string
    - decode(s: string): Uint8Array
- Validation rules for createEncoding:
  - charset must be at least 2 characters long and contain only printable characters (U+0021..U+007E) unless explicitly permitted.
  - charset must contain unique characters (no duplicates). On duplicate or invalid characters, throw an error.

Implementation notes
- For arbitrary radix, use a big-integer or divide-by-radix algorithm (treat input bytes as base-256 big-endian digits and repeatedly divide by radix to collect remainders), or use bit-accumulator methods for radices that are powers-of-two or close to them.
- Beware of floating-point rounding; use integer arithmetic for determinism.

DETAILED DIGEST
- Source: https://en.wikipedia.org/wiki/ASCII#Printable_characters
- Retrieved: 2026-03-25
- Data obtained during crawl: ~438448 bytes (HTML)

ATTRIBUTION
- Wikipedia — ASCII printable characters reference
- Data size fetched: ~438448 bytes
