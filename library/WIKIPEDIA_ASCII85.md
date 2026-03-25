NORMALISED EXTRACT

Table of contents
- Variants: Adobe Ascii85 vs Z85 (ZeroMQ)
- Charset definition (Ascii85 canonical range)
- Block mapping (4 bytes -> 5 chars)
- Special shorthand 'z' and variant restrictions
- Padding and remainder handling
- Bits-per-character and UUID length math

Charset and bit density
- Canonical Ascii85 (Adobe/ASCii85) uses ASCII code points 33 ('!') through 117 ('u') inclusive as its 85-character alphabet (85 characters total).
- Z85 (ZeroMQ) defines a separate 85-character alphabet optimized to be non-whitespace and safe for C-strings; Z85 explicitly forbids the 'z' shorthand used by Adobe Ascii85.
- Bits per character: log2(85) = ~6.409391 (≈ 6.40939) bits/char.

Block mapping (4 bytes -> 5 chars)
- Encoding core: take 4 input bytes b0,b1,b2,b3, form a 32-bit big-endian integer V = (b0 << 24) | (b1 << 16) | (b2 << 8) | b3.
- Convert V into 5 base-85 digits by repeated division by 85. Output the five digits in big-endian order mapped to the Ascii85 alphabet.
- Decoding reverses the process: map five characters to 0..84 digits, compute V = d0*85^4 + d1*85^3 + d2*85^2 + d3*85 + d4, then extract the four bytes big-endian.

Special shorthand and variant notes
- Adobe Ascii85: a sequence that encodes to five '!' characters when V==0 may be shortened to a single 'z' character to represent 4 zero bytes. Only applies to full 4-byte groups of zero.
- Z85: chosen alphabet and rules do not include the 'z' shorthand; Z85 aims for a deterministic 5-character expansion per 4-byte block and a defined alphabet for interoperability.

Padding and remainder handling
- For final incomplete chunk with 1..3 bytes, pad the chunk with zeros to 4 bytes, perform the 5-char conversion, then only emit the first (1..4) characters corresponding to the number of input bytes plus one per Adobe/Z85 specification; or explicitly follow the variant's recommended trailing handling to ensure round-trip decode.

UUID length math
- bits/char ≈ 6.409391
- For a 16-byte (128-bit) UUID: required characters = ceil(128 / 6.409391) = 20 characters.

REFERENCE DETAILS
- API signatures (exact):
  encode(input: Uint8Array, variant?: 'ascii85'|'z85'): string
  decode(input: string, variant?: 'ascii85'|'z85'): Uint8Array
- Variant semantics:
  - 'ascii85' (default): supports 'z' shorthand, uses ASCII 33..117 alphabet, permits shorthand behavior and standard Adobe remainder rules.
  - 'z85': uses ZeroMQ Z85 alphabet, no 'z' shorthand, deterministic 5-char output per full 4-byte block.
- Validation rules: decoder must reject invalid characters for the chosen variant; when receiving a 'z' in a z85 variant, treat as invalid.

SUPPLEMENTARY DETAILS
- Implementation detail (encoding full blocks): use integer division repeatedly (or compute digits via repeated modulus operations) to obtain the five base85 digits.
- Endianness: operate in big-endian order on 4-byte groups (b0 is most significant byte).
- Performance: operate on 4-byte aligned chunks; for streaming, buffer up to 4 bytes before encoding.

DETAILED DIGEST
- Source: https://en.wikipedia.org/wiki/Ascii85
- Retrieved: 2026-03-25
- Data obtained during crawl: HTML download (~110.4 KB)
- Key extracted facts above: canonical alphabet range (ASCII 33..117), block mapping 4->5, 'z' shorthand rules, Z85 variant differences, and bits-per-character for density calculations.

ATTRIBUTION
- Original source: Wikipedia — Ascii85
- Data size fetched: ~110.4 KB (HTML)
