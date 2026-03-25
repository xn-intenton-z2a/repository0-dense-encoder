NORMALISED EXTRACT

Table of contents
- Charset and bit density
- Block mapping (3 bytes -> 4 chars)
- Padding rules and no-padding variant
- Encoding algorithm (bit packing order and masks)
- Decoding algorithm (sextet reassembly and padding handling)
- Length math for fixed-size inputs (UUID example)

Charset and bit density
- Standard Base64 alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
- URL-safe Base64 alphabet: replace + with - and / with _
- Padding character: '=' (used to make output length a multiple of 4)
- Bits per character: 6.0 bits/char (log2(64) = 6)

Block mapping (3 bytes -> 4 chars)
- Base relationship: 3 bytes = 24 bits -> 4 base64 characters of 6 bits each.
- Encoding block step (integer arithmetic form):
  1. Read up to 3 bytes b0,b1,b2 (absent bytes treated as zero for intermediate computation when handling remainder).
  2. Combine to 24-bit value: V = (b0 << 16) | (b1 << 8) | b2
  3. Extract indices: i0 = (V >> 18) & 0x3F; i1 = (V >> 12) & 0x3F; i2 = (V >> 6) & 0x3F; i3 = V & 0x3F
  4. Map each index to the alphabet string above to produce 4 characters.

Padding rules and no-padding variant
- Standard output length (with padding): 4 * ceil(n / 3) characters, where n = input length in bytes.
- For remainder 1: output 2 base64 chars + '=='. For remainder 2: output 3 base64 chars + '='.
- No-padding variant: omit '=' characters and treat decoder as tolerant (must add padding back or compute bytes from available sextets).

Decoding algorithm (sextet reassembly)
- Preprocessing: accept either standard or URL-safe alphabets (map '-'->'+', '_'->'/') and strip whitespace/newlines.
- If input length mod 4 != 0 and no-padding is used, compute required padding or decode from available sextets.
- For each 4-character block c0..c3 produce sextets s0..s3 by mapping characters to 0..63.
- Reconstruct bytes:
  b0 = (s0 << 2) | (s1 >> 4)
  b1 = ((s1 & 0x0F) << 4) | (s2 >> 2)
  b2 = ((s2 & 0x03) << 6) | s3
- Drop bytes corresponding to padding ('=' positions) when present.

Length math and UUID example
- Generic math: encoded_length_no_padding = ceil((input_bytes * 8) / 6)
- For a 16-byte (128-bit) UUID: encoded_length_no_padding = ceil(128 / 6) = 22 characters.
- Standard padded output for 16 bytes: 4 * ceil(16/3) = 24 characters (includes two '=' padding chars). Removing padding reduces it to 22.

Implementation constraints and notes
- Input/Output types: encode(input: Uint8Array) -> string; decode(input: string) -> Uint8Array.
- Decoding must reject invalid characters (throw or return error) unless explicitly operating in permissive mode.
- Avoid browser atob/btoa for arbitrary binary; convert between Uint8Array and base64 via typed-array aware routines.
- Endianness: base64 operates on a sequence of bytes and is independent of machine endianness; bit packing as described is big-endian within the 24-bit group by convention above.

REFERENCE DETAILS
- API signatures (exact):
  encode(input: Uint8Array): string
  decode(input: string): Uint8Array
- Parameter semantics:
  input (encode): byte buffer containing arbitrary binary data; empty buffer returns empty string.
  input (decode): ASCII string using the supported alphabet(s); accepts padded or unpadded representations if implementation handles both.
- Return semantics:
  encode: ASCII string composed only of the alphabet characters and optionally '=' padding.
  decode: Uint8Array whose length equals the original encoded byte length.
- Validation rules:
  - decode must reject characters outside the alphabet after whitespace/newline stripping (unless operating in permissive mode).
  - When detecting URL-safe variant, map '-' to '+' and '_' to '/'.

SUPPLEMENTARY DETAILS
- Performance: Operate on 3-byte blocks in a tight loop and use precomputed index->char and char->index tables to minimize branching.
- Memory: For large inputs, stream by processing chunks of a multiple of 3 bytes and emitting characters incrementally.
- Security: Do not accept untrusted Unicode input without first validating it is strictly ASCII in the allowed alphabet.

DETAILED DIGEST
- Source: https://developer.mozilla.org/en-US/docs/Glossary/Base64
- Retrieved: 2026-03-25
- Data obtained during crawl: HTML download (~185.4 KB)
- Extracted technical facts included above: alphabet, block mapping, padding semantics, base64url mapping, and length math for fixed-size buffers (UUID example).

ATTRIBUTION
- Original source: MDN Web Docs — Base64 (developer.mozilla.org)
- Data size fetched: ~185.4 KB (HTML)
