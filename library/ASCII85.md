ASCII85

TABLE OF CONTENTS:
- Character set and mapping range
- Bits per character
- Encoding algorithm (4-byte -> 5-char block)
- Special-case rules (zero-block shortcut, delimiters)
- Padding and truncation rules
- Implementation notes and decode edge-cases

NORMALISED EXTRACT:
Character set: ASCII bytes 33 (!) through 117 (u) inclusive, providing 85 printable symbols.
Charset size: 85 (bits per char = log2(85) ≈ 6.409 bits/char)
Encoding algorithm (Adobe/Ascii85 variant):
- Take input bytes in groups of 4 (32 bits) treated as an unsigned 32-bit big-endian integer.
- Convert the 32-bit value into five base-85 digits by repeatedly dividing by 85 and taking remainders, producing five values in range 0..84 from most significant to least significant.
- Map each base-85 digit to an output character by adding 33 (digit 0 -> '!').
Special-case syntax used in some variants:
- Adobe Ascii85 uses delimiters '<~' and '~>' around the encoded stream.
- A 32-bit zero value (four zero bytes) is sometimes encoded as single character 'z' instead of "!!!!!" to save space (not universally supported).
Padding and truncation:
- If the input length is not a multiple of 4, pad the final block with zero bytes to 4 bytes, perform the conversion to five characters, then truncate the produced characters to the number corresponding to the original input length (4 bytes -> 5 chars, 1..3 bytes -> 2..4 chars depending on counted bits).

SUPPLEMENTARY DETAILS:
- Implementations must document which variant they implement (Adobe Ascii85 vs other flavors) and whether they accept the 'z' shortcut.
- When decoding, reject control characters and whitespace unless the implementation explicitly ignores them; be robust to optional delimiters if documented.

REFERENCE DETAILS (implementable signatures):
- encode(bytes: Uint8Array): string
  - Input: arbitrary Uint8Array
  - Output: Ascii85 encoded string (variant-dependent delimiters and 'z' handling)
- decode(str: string): Uint8Array
  - Behavior: accept documented variants; return exact original byte sequence for round-trip.

DIGEST:
- Source: https://en.wikipedia.org/wiki/Ascii85
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 112813

ATTRIBUTION:
Wikipedia: Ascii85 (Adobe Ascii85 and related variants)
