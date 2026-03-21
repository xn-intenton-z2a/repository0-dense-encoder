# Dense Encoder

This project explores dense binary-to-text encodings with printable characters. The goal is to produce the shortest printable representation of a 16-byte UUID.

## UUID encoding length comparison (example UUID: 01234567-89ab-cdef-0123-456789abcdef)

| Encoding       | Charset size | Bits/char | Encoded length (chars) |
|----------------|--------------:|----------:|------------------------:|
| Hex (baseline) |           16 |     4.00  | 32                      |
| Base64 (no pad)|           64 |     6.00  | 22                      |
| base62         |           62 |     5.95  | 22                      |
| base85         |           85 |     6.41  | 20                      |
| base91         |           91 |     6.51  | 20                      |
| high-density   | (printable ASCII excluding ambiguous) | ~6.48 | 20 |

Example usage (browser demo): open `src/web/index.html` to see a live encoding table.

## API

Named exports (from `src/lib/main.js`):

- `encode(bytes: Uint8Array, encodingName: string)` → string
- `decode(text: string, encodingName: string)` → Uint8Array
- `createEncoding(name: string, charset: string)` → encoding object
- `listEncodings()` → array of encoding metadata
- `encodeUUID(uuid: string, encodingName: string)` → shorthand for UUID encoding (hex stripped, encode, reversed)

## License

MIT
