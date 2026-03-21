# repository0

A JavaScript library for computing Hamming distances between strings (by Unicode code points) and non-negative integers (by bit differences).

## API

Named exports (from src/lib/main.js):

- hammingString(a, b)
  - Computes Hamming distance between two strings by Unicode code points.
  - Throws TypeError if arguments are not strings.
  - Throws RangeError if strings have different lengths in code points.

- hammingInt(a, b)
  - Computes Hamming distance between two non-negative integers by counting differing bits.
  - Throws TypeError if arguments are not integers.
  - Throws RangeError if integers are negative.

- name, version, description, getIdentity()
  - Library identity exports.

## Examples

import { hammingString, hammingInt } from './src/lib/main.js';

console.log(hammingString('karolin', 'kathrin')); // 3
console.log(hammingString('', '')); // 0
console.log(hammingInt(1, 4)); // 2
console.log(hammingInt(0, 0)); // 0

## Website

Open src/web/index.html in a browser to see a small demo that imports the library and displays example outputs.
