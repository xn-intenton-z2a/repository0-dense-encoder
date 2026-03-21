# Sources

Reference material and documentation sources for this project.

- https://www.rfc-editor.org/rfc/rfc4122.html  — RFC 4122: A Universally Unique IDentifier (UUID) URN Namespace; canonical UUID byte layout and string format
- https://datatracker.ietf.org/doc/html/rfc4648  — RFC 4648: Base16/Base32/Base64 encoding standard (padding, alphabets, length calculations)
- https://en.wikipedia.org/wiki/Binary-to-text_encoding  — Binary-to-text encoding overview, length/efficiency considerations
- https://en.wikipedia.org/wiki/Base64  — Base64 encoding overview, alphabet, padding rules, length calculations
- https://en.wikipedia.org/wiki/Ascii85  — Ascii85 (Base85) encoding: Adobe Ascii85 details and special-case optimizations
- https://rfc.zeromq.org/spec:32/  — Z85 specification (ZeroMQ): alphabet, block size, no-special-shortcuts variant of base85
- http://base91.sourceforge.net/  — basE91 specification and reference implementation (higher density base91)
- https://en.wikipedia.org/wiki/Base62  — Base62 variants, common alphabets and implementation notes
- https://en.wikipedia.org/wiki/Base58  — Base58 alphabet and rationale (excludes ambiguous characters: 0,O,1,l,I)
- https://en.wikipedia.org/wiki/ASCII#Printable_characters  — Printable ASCII characters (U+0021..U+007E), recommended charset for custom encodings
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array  — MDN reference: Uint8Array and TypedArray usage for binary buffers in JS
- https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder  — MDN TextEncoder/Decoder for UTF-8 conversions when needed
- https://nodejs.org/api/buffer.html  — Node.js Buffer API: creating and converting binary data (Buffer.from, toString('base64'), etc.)
- https://github.com/uuid6/uuid7  — UUIDv7 project and reference implementations (time-ordered UUID v7 format, byte layout and examples)
