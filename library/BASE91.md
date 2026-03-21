BASE91

TABLE OF CONTENTS:
- Purpose and density
- Typical alphabet used by basE91 reference implementation
- Encoding algorithm overview (variable output length)
- Decoding and edge-case handling

NORMALISED EXTRACT:
Purpose: basE91 is a higher-density printable encoding that typically achieves about 6.50 bits/char, improving on base85 and base64 for many inputs.
Common/alphabet (reference implementation):
- Typical basE91 alphabet used by reference code: A-Z a-z 0-9 and the following 33 printable symbols: !#%&()*+,./:;<=>?@[]^_`{|}~" (implementations may vary slightly; consult the reference source for the exact 91-character sequence)
Density: charset size 91 -> bits per char = log2(91) ≈ 6.5078 bits/char
Encoding algorithm (summary):
- basE91 uses a variable-bit buffer technique: it accumulates input bits into a buffer and extracts 13 or 14 bits at a time to map to two output characters; the exact extraction alternates to maximise entropy packing and produce a compact output length.
- Because the mapping uses 13/14-bit chunks, implementers must carefully reproduce the bit-buffer logic for correct round-trip decoding.
Decoding algorithm (summary):
- Reverse the bit-buffer process: map each output character to its alphabet index, reconstruct the 13/14-bit values and refill the buffer, then extract 8-bit bytes when available.

SUPPLEMENTARY DETAILS:
- Implementations must use the exact alphabet sequence from the chosen reference implementation; variations in alphabet order break interoperability.
- Test vectors: verify round-trip on edge cases: empty buffer, single byte, all-zero, all-0xFF, and typical UUID 16-byte inputs.

REFERENCE DETAILS (implementable signatures):
- encode(bytes: Uint8Array): string
- decode(str: string): Uint8Array

DIGEST:
- Source: http://base91.sourceforge.net/
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 105778

ATTRIBUTION:
basE91 reference material (Joachim Henke)
