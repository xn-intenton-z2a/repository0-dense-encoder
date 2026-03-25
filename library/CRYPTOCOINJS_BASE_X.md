NORMALISED EXTRACT

Table of contents
- Purpose and high-level behaviour
- API surface and signatures
- Algorithm: long division on byte arrays and leading-zero compression
- Alphabets and example lists
- Interoperability and non-RFC compliance notes

Purpose and high-level behaviour
- The base-x library provides fast base encoding/decoding for arbitrary alphabets via a long-division algorithm operating on the input byte array.
- It intentionally differs from RFC-based encodings (RFC3548 family) and is tailored for alphabets used in cryptocurrency and other domains (e.g., Base58, Base62 implementations).

API surface and signatures
- Factory function: basex(alphabet: string) -> encoder object
- Encoder object exact method signatures expected by implementers:
  encode(src: Uint8Array): string
  decode(str: string): Uint8Array
- Behavior:
  - encode returns the shortest representation using the provided alphabet with leading-zero compression: for each leading zero byte in the input, a leading alphabet[0] character is prepended to the output.
  - decode reverses the process, restoring leading zero bytes for every leading alphabet[0] character in the encoded string.

Algorithm (long division on byte array)
- Represent the input as a big-endian byte array (digits in base 256).
- Perform repeated divisions of the entire array by the target base (alphabet length) producing remainder digits in little-endian order; map remainders to alphabet characters.
- After division completes, reverse remainders to produce the encoded string; prefix with alphabet[0] for each leading zero byte in the input to preserve those zeros during round-trip.
- Decoding performs the inverse: multiply-accumulate using the alphabet index values to reconstruct the original byte array, then re-insert leading zero bytes based on leading alphabet[0] count.

Alphabets
- Examples provided by the original README (alphabet strings):
  - Base58 (bitcoin style): 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
  - Base62: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
  - Base64-like alphabets are not fully RFC3548-compliant in base-x and its README explicitly warns about that.

Interoperability and non-RFC compliance
- WARNING from README: base-x is NOT RFC3548 compliant and cannot be used as a standards-compliant base16/base32/base64 implementation.
- Use base-x for arbitrary alphabets where long-division semantics and leading-zero compression are desired.

REFERENCE DETAILS
- Factory signature: basex(alphabet: string) -> { encode(input: Uint8Array): string, decode(s: string): Uint8Array }
- Input expectations: encode accepts raw bytes (Uint8Array); decode returns a Uint8Array.
- Error handling: decode should throw on encountering characters not present in the alphabet; encode should accept empty input and return empty string.

DETAILED DIGEST
- Source: https://raw.githubusercontent.com/cryptocoinjs/base-x/master/README.md
- Retrieved: 2026-03-25
- Data obtained during crawl: raw README text (small)
- Extracted facts: base-x algorithm uses long divisions on a byte array, explicitly documents leading-zero compression and the provided example alphabets; README contains a warning about RFC3548 non-compliance.

ATTRIBUTION
- Original source: cryptocoinjs/base-x (README)
- Data size fetched: README (small text)