WIKIPEDIA_FIZZ_BUZZ

TABLE OF CONTENTS:
1. Canonical rule
2. Example sequence
3. Implementation patterns
4. Edge case handling (mission-specific)
5. Complexity
6. Supplementary technical notes
7. Reference details (function signatures and patterns)
8. Digest (source excerpt and retrieval date)
9. Attribution and data size

NORMALISED EXTRACT:
Canonical rule:
For each positive integer i starting at 1:
- if i mod 15 equals 0 then output FizzBuzz
- else if i mod 3 equals 0 then output Fizz
- else if i mod 5 equals 0 then output Buzz
- else output the decimal numeral of i as a string

Example sequence for 1..15:
1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz

IMPLEMENTATION PATTERNS:
- Loop approach: initialize empty array, push computed string for each i = 1..n
- Functional approach: Array.from({length: n}, (_, i) => fizzBuzzSingle(i + 1))
- Single-value function fizzBuzzSingle(n) implements modulo checks in this order: 15, 3, 5
- Use integer modulo (%) on integers; avoid floating rounding errors

EDGE CASES (mission-specific):
- n === 0 -> return [] (explicit short-circuit)
- n < 0 -> throw RangeError('n must be non-negative integer')
- non-integer n -> throw TypeError('n must be integer')

COMPLEXITY:
- Time complexity: O(n)
- Space complexity: O(n) for the returned array

SUPPLEMENTARY DETAILS:
- Use Number.isInteger(n) to detect non-integers without coercion
- Prefer strict numeric checks and explicit error types for invalid input
- For very large n, consider streaming or generator approaches to avoid memory pressure

REFERENCE DETAILS:
- fizzBuzz(n: number) -> string[]
  - Validate: if (!Number.isInteger(n)) throw TypeError
  - if (n < 0) throw RangeError
  - if (n === 0) return []
  - Implementation pattern: return Array.from({length: n}, (_, i) => fizzBuzzSingle(i + 1))

- fizzBuzzSingle(n: number) -> string
  - Validate using Number.isInteger and positive check per mission
  - Algorithm (ordered checks):
    if (n % 15 === 0) -> 'FizzBuzz'
    else if (n % 3 === 0) -> 'Fizz'
    else if (n % 5 === 0) -> 'Buzz'
    else -> String(n)

DIGEST (extracted content, retrieved 2026-03-21):
"Fizz Buzz is a group word game for children, used to teach division; for numbers 1 to 15 the sequence is 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz."

ATTRIBUTION:
Source: https://en.wikipedia.org/wiki/Fizz_buzz
Crawl bytes: ~66.8 KB
