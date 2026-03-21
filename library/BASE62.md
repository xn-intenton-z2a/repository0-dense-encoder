BASE62

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Charset (canonical for this project)
2. Bits-per-character and density
3. Conversion algorithm patterns (BigInt and divide-mod)
4. Exact length formula and fixed-length encoding for UUIDs
5. Round-trip and edge-case handling

DETAILED INFORMATION

Charset (project default, mission-specified):
0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
(This is the ordered charset: digits then lowercase then uppercase; index 0='0', index 61='Z')

Bits per character: log2(62) = 5.954196310386875 (~5.9542 bits/char).

Because 62 is not a power-of-two, encoding requires arbitrary-radix conversion rather than fixed-bit grouping. Two common implementation approaches:
1) BigInt approach (recommended for UUID-length inputs):
   - Load the entire input into a BigInt: n = 0n; for each byte b: n = (n << 8n) | BigInt(b)
   - Repeatedly compute digits: while n > 0n: digit = Number(n % 62n); push charset[digit]; n /= 62n
   - Reverse pushed digits; when input was zero-length return empty string; to preserve leading-zero bytes for fixed-length encodings, left-pad the result with charset[0] to the computed fixedLength.
2) Division on byte-array (no BigInt): implement arbitrary-precision divide-by-62 on an array of 32-bit words using repeated division with remainder; more complex but avoids BigInt for very large inputs.

Length formulas (useful for fixed-length outputs):
  encodedLen = ceil((inputLen * 8) / log2(62))
For UUID (16 bytes = 128 bits): encodedLen = ceil(128 / 5.9541963) = 22 characters.

Round-trip considerations:
- To ensure decode(encode(bytes)) === bytes for arbitrary input and preserve leading zeros, either:
  a) encode must include a fixed-length option that pads the encoded string to encodedLen using charset[0]; or
  b) encode must prefix length metadata (not recommended for human-readable UUID shorthand).
- Recommended for UUID shorthand: use fixed-length = encodedLen so that decoding can deterministically reconstruct all input bytes without extra metadata.

REFERENCE DETAILS (API signatures)

createBase62(charset?: string): {
  encode(bytes: Uint8Array, options?: { fixedLength?: number }): string
  decode(str: string, options?: { expectedLength?: number }): Uint8Array
}

encodeBase62(bytes: Uint8Array, options?: { charset?: string, fixedLength?: number }): string
decodeBase62(str: string, options?: { charset?: string, expectedLength?: number }): Uint8Array

Behavior:
- Default charset is as listed above.
- When fixedLength is supplied, output is left-padded with charset[0] to fixedLength characters before returning.
- decodeBase62 will, when expectedLength provided, left-pad the decoded big-integer representation with zero bytes to reach expectedLength.

IMPLEMENTATION EXAMPLE (pattern):
- For UUIDs prefer BigInt approach; for streaming or huge inputs implement the divide-mod on a byte-array.

DIGEST
Source: https://en.wikipedia.org/wiki/Base62
Retrieved: 2026-03-21
Crawled data size: ~69.6 KB
Key extracted implementable points: charset choice, non-power-of-two implications, two canonical conversion patterns (BigInt vs arbitrary-precision divide), fixedLength recommendation for UUIDs.

ATTRIBUTION
URL: https://en.wikipedia.org/wiki/Base62
Data size: ~69.6 KB
