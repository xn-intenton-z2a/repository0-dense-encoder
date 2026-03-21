BASE91

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Canonical alphabet reference
2. Bits-per-character (density)
3. Variable-bit packing encoding algorithm (13/14-bit window)
4. Decoding algorithm and compatibility
5. Output length estimate and UUID example

DETAILED INFORMATION

Canonical alphabet and source:
- Use the canonical alphabet and reference implementation from the original author at base91.sourceforge.net for full interoperability; implementations that differ in alphabet or bit-selection rules are incompatible.

Bits per character: log2(91) = 6.5069 bits/char, yielding slightly higher density than Z85 for typical inputs.

Encoding algorithm summary (variable-bit packing):
- Maintain accumulator "b" and bitcount "n".
- For each input byte octet, append to accumulator: b |= (byte << n); n += 8.
- While n > 13: take value v = b & ((1 << 13) - 1); if v < 91 then consume 13 bits: b >>= 13; n -= 13; output two characters derived from v (v % 91, v / 91); else take 14 bits: v = b & ((1 << 14) - 1); b >>= 14; n -= 14; output two chars (v % 91, v / 91).
- After processing all bytes, if n > 0 emit final one or two characters derived from remaining bits.

Decoding reverses this process: accumulate symbols mapping to values 0..90, reconstruct combined values and shift into accumulator, when accumulator holds >=8 bits extract bytes.

Length estimate for UUID (16 bytes):
- encodedLen ≈ ceil(128 / 6.5069) ≈ 20 characters (exact output may vary based on the bit packing and alphabet choices).

REFERENCE DETAILS (API signatures)

encodeBase91(bytes: Uint8Array): string
decodeBase91(str: string): Uint8Array

Implementation notes:
- Follow the original reference implementation exactly to ensure compatibility.
- Validate characters against canonical alphabet during decoding.

DIGEST
Source: http://base91.sourceforge.net/ and Wikipedia Base91 entry
Retrieved: 2026-03-21
Crawled data size: ~102 KB
Key extracted implementable points: variable-bit (13/14-bit) packing rules, accumulator behavior and branch rule for 13 vs 14 bits, recommended to follow original reference implementation for exact alphabet and edge-case behavior.

ATTRIBUTION
URL: https://base91.sourceforge.net/
Data size: ~102 KB
