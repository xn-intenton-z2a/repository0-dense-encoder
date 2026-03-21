NPM_PACKAGES

Normalised extract — key technical points (directly actionable)

base62
- Package: base62 (npm latest 2.0.2). Homepage: https://github.com/base62/base62.js. Installs via npm i base62.
- Charset: default ASCII character set of 62 characters: digits 0-9, lowercase a-z, uppercase A-Z. Effective bits per character = log2(62) ≈ 5.954 bits/char.
- Primary API primitives and effect:
  - indexCharset(charsetString) => internal charset index (prepare custom charset for use).
  - encode(value, [charsetIndex]) => string. Encodes a numeric value or other supported input to a base62 string using the provided charset index or the default ASCII charset.
  - decode(string, [charsetIndex]) => number or decoded value. Decodes a base62 string back to its original numeric/value representation when the input represents a number or encoded data.
- Implementation notes: library exposes a legacy-compatible API plus modularized submodules (lib/ascii, lib/custom) for efficient importing. Custom charset strings are accepted and may be converted with indexCharset; the function expects 62 unique characters for canonical behavior.

base91
- Package: base91 (npm latest 0.0.5). Homepage: https://github.com/mscdex/base91.js. Installs via npm i base91.
- Purpose: denser binary-to-text encoding than base64; encodes arbitrary byte data into an ASCII string.
- API signatures and behaviour:
  - encode(data) => string. Accepts string or Array-like binary (Buffer, Uint8Array, Array) and returns a base91 encoded string.
  - decode(encodedString) => Buffer | Uint8Array | Array. Returns a Buffer in Node.js, otherwise a Uint8Array where available or a plain Array as fallback.
- Implementation notes: Works in Node and browser environments. Use encode/decode for round-trip transforms of binary buffers (Uint8Array/Buffer).

ascii85
- Package: ascii85 (npm latest 1.0.2). Homepage: https://github.com/huandu/node-ascii85. Installs via npm i ascii85.
- Purpose: Ascii85 / Base85 binary-to-text encoding mapping 4 bytes → 5 printable chars, more efficient than base64 in bits/char.
- API and configuration parameters:
  - encode(data, [options]) => Buffer. Accepts string or Buffer. Options may be either an array of 85 characters (custom mapping) or an options object with properties:
    - table: array[85] — a custom mapping table of 85 characters to use instead of default alphabet.
    - delimiter: boolean — controls presence/absence of ascii85 delimiters (implementation-specific flag present in options object).
    - groupSpace: boolean — controls grouping of spaces and shorthand 'u' expansion.
  - decode(str, [table]) => Buffer. Decodes ascii85-encoded string or Buffer; optional table parameter supplies custom mapping table used for decoding.
- Implementation notes: encode returns a Buffer (for performance). Options provide exact control over character mapping and delimiter usage to match different Ascii85 flavors (Adobe Ascii85 vs ZeroMQ Z85 mapping is a separate mapping specification).

z85 (ZeroMQ Z85)
- Package: z85 (npm latest 0.0.2). Homepage: https://github.com/msealand/z85.node. Installs via npm i z85.
- Purpose: ZeroMQ Z85 is a base85 alphabet variant specified by ZeroMQ (RFC-style spec: rfc.zeromq.org/spec:32). Z85 encodes binary sequences to printable characters with a fixed 85-character alphabet and specific block alignment; commonly used where the Z85 alphabet and no delimiters are required.
- API signatures:
  - encode(bytes: Buffer | Uint8Array) => string. Encodes binary bytes (length multiple-of-4 for direct blocks; implementations may pad internally for non-multiple-of-4 lengths) to Z85 string.
  - decode(str: string) => Buffer. Decodes a Z85 string back to binary Buffer.
- Implementation notes: Example behavior in the package demonstrates deterministic round-trip for the reference test vectors in the Z85 spec; use Buffer in Node.js for best interoperability.

uuid7 (note)
- The GitHub repository https://github.com/uuid6/uuid7 is the authoritative reference for UUID v7 byte layout and transformations; the package name uuid7 is not available in the npm registry at the requested endpoint (registry returned no metadata). Use the GitHub repository source and its README for canonical v7 layout and examples.

Supplementary details — metadata extracted from npm registry (retrieved 2026-03-21)
- base62
  - name: base62
  - latest dist-tag: 2.0.2
  - version: 2.0.2
  - homepage: https://github.com/base62/base62.js
  - repository: git+https://github.com/base62/base62.js.git
  - readme snippet: first 2k chars captured (installation, usage, indexCharset, modular API)
  - retrieved size field (unpacked estimate from registry): 26500 bytes (unpackedSize present in metadata)
- base91
  - name: base91
  - latest dist-tag: 0.0.5
  - version: 0.0.5
  - homepage: https://github.com/mscdex/base91.js#readme
  - repository: git+ssh://git@github.com/mscdex/base91.js.git
  - readme snippet: includes API descriptions for encode/decode and environment-specific return types
  - unpacked size: not provided in registry metadata
- ascii85
  - name: ascii85
  - latest dist-tag: 1.0.2
  - version: 1.0.2
  - homepage: https://github.com/huandu/node-ascii85
  - repository: git://github.com/huandu/node-ascii85.git
  - readme snippet: includes encode/decode function semantics, options object and custom table description
  - unpacked size: not provided in registry metadata
