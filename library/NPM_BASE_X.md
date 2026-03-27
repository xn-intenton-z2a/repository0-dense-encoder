NPM_BASE_X

Normalised extract

Table of contents
- Purpose and API surface
- Alphabet constraints and charset validation
- encode/decode function signatures and behaviors
- Internal algorithmic approach (array-division vs BigInt)
- Performance and interoperability notes

Purpose and API surface
The base-x package provides a small factory that accepts a charset string (alphabet) and returns an encoder/decoder pair for that base. Typical usage constructs an instance with a specific alphabet (for base58, base62, etc.) and then calls encode/decode on binary data.

Alphabet constraints and charset validation
- Alphabet must be a string of unique printable characters; its length defines the base (2..n).
- Implementations must validate that the alphabet contains no duplicate characters and that its length is >= 2.
- For human-friendly alphabets omit ambiguous glyphs (0/O, 1/l/I) as a project policy if required.

encode/decode function signatures and behaviors
- baseX(alphabet: string) -> Encoder
  - Encoder.encode(input: Uint8Array | Buffer) -> string
  - Encoder.decode(input: string) -> Uint8Array
- encode: converts binary input into the textual representation using the provided alphabet; no padding characters are emitted.
- decode: converts textual representation back to bytes; throws on invalid characters.

Internal algorithmic approach
- Instead of relying on BigInt, base-x uses a repeated division algorithm operating on an array of bytes for portability and to avoid large integer libraries. The algorithm repeatedly divides the byte array by the base and records remainders to produce encoded digits.
- This algorithm is stable for arbitrary-length inputs and is well-suited to environments lacking BigInt or where predictable memory usage is required.

Performance and interoperability notes
- For short fixed-length inputs (e.g., 16-byte UUIDs) a BigInt-based implementation is typically faster and simpler to implement.
- For large or streaming inputs base-x's array-division approach avoids constructing a single huge integer and provides predictable memory patterns.
- The returned encoder/decoder pair enforces the alphabet ordering chosen at construction; document this order to ensure cross-language compatibility.

Reference details
- factory: baseX(alphabet: string) -> { encode(input: Uint8Array|Buffer) -> string, decode(input: string) -> Uint8Array }
- alphabet length = base (implementation must validate >1)

Digest
- Source: https://www.npmjs.com/package/base-x (package page and linked GitHub repository)
- Retrieved: 2026-03-27
- Bytes fetched: 7192

Attribution
- Condensed from the base-x package description and source code comments; provides the necessary API signatures and algorithmic patterns to implement compatible encoders/decoders using custom alphabets.
