ASCII85

TABLE OF CONTENTS
- Purpose and high-level behavior
- Encoding algorithm (4 bytes -> 5 chars)
- Alphabet mapping and char range
- Special tokens and padding for partial input
- Reference encode/decode signatures

PURPOSE
Ascii85 (also called Base85 or Adobe Ascii85) is a 85-ary encoding that maps 4 input bytes (32 bits) into 5 printable ASCII characters (each representing 5 base-85 digits). It is denser than Base64 for some inputs and operates on 4-byte blocks.

ENCODING ALGORITHM (SUMMARY)
- Take 4 input bytes and treat them as a 32-bit unsigned integer in network byte order (big-endian).
- Repeatedly divide the 32-bit value by 85 to produce five base-85 digits (most-significant digit first).
- Map each base-85 digit D (0..84) to the ASCII character with codepoint (33 + D) resulting in characters in the range '!' (33) through 'u' (117).
- For a group of four zero bytes many Ascii85 variants permit the single-character abbreviation 'z' to represent 4 zero bytes (implementation dependent).

PARTIAL GROUPS / PADDING
- When input length is not divisible by 4, the final chunk is padded with zeros to form a 32-bit value; only the resulting necessary characters (3, 4, or 5) are emitted, depending on leftover bytes; do not emit extra padding characters beyond the required output.

REFERENCE SIGNATURES
- encode(input: Uint8Array): string
- decode(input: string): Uint8Array

IMPLEMENTATION NOTES
- For strict interoperability pick a single Ascii85 variant (Adobe vs btoa-style); Adobe-style uses 'z' abbreviation and the '!'..'u' mapping.
- Avoid using Ascii85 in contexts requiring compact URL-safe output since Ascii85 characters include punctuation that may require quoting.

DETAILED DIGEST
Technical algorithm and mapping extracted from Ascii85 documentation and Wikipedia. Retrieved: 2026-03-27. Crawled content size: ~110 KB.

ATTRIBUTION
Source: Wikipedia Ascii85 — https://en.wikipedia.org/wiki/Ascii85
