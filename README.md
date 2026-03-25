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

```bash
npx @xn-intenton-z2a/agentic-lib init --purge --mission 7-kyu-understand-fizz-buzz
```

This resets the repository to a clean state with your chosen mission in `MISSION.md`. The default mission is **fizz-buzz** (7-kyu).

## UUID encoding comparison

This library explores dense binary-to-text encodings. The benchmark is a v7 UUID (16 bytes). Below are typical lengths for a UUID encoded with different encodings implemented in this project.

| Encoding | Charset size | Approx bits/char | UUID length (chars) |
|---------:|-------------:|-----------------:|--------------------:|
| hex      | 16           | 4.00             | 32                  |
| base64 (no padding) | 64 | 6.00 | 22 |
| base62   | 62           | ~5.95            | 22                  |
| base85   | 85           | ~6.41            | 20                  |
| base89 (printable ASCII without ambiguous chars) | 89 | ~6.48 | 20 |

Use the library to compare encodings from code or the demo website.

---

(See `src/lib/main.js` for the implementation of the encoders, `src/web/` for the demo, and `tests/unit/` for unit tests.)
