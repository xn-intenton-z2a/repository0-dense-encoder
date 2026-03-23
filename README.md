# repository0 — Dense encoder experiments

This project explores dense printable encodings for binary data, with the benchmark of producing the shortest printable representation of a 16-byte UUID.

Features
- Named encodings: base62, base85 (Z85 alphabet), base91, base94
- Create custom encodings from a charset string (custom encodings must exclude visually ambiguous characters: 0/O/1/l/I)
- encode(name, Uint8Array) and decode(name, string)
- encodeUuid(name, uuidString) helper (strips dashes, encodes 16 bytes, and returns reversed string)
- listEncodings() returns metadata: { name, bitsPerChar, charsetSize }

UUID encoding comparison (sample)

| Encoding | Charset size | bits/char (approx) | sample UUID length |
|---------:|-------------:|-------------------:|-------------------:|
| hex      | 16           | 4.00               | 32                 |
| base64   | 64           | 6.00               | 22                 |
| base62   | 62           | 5.95               | 22                 |
| base85   | 85           | 6.41               | 20                 |
| base91   | 91           | 6.51               | 20                 |
| base94   | 94           | 6.55               | 20                 |

Usage (node / browser):

import { encode, decode, listEncodings, createEncoding, encodeUuid } from './src/lib/main.js';

const buf = new Uint8Array([1,2,3,4]);
const s = encode('base62', buf);
const back = decode('base62', s);

// create custom encoding
const custom = createEncoding('ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789');
const c = custom.encode(buf);
const d = custom.decode(c);

See `tests/unit/encodings.test.js` for more examples and edge-case tests.
