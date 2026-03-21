VITEST

TABLE OF CONTENTS:
1. Importing test helpers
2. Test signatures
3. Assertions (expect) API
4. Running tests (commands)
5. Example unit tests for fizzBuzz
6. Reference details
7. Digest and attribution

NORMALISED EXTRACT:
- Common imports:
  import { describe, it, test, expect } from 'vitest'
- Test signature:
  test(name: string, fn: () => void | Promise<void>) -> void
  it is an alias of test; describe groups tests
- Assertions:
  expect(received).toBe(expected)
  expect(received).toEqual(expected)
  expect(received).toThrow(errorConstructorOrMessage)

RUNNING TESTS:
- Project script: npm test (configured to run vitest tests/unit/*.test.js)
- Direct: npx vitest or npx vitest --run

EXAMPLE (plain text):
- test('fizzBuzzSingle(3) returns "Fizz"', () => { expect(fizzBuzzSingle(3)).toBe('Fizz') })
- test('fizzBuzz(0) returns []', () => { expect(fizzBuzz(0)).toEqual([]) })
- test('non-integer throws TypeError', () => { expect(() => fizzBuzz(3.5)).toThrow(TypeError) })

REFERENCE DETAILS:
- test(name, fn) -> void
- expect(value) returns a matcher object with toBe, toEqual, toThrow, etc.

DIGEST (extracted content, retrieved 2026-03-21):
"Vitest is a next generation testing framework powered by Vite; tests are defined with test() and assertions are made with expect()."

ATTRIBUTION:
Source: https://vitest.dev/guide/
Crawl bytes: ~119.6 KB
