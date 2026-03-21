# repo

This repository provides a small library for computing Hamming distances between equal-length Unicode strings and non-negative integers (bitwise).

## API

From `src/lib/main.js` the following named exports are available:

- hammingString(a, b): number
  - Compare two strings by Unicode code points. Throws TypeError if inputs are not strings. Throws RangeError if strings have unequal length in code points.

- hammingInt(a, b): number
  - Compare two non-negative integers and count differing bits. Throws TypeError if inputs are not integers. Throws RangeError if inputs are negative.

- name, version, description, getIdentity(), main()

## Usage Examples

String Hamming distance (Unicode-aware):

```js
import { hammingString } from './src/lib/main.js';

console.log(hammingString('karolin', 'kathrin')); // 3
console.log(hammingString('', '')); // 0
console.log(hammingString('a😊b', 'a😃b')); // 1 (emoji differs)
```

Integer Hamming distance (bitwise):

```js
import { hammingInt } from './src/lib/main.js';

console.log(hammingInt(1, 4)); // 2 (001 vs 100)
console.log(hammingInt(0, 0)); // 0
```

## Behaviour and Errors

- hammingString throws TypeError if either argument is not a string.
- hammingString throws RangeError if the strings are not the same length when counted as Unicode code points.
- hammingInt throws TypeError if either argument is not an integer.
- hammingInt throws RangeError if either argument is negative.

## Running tests

Install dependencies and run tests:

```bash
npm ci
npm test
```
