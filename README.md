# Dense Encoder Demo

This repository explores dense binary-to-text encodings aimed at producing the shortest printable representation of binary data (benchmark: v7 UUIDs).

## Available encodings

- base62 — 0-9a-zA-Z
- base85 — Z85-like printable set
- base91 — extended printable ASCII

## UUID comparison (128-bit UUID)

| format | length |
|--------|--------:|
| hex (32 chars) | 32 |
| base64 (no padding) | 22 |
| base62 | 22 |
| base85 | 20 |
| base91 | 20 |


## Usage (Node)

Import the library and call the exported functions:

```js
import { encode, decode, listEncodings, createEncoding, encodeUuidShorthand } from './src/lib/main.js';

const data = new Uint8Array([0,1,2,3]);
const encoded = encode('base62', data);
const back = decode('base62', encoded);

console.log(encoded, back);
```

## Website

Open `src/web/index.html` in a browser (or run `npm run start`) to see a demo and comparison table.
