NORMALISED EXTRACT

Table of contents
- Overview and design goals
- Encoding alphabet and bit density
- Algorithm (accumulator, variable 13/14-bit extraction)
- Remainder handling
- UUID length math

Overview
- basE91 is a variable-bit packing encoding designed to be denser than base64 by using a 91-character alphabet and a two-value extraction strategy (13 or 14 bits per step) to minimize waste.

Encoding alphabet and bit density
- Bits per character: log2(91) ≈ 6.507 (≈ 6.507 bits/char).
- Typical implementation supplies a 91-character ASCII alphabet (standard basE91 enctab). Implementations must use the same ordered 91-character table to interoperate.

Algorithm (implementation-ready description)
- Maintain an accumulator integer b = 0 and bit count n = 0.
- For each input byte byteVal:
  1. b |= (byteVal << n)
  2. n += 8
  3. while n > 13:
     a. v = b & 8191  (8191 = 2^13 - 1)
     b. if v > 88:
        - b >>= 13
        - n -= 13
        - use v (13-bit value)
       else:
        - v = b & 16383  (16383 = 2^14 - 1)
        - b >>= 14
        - n -= 14
        - use v (14-bit value)
     c. Emit two output characters for v: first index = v % 91, second index = floor(v / 91). Map each index through the 91-character alphabet in that order.
- After processing all input bytes, if n > 0:
  - Emit enctab[b % 91]
  - If n > 7 or b > 90 then emit enctab[floor(b / 91)]
- This produces a compact output using mostly pairs of characters emitting 13 or 14 bits at a time.

Remainder handling
- The final emission rules ensure all accumulated bits are emitted; the decoder must follow symmetric rules: reconstruct v values from pairs of characters, add to accumulator, and extract bytes when accumulator has >=8 bits.

UUID length math
- For a 16-byte UUID (128 bits): required characters = ceil(128 / 6.507) = 20 characters.

REFERENCE DETAILS
- API signatures (exact):
  encode(input: Uint8Array): string
  decode(input: string): Uint8Array
- Decoder responsibilities:
  - Map characters to numeric indices 0..90 via a table.
  - Inverse algorithm: read 2-character pairs (or final single char), compute v = index0 + index1*91, append v to accumulator (shift by 13 or 14 bits depending on value), then extract bytes while accumulator >= 8 bits.
- Validation: reject characters not in the 91-character alphabet; ensure output length matches expected byte count for round-trip.

SUPPLEMENTARY DETAILS
- Performance: algorithm is bit-manipulation heavy but efficient in practice; use 32- or 64-bit accumulators in languages that support them to avoid frequent shifts.
- Interoperability: use canonical enctab ordering from the basE91 reference implementation to ensure correct cross-implementation decoding.

DETAILED DIGEST
- Source: https://en.wikipedia.org/wiki/Base91
- Retrieved: 2026-03-25
- Data obtained during crawl: HTML download (~50.9 KB)
- Extracted technical facts included above: exact accumulator algorithm, bit thresholds (13/14 bits), and emission rules for final partial bits.

ATTRIBUTION
- Original source: Wikipedia — Base91 (basE91)
- Data size fetched: ~50.9 KB (HTML)
