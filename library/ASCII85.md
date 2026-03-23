ASCII85

NORMALISED EXTRACT

Core encoding rule (Ascii85 / Adobe variant):
- Process input in 4-octet (32-bit) big-endian chunks.
- Treat each 4-octet chunk as an unsigned 32-bit integer N.
- Produce five output characters by repeatedly dividing N by 85, obtaining values v0..v4 in big-endian order; map each vi to ASCII code: char = 33 + vi (range 33..117, i.e. '!'..'u').
- Special-case (Adobe Ascii85): an all-zero 32-bit value encodes to a single 'z' character as a compression shortcut.

Properties and sizing:
- Alphabet: contiguous ASCII characters 33 (!) through 117 (u).
- Bits per char: log2(85) ≈ 6.409 bits/char.
- For 16 bytes: expected encoded length ≈ ceil(128 / 6.409) = 20 characters (implementation may use 20 exact characters since 4-byte grouping yields 5 characters per 4 bytes, 16 bytes -> 20 chars).

TOC
- Character mapping and alphabet
- 4-byte grouping algorithm and special-case 'z'
- Handling partial final block (pad zeros to 4 bytes then emit up to 5 characters; when decoding ignore added zero bits according to output length)
- Implementation notes for safe use in source code and JSON

SUPPLEMENTARY DETAILS
- Partial block handling: when input length not divisible by 4, pad the last partial chunk with zero bytes to 4 bytes, encode to 5 chars, then output only the first 2..5 characters corresponding to the original data length and optionally use markers to recover exact byte count on decode.
- Adobe variant specifics: the 'z' shorthand is only valid for exactly 4 zero bytes; do not use 'z' inside partial-chunk encodings.

REFERENCE DETAILS (API signatures)
- ascii85Encode(bytes: Uint8Array, options?: { adobeZeroShort?: boolean }): string
  - options.adobeZeroShort (default true) enables the 'z' short form for exactly 4 zero bytes.

- ascii85Decode(str: string): Uint8Array
  - Must correctly expand 'z' to four zero bytes when present and correctly handle omitted characters in the final group.

BEST PRACTICES AND TROUBLESHOOTING
- Use explicit big-endian integer assembly and disassembly to avoid platform endianness mistakes when implementing the 32-bit to 5-char conversion.
- Validate characters are within 33..117 and reject ASCII control characters.
- When interoperating with different Ascii85 dialects (Adobe vs non-Adobe), ensure the decoder accepts or rejects 'z' depending on configured compatibility.

DETAILED DIGEST
- Source: Wikipedia, Ascii85 (https://en.wikipedia.org/wiki/Ascii85), retrieved 2026-03-23
- Extracted technical points: 4-byte->5-char mapping, alphabet range 33..117, 'z' shortcut and partial-block padding rules
- Source bytes retrieved during crawl: 105805 bytes

ATTRIBUTION
- Source: Wikipedia (Ascii85) — used to extract algorithmic mapping, special-case rules and padding behaviour.
