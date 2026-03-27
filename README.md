# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## UUID encoding comparison (example)

For the mission of dense binary-to-text encodings a v7 UUID (16 bytes) encodes to different lengths depending on the alphabet density. Example lengths (no padding unless shown):

| Representation | Characters |
|----------------|------------|
| Hex (baseline) | 32 |
| Base64 (no padding) | 22 |
| base62 (digits+letters) | 22 |
| base85 (Z85 variant) | 20 |
| base91 (densest builtin) | 20 |

This project implements base62, base85 (Z85-like), and a base91 implementation and exposes helpers to create custom encodings and compare densities.

## Reproducing the comparison locally

You can reproduce the UUID encoding comparison locally without any build step. From the project root run:

1. Install dependencies:

   npm ci

2. Run unit tests:

   npm test

3. Run the behaviour (Playwright) tests which start a local server and open the demo page:

   npm run test:behaviour

4. Quickly print encoding lengths for a sample UUID using Node's dynamic import (Linux/macOS example):

   node -e "import('./src/lib/main.js').then(m=>{ const uuid='01234567-89ab-cdef-0123-456789abcdef'; console.log('UUID:', uuid); for(const e of m.listEncodings()){ const enc = m.encodeUUID(e.name, uuid); console.log(`${e.name}\t${e.charsetSize}\t${e.bitsPerChar.toFixed(2)}\t${enc.length}\t${enc}`); } })"

The above prints each registered encoding, its charset size, bits per character, encoded UUID length, and the encoded value.

(See src/lib/main.js for the public API: encode, decode, listEncodings, createEncoding, encodeUUID, decodeUUID.)

(Original README content preserved below.)
