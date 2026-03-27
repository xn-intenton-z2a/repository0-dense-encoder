BASE62

Normalised extract

Table of contents
- Alphabet and canonical ordering
- Bits per character and density
- Encoding algorithm (big-integer method)
- Decoding algorithm (multiplicative accumulate)
- UUID (128-bit) length calculation and fixed-width handling
- Edge cases and round-trip guarantees

Alphabet and canonical ordering
Most common canonical alphabet used for this project: digits 0-9 followed by uppercase A-Z followed by lowercase a-z (total 62 characters). Map indexes 0..61 to characters in that order. Alternative orders exist; choose and document the ordering to ensure interoperability.

Bits per character and density
- Charset size: 62
- bits per char = log2(62) = 5.954196310386876 bits/char
- For a 128-bit UUID the encoded length = ceil(128 / 5.954196310386876) = ceil(21.50) = 22 characters.

Encoding algorithm (big-integer method)
1. Input: Uint8Array bytes (big-endian).
2. Convert bytes to an unsigned integer V. Recommended JavaScript pattern: use BigInt and process each byte: V = (V << 8n) | BigInt(byte).
3. While V > 0n: r = V % 62n; V = V / 62n; append r to remainders array.
4. Map each remainder (0..61) to the alphabet characters and reverse the remainders to produce output string.
5. If the input was non-empty but V produced no digits (e.g., input all zeroes), emit a single character corresponding to value 0 and rely on fixed-length context when necessary.

Decoding algorithm (multiplicative accumulate)
1. Input: string s.
2. Build a lookup table mapping characters -> values 0..61.
3. Accumulate a BigInt V starting at 0: for each character c in s, V = V * 62n + BigInt(value(c)).
4. Extract bytes from V by repeatedly shifting right by 8 bits or by generating an array of bytes big-endian then left-pad to the expected output length when context requires fixed-size output.

UUID length and fixed-width handling
- For UUIDs (16 bytes): decoded output must be padded to 16 bytes to preserve leading zero bytes. When implementing encode/decode for general binary, either encode the length alongside the payload or require the caller to provide the expected output length to guarantee round-trip.

Edge cases and round-trip guarantee
- Empty input => empty output.
- All-zero input, single-byte input, and all-0xFF inputs: round-trip correctly when decode is provided the expected output length or when length metadata is used.
- For variable-length binary where preserving leading zero bytes matters, include length metadata or use fixed-length context.

Supplementary details
- Use BigInt for clarity and correctness on moderate input sizes (e.g., UUIDs); BigInt avoids implementing manual division algorithms and is supported in modern Node.js and browsers.
- For extremely large inputs or environments without BigInt, implement the base conversion by performing repeated division on a byte array (base-x style algorithm) to compute remainders without constructing a single large integer.
- Avoid ambiguous characters for human-readable variants (omit 0/O, 1/l/I) by building a custom charset and measuring effective bits per character accordingly.

Reference details
- createEncoding(name: string, charset: string) -> Encoding
  where Encoding contains:
    - encode(input: Uint8Array) -> string
    - decode(input: string, outLength?: number) -> Uint8Array
    - name: string
    - bitsPerChar: number (5.954196310386876)
    - charsetSize: number (62)
- encode behavior: converts input Uint8Array to a string per the encoding algorithm; no padding characters are emitted; for fixed-length data the caller should provide context or length metadata.
- decode behavior: if outLength is provided, result is left-padded with zero bytes to match outLength; otherwise returns the minimal-length byte array reconstructed from the integer value.

Best practices and implementation patterns
- For UUID shorthand: strip dashes from the canonical UUID string, parse the 32-hex-character string into 16 bytes, reverse bytes if protocol requires, then call the chosen encoding's encode function; for decode reverse those steps.
- Prefer BigInt-based conversion for small fixed-size inputs (UUIDs) for simplicity and correctness; prefer array-division implementations for streaming or very large buffers.
- Document and fix the canonical alphabet ordering to avoid interoperability issues between different implementations.

Digest
- Source: https://en.wikipedia.org/wiki/Base62
- Retrieved: 2026-03-27
- Bytes fetched: 66208

Attribution
- Content extracted and condensed from Wikipedia Base62 page (link above). The extract provides the technical details required to implement base62 encoding and decoding for binary data, including UUID sizing and round-trip considerations.
