BASE91

NORMALISED EXTRACT

BasE91 (base91) is an efficient printable encoding with an alphabet of 91 characters and a non-fixed per-character bit distribution. Key concrete points from reference implementations:
- Alphabet (in order):
  ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"
- Encoding strategy (bit-accumulator approach):
  - Maintain an integer bit-accumulator ebq and bit count en.
  - Append bytes into ebq (ebq |= byte << en; en += 8).
  - While en > 13, take ev = ebq & 8191; if ev > 88 then use 13 bits (ev) else take ev = ebq & 16383 and use 14 bits. Output two characters per ev using: ENCODING_TABLE[ev % 91] and ENCODING_TABLE[(ev / 91) | 0]; then shift ebq right by 13 or 14 and decrement en accordingly.
  - After processing all bytes, if en > 0 emit one or two extra characters from remaining ebq bits.

NUMERICAL PROPERTIES
- Alphabet size: 91
- Approx bits per character: log2(91) ≈ 6.507 bits/char
- For 16 bytes (128 bits): expected output length ≈ ceil(128 / 6.507) = 20 characters (actual outputs vary by the last partial quantum; typical output is 19-20 characters)

TOC
- Exact alphabet string
- Encoding accumulator algorithm (13/14-bit decision rule)
- Decoding symmetric algorithm and table for mapping code points to values
- Implementation edge cases and partial final-group handling

REFERENCE DETAILS (API signatures and patterns)
- base91Encode(bytes: Uint8Array): string
  - Uses accumulator algorithm described above; emits characters from ENCODING_TABLE in pairs when en > 13; final leftover produces 1 or 2 characters.

- base91Decode(str: string): Uint8Array
  - Use DECODING_TABLE to map char code to value (91 entries); implement inverse accumulator: accumulate dv values, combine by 91 multiplier, reconstruct bytes using 13/14-bit threshold tests.

BEST PRACTICES
- Precompute ENCODING_TABLE (length 91) and DECODING_TABLE (indexed by char code) for O(1) lookup.
- Use integer arithmetic and bitwise ops for speed; avoid repeated bigint operations for performance-critical loops.
- Validate characters and ignore unknown characters or treat them as errors depending on strictness requirements.

DETAILED DIGEST
- Source: base91 implementations (extracted from common JS implementation on unpkg), retrieved 2026-03-23
- Extracted technical points: ENCODING_TABLE, DECODING_TABLE, accumulator algorithm (13/14-bit rule) and typical output sizing
- Source bytes retrieved during crawl: 100089 bytes

ATTRIBUTION
- Source: basE91 implementation on unpkg/npm and original basE91 project; used to extract alphabet and exact encoder/decoder algorithm.
