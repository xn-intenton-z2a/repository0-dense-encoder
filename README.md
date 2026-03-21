# repo

This repository is powered by [intentiö n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## FizzBuzz Examples

This project implements two small helper functions: fizzBuzz and fizzBuzzSingle.

- fizzBuzz(n) -> returns an array of strings for integers 1..n applying Fizz/Buzz rules
- fizzBuzzSingle(n) -> returns the FizzBuzz string for a single positive integer

Examples:

```js
import { fizzBuzz, fizzBuzzSingle } from './src/lib/main.js';

console.log(fizzBuzzSingle(3)); // => "Fizz"
console.log(fizzBuzzSingle(5)); // => "Buzz"
console.log(fizzBuzzSingle(15)); // => "FizzBuzz"
console.log(fizzBuzzSingle(7)); // => "7"

console.log(fizzBuzz(15));
// => ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

Edge cases:
- fizzBuzz(0) returns []
- Negative numbers throw RangeError
- Non-integers throw TypeError

## Getting Started

(remaining README unchanged — see the repository for full instructions)
