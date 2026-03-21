TITLE: NPM_HAMMING_DISTANCE

Table of contents:
1. Package summary and API surface
2. Typical usage patterns
3. Limitations and compatibility notes
4. Implementation hints derived from package readme
5. Digest and retrieval metadata
6. Attribution and data size

1. Package summary and API surface
- Package name: hamming-distance (npm)
- Typical export: a function that computes Hamming distance between inputs (may accept strings or integers depending on package). Verify compatibility before use.

2. Typical usage patterns
- Install via npm i hamming-distance
- Call: const distance = require('hamming-distance')(a, b) or import { hamming } from 'hamming-distance' depending on module type.
- Beware: package pages sometimes protected by Cloudflare; package content should be validated by installing and reading package source when using in production.

3. Limitations and compatibility notes
- NPM package page required JS and cookies to view full readme in the crawl; crawler saw Cloudflare challenge HTML.
- Do not rely solely on package page for API details; install and inspect package source or use package repo for authoritative API signatures.

4. Implementation hints derived from package readme
- Many small packages implement Hamming by converting strings to arrays of characters and comparing indices, or by XOR for numeric inputs; follow mission input validation rules (TypeError, RangeError) and Unicode code point handling.

5. Digest and retrieval metadata
- Retrieved: 2026-03-21
- Source: https://www.npmjs.com/package/hamming-distance
- Crawl note: page returned Cloudflare blocking content; 7201 bytes captured but content contains JS challenge page rather than full README.

6. Attribution and data size
- Source: npmjs.com — package hamming-distance
- Crawl size: 7201 bytes (HTML, challenge page)
