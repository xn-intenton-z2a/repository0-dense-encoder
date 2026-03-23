BASE62

NORMALISED EXTRACT

Canonical alphabet used in this project: digits then lowercase then uppercase, i.e. "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" (matches mission: [0-9a-zA-Z]).

Encoding approaches (implementation-grade):
- Big-integer division approach:
  - Interpret the input byte sequence as a big-endian integer value V (bytes are base-256 digits).
  - Repeatedly divide V by 62, collecting remainders r in least-significant-first order; map each remainder to alphabet[r]. Reverse remainders to produce final string.
- Alternate accumulator approach (bit-oriented) is less convenient because 62 is not a power of two; use big-int or arbitrary-precision division for correctness and simplicity.

NUMERICAL PROPERTIES
- Alphabet size: 62
- Bits per character: log2(62) ≈ 5.9541963104 bits/char
- For 16 bytes (128 bits): expected minimum output length ≈ ceil(128 / 5.9541963104) = 22 characters (so base62 typically yields 22 chars for a UUID).

TOC
- Recommended alphabet and ordering
- Big-int division algorithm (detailed steps)
- Decode algorithm (multiply-accumulate into big-int, then output bytes)
- Edge cases: leading zero bytes and canonical padding choices

REFERENCE DETAILS (API signatures)
- base62Encode(bytes: Uint8Array): string
  - Implementation note: when implementing in JS where BigInt is available: construct BigInt from bytes: V = bytes.reduce((acc,b)=> (acc<<8n) | BigInt(b), 0n); then while V>0 { r = Number(V % 62n); push(alphabet[r]); V /= 62n } ; if output empty push '0'. Reverse at end.

- base62Decode(str: string): Uint8Array
  - Implementation note: use BigInt to accumulate value: V = str.split('').reduce((acc,ch) => acc*62n + BigInt(alphabetIndex[ch]), 0n); then extract bytes into Uint8Array by repeatedly shifting right 8 bits or by converting to hex and parsing pairs.

BEST PRACTICES
- Document and fix alphabet ordering (many base62 variants exist); using mission-specified [0-9a-zA-Z] ensures deterministic behaviour.
- For performance on small inputs, use BigInt-based conversion (Node and modern browsers support BigInt), falling back to manual division on platforms without BigInt.

DETAILED DIGEST
- Source: Wikipedia (Base62) and common npm implementations, retrieved 2026-03-23
- Extracted technical points: recommended alphabet, big-int division pattern, expected sizing for UUID inputs
- Source bytes retrieved during crawl: 66190 bytes

ATTRIBUTION
- Source: Wikipedia (Base62) and community implementations used to confirm alphabet and sizing behaviour.
