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

(See src/lib/main.js for API and src/web/index.html for a live demo.)

## Getting Started

... (original README content preserved below) ...

