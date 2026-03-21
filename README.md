# repo

A small library for computing Hamming distances between strings (Unicode-aware) and between non-negative integers (bitwise).

Usage examples

Node / ESM:

```js
import { hammingString, hammingBits } from './src/lib/main.js';

console.log(hammingString('karolin', 'kathrin')); // 3
console.log(hammingString('', '')); // 0

console.log(hammingBits(1, 4)); // 2
console.log(hammingBits(0, 0)); // 0
```

Browser (website demo)

The website at `src/web/index.html` imports the library and shows identity and example outputs. The browser entry re-exports from the library at `src/web/lib.js`.

API

- hammingString(a, b): number
  - Computes Hamming distance between two strings by Unicode code points.
  - Throws TypeError if arguments are not strings.
  - Throws RangeError if strings have different lengths (in Unicode code points).

- hammingBits(x, y): number
  - Computes number of differing bits between two non-negative integers.
  - Throws TypeError if arguments are not integers.
  - Throws RangeError if any argument is negative.

License: MIT
