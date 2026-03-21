WIKIPEDIA_FIZZBUZZ

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Rules
2. Example sequence (n=15)
3. Implementation notes
4. Complexity

1. Rules
- For each integer i from 1 to n inclusive:
  - If i is divisible by both 3 and 5: output the string FizzBuzz
  - Else if i is divisible by 3: output the string Fizz
  - Else if i is divisible by 5: output the string Buzz
  - Otherwise: output the decimal string representation of i

2. Example sequence (n=15)
1 => "1"
2 => "2"
3 => "Fizz"
4 => "4"
5 => "Buzz"
6 => "Fizz"
7 => "7"
8 => "8"
9 => "Fizz"
10 => "Buzz"
11 => "11"
12 => "Fizz"
13 => "13"
14 => "14"
15 => "FizzBuzz"

3. Implementation notes
- Single-pass generation from 1 to n. For each i evaluate divisibility by 3 and 5 using integer modulus.
- Correctness requires checking the both-divisible condition (3 && 5) before the individual checks to produce "FizzBuzz".
- Produce strings for every position; return an array of length n (or empty array for n=0).
- For performance: time complexity O(n), space complexity O(n) when returning the full sequence.

4. Complexity
- Time: O(n)
- Space: O(n) (output array). In-place streaming alternatives exist but the mission requires returning an array.

SUPPLEMENTARY DETAILS
- Input: integer n (positive). Output: array of length n of strings.
- Edge behaviour applied by project rules: n = 0 -> []; negative n -> throw RangeError; non-integers -> throw TypeError.
- Integer validation should use a robust numeric test (see MDN Number.isInteger for precise behaviour).

REFERENCE DETAILS
- Exact rule mapping required by implementation:
  - divisible by 3 and 5 -> "FizzBuzz"
  - divisible by 3 -> "Fizz"
  - divisible by 5 -> "Buzz"
  - otherwise -> decimal string form of the integer
- Example expected return for fizzBuzz(15) is the 15-element array shown in section 2.

DETAILED DIGEST
- Source URL: https://en.wikipedia.org/wiki/Fizz_buzz
- Retrieved: 2026-03-21
- Bytes fetched (truncated view used for extraction): 63473

ATTRIBUTION
- Derived from 'Fizz buzz' Wikipedia article (CC BY-SA). Use according to Wikimedia licensing.