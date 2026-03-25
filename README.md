# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Dense encoding comparison (UUID sample)

The project focuses on compact printable encodings for binary data. Example lengths for the sample UUID `00112233-4455-6677-8899-aabbccddeeff`:

| Encoding | Charset size | Bits/char | Encoded length (chars) |
|---------:|-------------:|----------:|------------------------:|
| base62   | 62           | 5.954     | 22                     |
| base85   | 85           | 6.409     | 20                     |
| base91   | 91           | 6.507     | 20                     |

These are illustrative values; the website and unit tests compute actual lengths programmatically.

(Full README continues below — unchanged content preserved.)

---

