BASE91

TABLE OF CONTENTS
- Purpose and density
- Alphabet (reference)
- Encoding algorithm (bit-accumulator method)
- Decoding algorithm (reverse accumulator)
- Reference API signatures

PURPOSE AND DENSITY
- Base91 is a high-density binary-to-text encoding that uses an alphabet of 91 printable characters and a variable-bit accumulator technique to achieve ~6.5 bits per character in practice (denser than Base64 and Base85 for many inputs).

ALPHABET
- The canonical alphabet is defined by the original base91 specification (see source). Use the source alphabet exactly for interoperability: http://base91.sourceforge.net/ (alphabet contains 91 printable ASCII characters; include it verbatim from the source when implementing).

ENCODING ALGORITHM (summary, from original specification)
- Maintain an integer accumulator 'b' and bit count 'n' initially 0.
- For each input byte v: b |= (v & 0xFF) << n; n += 8;
- While n > 13: take value = b & 8191 (13 bits); if value > 88:
    - b >>= 13; n -= 13;
  else:
    - value = b & 16383 (14 bits); b >>= 14; n -= 14;
  - emit two output characters: value % 91 and floor(value / 91) mapped to the base91 alphabet (least significant first as defined by spec).
- After all input bytes processed, if n > 0: emit one or two characters from remaining bits using the same mapping rules to empty the accumulator.

DECODING ALGORITHM (summary)
- Reverse process: accumulate values from incoming base91 indices; reconstruct 13- or 14-bit values according to the same decision logic and emit 8-bit bytes until the accumulator is drained.

API SIGNATURES
- encode(input: Uint8Array): string
- decode(input: string): Uint8Array

IMPLEMENTATION NOTES
- Precise handling of the final partially-filled accumulator is critical for exact round-trip behavior.
- For correctness consult the original reference implementation and alphabet on the base91 site.

DETAILED DIGEST
Condensed technical algorithm extracted from the base91 original specification. Retrieved: 2026-03-27. Crawled content size: ~104 KB (see source for exact alphabet and canonical reference implementation).

ATTRIBUTION
Source: base91 original site — http://base91.sourceforge.net/
