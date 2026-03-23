NODE_ESM

Table of contents
- Node ESM basics
- package.json "type" interaction
- Import/export examples and caveats

Node ESM basics
- Node supports ECMAScript modules via the "type": "module" flag in package.json or by using .mjs file extensions.
- Use import/export syntax; require() is not available for ESM modules without interop.

package.json "type" interaction
- This repository's package.json sets "type": "module"; use named exports as public API.

Import/export examples and caveats
- Export as: export function step(...) {}
- Import as: import { step } from './src/lib/main.js'
- When publishing ensure compatibility notes for older Node versions.

Crawl digest
- Retrieved Node ESM docs on 2026-03-23.

Attribution
- Node.js ESM documentation
