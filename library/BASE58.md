BASE58

TABLE OF CONTENTS:
- Alphabet and rationale
- Bits per character (density)
- Encoding algorithm (big-integer/divmod outline)
- Decoding algorithm
- Length calculation
- Best practices and pitfalls

NORMALISED EXTRACT:
Alphabet (Bitcoin base58): 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
Characters excluded: 0 (zero), O (capital o), I (capital i), l (lowercase L) to avoid visual ambiguity.
Charset size: 58 (bits per char ≈ log2(58) = 5.857981995374, approx 5.858 bits/char).

Encoding algorithm (outline):
- Treat the input byte array as a big-endian unsigned integer N.
- Repeatedly divide N by 58, collecting remainders r0..rk; map each remainder to the alphabet to form the encoded string (most-significant remainder becomes leading character after reversing).
- Preserve leading zero bytes in input by prefixing the encoded output with the alphabet[0] character for each leading zero.

Decoding is the inverse: map characters to numeric values, compute result = result * 58 + value for each char, then convert big integer to byte array, restoring leading zeros from leading alphabet[0] characters.

Length estimation:
- Encoded length ≈ ceil((8 * input_length_bytes) / log2(58))
- Exact encoded length depends on the numeric value; use precise conversion for shortest representation.

SUPPLEMENTARY DETAILS:
- Implementations use big-integer arithmetic in languages without native big integers; in JS prefer BigInt for correctness.
- Base58 is not a fixed-width bit-slice encoding; it produces variable-length output and may be slower than power-of-two encodings.

REFERENCE DETAILS:
API signatures:
- encode(bytes: Uint8Array): string
- decode(str: string): Uint8Array
Implementation notes:
- Must accurately preserve leading zero bytes.
- Reject input strings containing characters not in the alphabet.

DIGEST:
- Source: https://en.wikipedia.org/wiki/Base58
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 124058

ATTRIBUTION:
Wikipedia: Base58
