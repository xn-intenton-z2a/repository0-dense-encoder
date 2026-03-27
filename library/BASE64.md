BASE64

TABLE OF CONTENTS
- Algorithm overview
- Bits per character and density
- Alphabet and URL-safe variant
- Padding rules and length formulas
- Browser / Node.js reference signatures
- Implementation notes for binary input (Uint8Array)

ALGORITHM OVERVIEW
- Base64 encodes binary data by grouping input bytes into 24-bit blocks (3 bytes) and splitting each block into four 6-bit indices.
- Each 6-bit value maps to one Base64 character from the standard alphabet.

BITS PER CHARACTER
- Each encoded character carries exactly 6 bits.
- Bit density: 6.00 bits per character.
- For N input bytes the base64 character count (no padding) = ceil((8*N)/6).
  Example: UUID 16 bytes -> ceil(128/6) = 22 characters (no padding).

ALPHABET & VARIANTS
- Standard alphabet: "A–Z a–z 0–9 + /" (index 0..63).
- Padding character: '=' to make output length a multiple of 4 when standard padding is used.
- URL-safe variant: replace '+' -> '-' and '/' -> '_' and optionally omit '=' padding.

PADDING RULES & LENGTH
- Encoding steps: group 3 input bytes -> 24 bits -> 4 output characters.
- For leftover bytes (1 or 2 bytes) standard Base64 emits padding '=' to reach 4 chars; the no-padding variant truncates padding which yields shorter strings (commonly used for compact UUID representation).

BROWSER / NODE REFERENCE SIGNATURES
- Browser: btoa(binaryString) -> string (operates on binary string not Uint8Array).
- Node.js: Buffer.from(uint8Array).toString('base64') -> string
  Buffer.from(base64string, 'base64') -> Buffer
- Recommended library API signatures:
  encode(input: Uint8Array, {urlSafe?: boolean, padding?: boolean} = {}): string
  decode(input: string): Uint8Array

IMPLEMENTATION NOTES
- When implementing from Uint8Array: iterate over bytes in groups of 3, build 24-bit value, emit four 6-bit indices.
- For no-padding output, trim '=' characters; to restore original byte length on decode, use encoded length to derive original byte count.

DETAILED DIGEST
Condensed algorithm and API notes extracted from MDN Base64 reference and general Base64 specification. Retrieved: 2026-03-27. Crawled content size: ~185 KB.

ATTRIBUTION
Source: MDN Base64 — https://developer.mozilla.org/en-US/docs/Glossary/Base64
