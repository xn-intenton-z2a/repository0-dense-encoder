# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Getting Started

### Step 1: Create Your Repository

Click **"Use this template"** on the [repository0](https://github.com/xn-intenton-z2a/repository0) page, or use the GitHub CLI:

```bash
gh repo create my-project --template xn-intenton-z2a/repository0 --public --clone
cd my-project
```

### Step 2: Initialise with a Mission

Run the init workflow from the GitHub Actions tab (**agentic-lib-init** with mode=purge), or use the CLI:

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
