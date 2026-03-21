# FIZZBUZZ_CORE

## Summary
Implement the core library functions for the FizzBuzz mission and ensure they are exported as named exports from the source module.

## Motivation
Provide a correct, minimal, and well-documented library implementation that is directly testable by unit tests and consumable by the website and examples.

## Implementation
- Add two named exports in src/lib/main.js: fizzBuzz and fizzBuzzSingle.
- fizzBuzz(n) returns an array of strings representing numbers from 1 to n where multiples of 3 are replaced with Fizz, multiples of 5 with Buzz, and multiples of both with FizzBuzz.
- fizzBuzzSingle(n) returns the single-string result for a single integer input using the same replacement rules.
- Functions must be pure and synchronous and not produce side effects.
- Ensure exports are standard ES module named exports so tests and the web demo can import them.

## Acceptance Criteria
- fizzBuzz(15) returns an array of 15 strings whose last element is FizzBuzz.
- fizzBuzzSingle(3) returns Fizz.
- fizzBuzzSingle(5) returns Buzz.
- fizzBuzzSingle(15) returns FizzBuzz.
- fizzBuzzSingle(7) returns 7.
- fizzBuzz(0) returns an empty array.
- The two functions are exported as named exports from src/lib/main.js and can be imported by tests and the website.