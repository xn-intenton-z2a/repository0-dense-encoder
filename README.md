# repo — Dense binary-to-text encoding experiments

A JavaScript library exploring dense printable encodings for binary data. The benchmark: produce the shortest printable representation of a UUID (v7 recommended).

Features implemented in this transform:

- Named encodings with encode/decode for Uint8Array inputs
- Built-in encodings: base62, base85 (Z85 alphabet), base91, printable89 (custom dense charset)
- Define custom encodings from a charset string via defineEncoding(name, charset)
- UUID shorthand: uuidToShort(uuidString, encodingName) and uuidFromShort(shortString, encodingName)
- listEncodings() returns metadata: name, bitsPerChar, charsetSize

UUID comparison (16 bytes / 128 bits):

| Representation | Characters |
|----------------|------------|
| hex (UUID)     | 32         |
| base64 (no pad)| 22         |
| base62         | 22         |
| base85         | 20         |
| base91         | 20         |
| printable89    | 20         |

These lengths are typical for a 16-byte UUID using the encodings provided in this repository (see src/lib/main.js).

Usage (node):

```js
import { encode, decode, listEncodings, uuidToShort, uuidFromShort } from './src/lib/main.js';

const bytes = new Uint8Array([1,2,3]);
const s = encode(bytes, 'base91');
const out = decode(s, 'base91');

// uuid shorthand
const short = uuidToShort('01234567-89ab-cdef-0123-456789abcdef', 'base91');
const round = uuidFromShort(short, 'base91');
```

Run tests:

```bash
npm ci
npm test
```
