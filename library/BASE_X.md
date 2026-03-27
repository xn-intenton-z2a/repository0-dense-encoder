BASE_X

TABLE OF CONTENTS
- Purpose: arbitrary alphabets
- API and usage patterns (cryptocoinjs/base-x)
- Implementation semantics for encode/decode
- Creating custom encodings (charset rules and validation)

PURPOSE
- base-x is a minimal library model for constructing binary-to-text encoders from an arbitrary alphabet string. It is commonly used to construct base58, base62 and other custom encodings.

API AND USAGE PATTERN
- baseX(alphabet: string) -> encoder object
  encoder.encode(input: Uint8Array | Buffer) -> string
  encoder.decode(input: string) -> Buffer (or Uint8Array)

TYPICAL SIGNATURES (normalized)
- function baseX(alphabet: string): {
    encode(input: Uint8Array): string;
    decode(str: string): Uint8Array;
    alphabet: string;
    base: number; // alphabet.length
  }

IMPLEMENTATION SEMANTICS
- The alphabet string length defines the radix; alphabet characters are assigned values 0..(radix-1) in order.
- Encoding: interpret input bytes as a big integer (big-endian), repeatedly divide by radix and map remainders to alphabet characters (least-significant digit first then reverse output), or use a byte-by-byte algorithm optimized for big bases.
- Decoding: map each input character to its radix value, and accumulate by multiply-then-add arithmetic to reconstruct the original bytes.

CUSTOM CHARSET RULES
- Allowed characters: printable characters chosen for safety; when constructing custom alphabets using printable ASCII range U+0021..U+007E exclude space and control characters.
- Omit visually ambiguous characters for readability: e.g., '0' vs 'O', '1' vs 'l' vs 'I'.
- Validate that alphabet contains unique characters and length >= 2.

SUPPLEMENTARY NOTES
- For high-radix encodings (radix > 62) use arbitrary-precision intermediate arithmetic or base conversion algorithms that operate on byte arrays without converting to large integers in JS Number.

DETAILED DIGEST
Normalized API and usage patterns based on the cryptocoinjs base-x implementation and README. Retrieved: 2026-03-27. Crawled content size: ~294 KB.

ATTRIBUTION
Source: base-x (cryptocoinjs) — https://github.com/cryptocoinjs/base-x
