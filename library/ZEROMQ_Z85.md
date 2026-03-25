NORMALISED EXTRACT

Table of contents
- Z85 alphabet
- Bits/char and packing (4 bytes -> 5 chars)
- Encoding algorithm (exact steps)
- Decoding algorithm (exact steps)
- Padding and interoperability notes

Z85 alphabet
- Canonical Z85 alphabet (indexed 0..84):
  0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z . - : + = ^ ! / * ? & < > ( ) [ ] { } @ % $ #
- As a continuous string: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#

Bits/char and packing
- Logical bits per output character: log2(85) ≈ 6.409 bits/char.
- Z85 encodes 4 input bytes (32 bits) into 5 output characters (5 * log2(85) ≈ 32.045 bits), making it slightly denser than base64 for many inputs.

Encoding algorithm (exact)
- Requirement: canonical Z85 operates on input whose length is a multiple of 4 bytes. Implementations may accept non-multiple-of-4 input by applying zero-padding and communicating the original length separately.
- For each 4-byte block (B0,B1,B2,B3) interpreted as a big-endian 32-bit unsigned integer value V = (B0<<24) | (B1<<16) | (B2<<8) | B3:
  1. For i from 4 down to 0:
     - digit = V % 85
     - V = floor(V / 85)
     - output character at position i = alphabet[digit]
  2. Append the 5 characters (i=0..4 order) to the output (most-significant digit first after the loop).
- Repeat for all 4-byte groups.

Decoding algorithm (exact)
- For each 5-character block c0..c4:
  1. Compute V = ((((index(c0) * 85) + index(c1)) * 85 + index(c2)) * 85 + index(c3)) * 85 + index(c4)
  2. Emit four bytes: (V >> 24) & 0xFF, (V >> 16) & 0xFF, (V >> 8) & 0xFF, V & 0xFF
- Validation: reject characters not in the Z85 alphabet; if final block is shorter than 5 chars, implementations must use agreed padding semantics.

Padding and interoperability notes
- The Z85 spec published by ZeroMQ expects full 4-byte blocks; when encoding arbitrary-length data, pad trailing bytes with zeros and optionally record original length for correctness on decode.
- Z85 is designed to be printable and avoid whitespace characters. It is not the same as Adobe Ascii85 (Ascii85 differences include different alphabets and handling of zero-compression).

REFERENCE DETAILS
- Function signatures (exact, named exports):
  z85Encode(data: Uint8Array, allowPad?: boolean): string
    - data: input bytes. If allowPad is false (default), input length must be a multiple of 4 or function throws.
    - allowPad: if true, pad trailing bytes with zeros and optionally include original length metadata externally.
    - returns: encoded string of length = (input_length/4) * 5 (rounded up if padded)

  z85Decode(s: string, originalLength?: number): Uint8Array
    - s: encoded string whose length must be a multiple of 5 (or will be padded for decode)
    - originalLength: optional original byte length to trim zero padding after decode
    - returns: decoded bytes as Uint8Array

- Implementation patterns: use 32-bit unsigned arithmetic for the inner loop; map characters to indices with an array lookup table for constant-time conversion; avoid floating-point division by using integer division.

DETAILED DIGEST
- Sources attempted: https://rfc.zeromq.org/spec:Z85/ (returned HTTP 404 during crawl) and https://github.com/zeromq/z85 (repository HTML)
- Retrieved: 2026-03-25
- Data obtained during crawl: repository HTML ~311363 bytes; spec endpoint returned an HTTP 404 page (noted during crawl)

ATTRIBUTION
- Primary implementation reference: ZeroMQ Z85 project and related README
- Data size fetched: ~311363 bytes (GitHub HTML)
