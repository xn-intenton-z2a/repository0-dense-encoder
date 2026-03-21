# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

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

## FizzBuzz Examples

The library exports two named functions: `fizzBuzz(n)` and `fizzBuzzSingle(n)`.

- `fizzBuzz(n)` returns an array of strings for the range 1..n with multiples of 3 replaced by "Fizz", multiples of 5 by "Buzz", and multiples of both by "FizzBuzz".
- `fizzBuzzSingle(n)` returns the FizzBuzz string for a single positive integer.

Node (ESM) example:

```js
import { fizzBuzz, fizzBuzzSingle } from './src/lib/main.js';

console.log(fizzBuzz(15));
// [ '1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz' ]

console.log(fizzBuzzSingle(3)); // 'Fizz'
console.log(fizzBuzzSingle(5)); // 'Buzz'
console.log(fizzBuzzSingle(7)); // '7'
```

Behavior and errors:

- `fizzBuzz(0)` returns `[]`.
- Negative numbers throw `RangeError`.
- Non-integer inputs throw `TypeError`.

See `tests/unit/fizzbuzz.test.js` for the test suite covering normal and edge cases.

## Updating

The `init` workflow updates the agentic infrastructure automatically. To update manually:

```bash
npx @xn-intenton-z2a/agentic-lib@latest init --purge
```

## Links

- [MISSION.md](MISSION.md) — your project goals
- [agentic-lib documentation](https://github.com/xn-intenton-z2a/agentic-lib) — full SDK docs
- [intenti&ouml;n website](https://xn--intenton-z2a.com)
