# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Hamming distance utilities

This library provides two named exports for computing Hamming distance:

- hammingString(a, b): compute Hamming distance between two equal-length strings measured by Unicode code points. Throws TypeError if inputs are not strings and RangeError if lengths differ.
- hammingBits(x, y): compute Hamming distance between two non-negative integers by counting differing bits. Throws TypeError for non-integers and RangeError for negative values.

Usage examples:

```js
import { hammingString, hammingBits } from './src/lib/main.js';

console.log(hammingString('karolin', 'kathrin')); // 3
console.log(hammingString('', '')); // 0

console.log(hammingBits(1, 4)); // 2
console.log(hammingBits(0, 0)); // 0
```

The rest of the README and project description remains unchanged; see the repository homepage for more details.