- z85
  - name: z85
  - latest dist-tag: 0.0.2
  - version: 0.0.2
  - homepage: https://github.com/msealand/z85.node
  - repository: https://github.com/msealand/z85.node.git
  - readme snippet: demonstrates encode/decode example matching Z85 spec test vector
  - unpacked size: not provided in registry metadata
- uuid7
  - npm registry lookup returned no package metadata for "uuid7"; authoritative source is GitHub: https://github.com/uuid6/uuid7

Reference details — exact API signatures and parameter semantics (as extracted)
- base62
  - indexCharset(charsetString) -> internal charset index (prepare custom charset string for use). Expect charsetString length = 62 unique characters for canonical mapping.
  - encode(value, [charsetIndex]) -> string. Accepts numeric values and legacy inputs; when using the modular submodules, encode maps numeric inputs to base62 representation using specified charset.
  - decode(string, [charsetIndex]) -> numeric value or decoded value depending on input semantics used when encoding.
- base91
  - encode(data: string | Buffer | Uint8Array | ArrayLike) -> string. Encodes arbitrary binary to base91 string.
  - decode(encoded: string) -> Buffer | Uint8Array | Array. Returns Buffer on Node.js, a Uint8Array where available in browsers, otherwise an Array fallback.
- ascii85
  - encode(data: string | Buffer, [options]) -> Buffer. Options may be an array of 85 characters or an option object with keys: table (array[85]), delimiter (boolean), groupSpace (boolean).
  - decode(str: string | Buffer, [table]) -> Buffer. Optional table uses a custom 85-char mapping for decoding.
- z85
  - encode(bytes: Buffer | Uint8Array) -> string. Deterministic mapping following ZeroMQ Z85 alphabet and block-handling rules.
  - decode(str: string) -> Buffer. Deterministic reverse mapping following Z85 spec.

Practical best practices and implementation notes (concrete)
- Use Uint8Array as the canonical binary input type in public APIs (encode/decode) to maintain browser and Node parity; convert Node Buffers using Buffer.from(u8) or new Uint8Array(buffer) as needed.
- For round-trip correctness: when encoding arbitrary binary use encoders that accept/return Buffer/Uint8Array and ensure decode returns the same binary content (byte-for-byte equality). Test with edge vectors: empty buffer, single byte, all 0x00 (16 bytes), all 0xFF (16 bytes), and 16-byte UUID buffers.
- For UUID shorthand: strip hyphens from canonical UUID string to produce 32 hex digits, convert into 16 bytes in big-endian order, then apply the chosen encoding. When representing the shortest printable form prefer encodings with higher bits/char: base91 and z85 variants typically produce fewer characters for a 16-byte input than base64 (22 chars no padding).
- For custom encodings using printable ASCII (U+0021..U+007E): construct a charset string from allowed characters excluding ambiguous characters {"0","O","1","l","I"}. Compute bits per character as log2(charset_size) and compute expected encoded length = ceil(16*8 / bits_per_char) for a 16-byte UUID.

Detailed digest — sources retrieved and retrieval metadata
- Retrieved: 2026-03-21T18:41:41Z (UTC) — npm registry metadata fetched from registry.npmjs.org for these packages.
- base62: registry.npm.org/base62 (JSON metadata), readme snippet, unpacked size ~26500 bytes recorded.
- base91: registry.npm.org/base91 (JSON metadata), readme snippet present.
- ascii85: registry.npm.org/ascii85 (JSON metadata), readme snippet present.
- z85: registry.npm.org/z85 (JSON metadata), readme snippet present.
- uuid7: registry lookup returned no package metadata at registry.npm.org/uuid7; authoritative code and README is at https://github.com/uuid6/uuid7.

Attribution and data size obtained during crawling
- registry.npm.org/base62 — retrieved JSON metadata; readme snippet captured (approx 26 KB of unpacked README text extracted).
- registry.npm.org/base91 — retrieved JSON metadata; readme snippet captured (size not provided in registry metadata).
- registry.npm.org/ascii85 — retrieved JSON metadata; readme snippet captured (size not provided).
- registry.npm.org/z85 — retrieved JSON metadata; readme snippet captured (size not provided).
- github.com/uuid6/uuid7 — not fetched in this run; listed as authoritative repository for UUID v7 layout.

Reference: source URLs (as listed in updated SOURCES.md)
- https://rfc-editor.org/rfc/rfc4122.html
- https://datatracker.ietf.org/doc/html/rfc4648
- https://en.wikipedia.org/wiki/Binary-to-text_encoding
- https://en.wikipedia.org/wiki/Base64
- https://en.wikipedia.org/wiki/Ascii85
- https://rfc.zeromq.org/spec:32/
- http://base91.sourceforge.net/
- https://en.wikipedia.org/wiki/Base62
- https://en.wikipedia.org/wiki/Base58
- https://en.wikipedia.org/wiki/ASCII#Printable_characters
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
- https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
- https://nodejs.org/api/buffer.html
- https://github.com/uuid6/uuid7
- https://www.npmjs.com/package/base62
- https://www.npmjs.com/package/base91
- https://www.npmjs.com/package/ascii85
- https://www.npmjs.com/package/z85
- https://www.npmjs.com/package/uuid7 (registry lookup returned no metadata)

Attribution
- Package metadata and README snippets retrieved from the npm registry (registry.npmjs.org) on 2026-03-21. Each package retains its original license and repository attribution as listed in its registry metadata and repository homepages.

End of NPM_PACKAGES document.
