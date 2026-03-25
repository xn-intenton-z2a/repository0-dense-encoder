NORMALISED EXTRACT

Table of contents
- Charset and bit density
- Implementation approaches (big-integer division vs base-x long-division)
- Leading-zero handling
- UUID length math

Charset and bit density
- Canonical base62 alphabet (commonly used ordering): 0-9 then a-z then A-Z
  Exact ordered alphabet string: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
- Bits per character: log2(62) ≈ 5.954196310386875 (≈ 5.95420) bits/char.

Implementation approaches
- Big-integer division approach (generic and canonical):
  1. Interpret input bytes as a big integer N (most-significant byte first).
  2. Repeatedly divide N by 62 capturing remainders r0, r1, ... until N == 0.
  3. Map each remainder to an alphabet character; output characters in reverse remainder order to produce MSB-first representation.
- base-x / long division (practical, streaming-friendly):
  - Treat input bytes as an array of digits in base 256 and perform repeated long divisions by 62 producing output digits, preserving leading-zero compression as the library describes.
  - Advantages: avoids big-integer libraries and handles leading-zero semantics consistently.

Leading-zero handling (compatibility note)
- Some base-N libraries (e.g., base-x) compress leading zero bytes into a repeated leading alphabet character (the first character of the alphabet) to allow reversible representation of byte sequences with leading zeros. If consistent round-trip is required, adopt the same scheme across encode/decode.

UUID length math
- For a 16-byte UUID (128 bits): required characters = ceil(128 / log2(62)) = ceil(128 / 5.954196310386875) = 22 characters.

REFERENCE DETAILS
- API signatures (exact):
  createBase62Encoder(alphabet?: string): { encode(input: Uint8Array): string, decode(input: string): Uint8Array }
  encode(input: Uint8Array): string
  decode(input: string): Uint8Array
- Default alphabet (if not provided): 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
- Validation: decoder must reject characters outside the alphabet and must preserve leading-zero semantics (document choice and keep consistent across API).

SUPPLEMENTARY DETAILS
- Performance: use base-x style long-division algorithm for speed and memory predictability.
- Example density comparison: base62 yields ~5.95 bits/char; for 128 bits this maps to 22 characters (longer than base85/base91 which achieve 20).

DETAILED DIGEST
- Source: https://en.wikipedia.org/wiki/Base62 and https://raw.githubusercontent.com/cryptocoinjs/base-x/master/README.md
- Retrieved: 2026-03-25
- Data obtained during crawl: Wikipedia (~69.8 KB), base-x README (small raw README retrieved)
- Extracted facts: canonical base62 alphabet, bit density, two practical implementation approaches (big-integer vs long-division), and leading-zero handling note from base-x.

ATTRIBUTION
- Primary sources: Wikipedia — Base62; cryptocoinjs/base-x README
- Data sizes fetched: ~69.8 KB (Wikipedia HTML) and small README content (base-x repository)