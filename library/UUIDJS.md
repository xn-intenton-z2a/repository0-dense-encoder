UUIDJS

Normalised extract

Table of contents
- Repository focus and compatibility
- Key API functions and exact signatures (parse, stringify, validate, version, v7)
- Byte formats used by parse/stringify
- UUID v7 specifics and generation options
- Integration pattern for encoding libraries (shorthand for UUID encoding)

Repository focus and compatibility
The uuidjs/uuid repository provides generation, parsing, validation, and stringification utilities for UUIDs including modern variants such as v6 and v7. It exposes a small API surface that converts between canonical UUID strings and byte-array representations suitable for binary encodings.

Key API functions and signatures
- parse(uuid: string, buffer?: Uint8Array, offset?: number) -> Uint8Array
  - Parses a canonical UUID string (with dashes) into a 16-byte array. If a buffer is provided the result is written into it starting at offset and the same buffer is returned; otherwise a new Uint8Array(16) is returned.
- stringify(bytes: ArrayLike<number>, offset?: number) -> string
  - Converts a 16-byte array (or array-like) at optional offset into the canonical UUID string with dash separators.
- validate(uuid: string) -> boolean
  - Returns true when the input matches the UUID format and checksum rules.
- version(uuid: string) -> number
  - Returns the numeric version of the UUID (1, 3, 4, 5, 6, 7, etc.).
- v7(options?: object) -> string
  - Generates a UUIDv7 string. Options may include random seed data and time sources; consult the library for exact option keys. The function returns a canonical UUID string.

Byte formats used by parse/stringify
- The library uses a 16-byte representation for binary forms. When using encode/decode pipelines, treat the 16-byte Uint8Array as the canonical binary payload for UUID encodings.

UUID v7 specifics and generation options
- UUIDv7 is a time-ordered UUID format. Generation APIs accept optional parameters to control the time source and randomness; generated output is a 36-character canonical UUID string (32 hex digits with 4 dashes).

Integration pattern for encoding libraries (shorthand for UUID encoding)
1. Shorthand encode pipeline:
   - Remove dashes from canonical UUID string to obtain 32 hex characters.
   - Parse or convert the hex into a 16-byte Uint8Array (use parse(uuid) or manual hex parsing).
   - Reverse the bytes if the encoding convention requires byte-order reversal.
   - Call the selected encoding's encode(Uint8Array) -> string.
2. Shorthand decode pipeline:
   - Call selected encoding's decode(string, outLength=16) -> Uint8Array.
   - Reverse bytes if encode reversed them.
   - Convert the 16 bytes into the canonical UUID string using stringify(bytes).

Reference details
- parse(uuid: string, buffer?: Uint8Array, offset?: number) -> Uint8Array
  - Input: canonical UUID string (with dashes). Output: 16-byte Uint8Array.
- stringify(bytes: ArrayLike<number>, offset?: number) -> string
  - Input: Array-like of 16 bytes. Output: canonical UUID string (36 chars including dashes).
- v7(options?: {msecs?: number, rand?: number[] | Uint8Array}) -> string
  - options.msecs: epoch milliseconds to use for timestamp fields (optional).
  - options.rand: entropy source override (optional).

Best practices
- For round-trip binary encodings of UUIDs always use a fixed-length decode target (16 bytes) to preserve leading zeros.
- Use parse/stringify helpers from the uuid package to avoid mistakes in manual hex parsing and dash placement.
- When implementing shorthand (strip dashes -> encode -> reverse), document the byte-order reversal convention so other implementations interoperate.

Digest
- Source: https://github.com/uuidjs/uuid
- Retrieved: 2026-03-27
- Bytes fetched: 467390

Attribution
- Extracted API signatures and integration patterns from the uuidjs repository landing pages and documentation to provide exact method-level guidance for implementing UUID encode/decode pipelines.
