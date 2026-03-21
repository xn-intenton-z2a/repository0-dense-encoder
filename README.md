# repository0 — Hamming distance library

A small JavaScript library for computing Hamming distances between equal-length strings (by Unicode code points) and between non-negative integers (by differing bits).

Usage

Named exports are available from `src/lib/main.js`:

- hammingDistanceStrings(a, b): compares Unicode code points and returns number of differing positions. Throws TypeError for non-strings and RangeError for unequal lengths.
- hammingDistanceIntegers(a, b): compares non-negative integers by bits and returns the number of differing bits. Throws TypeError for non-integers and RangeError for negative values.

Examples

Strings:

```js
import { hammingDistanceStrings } from './src/lib/main.js';
console.log(hammingDistanceStrings('karolin', 'kathrin')); // 3
console.log(hammingDistanceStrings('', '')); // 0
```

Integers:

```js
import { hammingDistanceIntegers } from './src/lib/main.js';
console.log(hammingDistanceIntegers(1, 4)); // 2 (001 vs 100)
console.log(hammingDistanceIntegers(0, 0)); // 0
```

Website

Open `src/web/index.html` in a modern browser to see a small demo that displays the library identity and example Hamming distances.

License: MIT
