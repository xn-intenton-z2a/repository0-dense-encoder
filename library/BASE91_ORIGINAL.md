NORMALISED EXTRACT

Table of contents
- Overview and goals
- Exact accumulator algorithm (13/14-bit handling)
- Emission rules and remainder handling
- API signatures and validation

Overview
- basE91 is a variable-bit packing encoding that emits mostly pairs of characters encoding either 13 or 14 bits per emission to achieve higher density than fixed-width encodings.

Accumulator algorithm (precise, implementation-ready)
- Maintain integer accumulator b = 0 and bit count n = 0.
- For each input byte byteVal (0..255):
  1. b |= (byteVal << n)
  2. n += 8
  3. while n > 13:
     a. v = b & 8191  (take lowest 13 bits)
     b. if v > 88:
        - b >>= 13
        - n -= 13
        - use v (13-bit value)
       else:
        - v = b & 16383  (take lowest 14 bits)
        - b >>= 14
        - n -= 14
        - use v (14-bit value)
     c. Emit two output characters: first index = v % 91, second index = floor(v / 91); map each index through the 91-character alphabet in that order.

Emission for final bits
- After all bytes processed, if n > 0:
  - Emit alphabet[b % 91]
  - If n > 7 or b > 90 then emit alphabet[floor(b / 91)]
- Decoder must follow the inverse steps: read 1 or 2 characters, reconstruct v, append to accumulator with correct shift amount, and extract bytes while accumulator >= 8 bits.

API signatures (exact)
- encode(input: Uint8Array): string
- decode(input: string): Uint8Array
- Validation rules: reject characters not in canonical enctab; ensure round-trip returns original length unless original length is encoded/communicated externally.

SUPPLEMENTARY DETAILS
- Bit masks used: 8191 (0x1FFF) for 13 bits; 16383 (0x3FFF) for 14 bits.
- Typical implementation stores the enctab (91 characters) in a zero-indexed array and a revtab (mapping char->index) for decode.
- Performance: decoding requires table lookup and integer shifts; use 32-bit integer operations in JS using bitwise operators (careful with sign extension for >32-bit accumulators; use unsigned logic where necessary).

DETAILED DIGEST
- Source: https://base91.sourceforge.net/
- Retrieved: 2026-03-25
- Data obtained during crawl: 105386 bytes (HTML)

ATTRIBUTION
- Original basE91 reference materials and implementation notes (Joachim Henke)
- Data size fetched: 105386 bytes
