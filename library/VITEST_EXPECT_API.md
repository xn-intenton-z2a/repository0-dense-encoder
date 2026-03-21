VITEST_EXPECT_API

Normalised extract (direct, implementation-focused)
- expect(received) returns a Matchers object exposing synchronous matchers used for assertions.
- Common matcher signatures relevant to fizzBuzz:
  - toBe(expected) compares with strict equality (===) and is intended for primitives.
  - toEqual(expected) performs deep equality check for arrays and objects.
  - toThrow(expected?) asserts that a function throws; expected may be an Error constructor, string, or RegExp.
  - toHaveLength(n) asserts the length property equals n.
- Usage patterns for mission acceptance criteria:
  - Assert fizzBuzz(0) equals empty array: expect(fizzBuzz(0)).toEqual([])
  - Assert fizzBuzzSingle(3) equals "Fizz": expect(fizzBuzzSingle(3)).toBe("Fizz")
  - Assert thrown error type: expect(() => fizzBuzz(-1)).toThrow(RangeError)
  - Assert non-integer input triggers TypeError: expect(() => fizzBuzz(1.5)).toThrow(TypeError)

Table of Contents
1. expect core behavior
2. Matcher signatures and parameter types
3. Common usage patterns for fizzBuzz tests
4. Error matching detail

Detailed matcher signatures (practical reference)
- expect(received: any): Matchers
- Matchers.toBe(expected: any): void  -- strict equality comparison
- Matchers.toEqual(expected: any): void  -- deep equality (arrays/objects)
- Matchers.toThrow(expected?: string | RegExp | ErrorConstructor): void  -- verifies the function throws; if expected is provided, it is matched against the thrown error
- Matchers.toHaveLength(expected: number): void  -- checks length property

Error matching details
- When using toThrow(ErrorConstructor) the matcher checks the thrown object's prototype chain for instanceof ErrorConstructor.
- When using toThrow("string") the matcher checks that the thrown error message contains the provided substring.
- When using toThrow(/regex/) the matcher tests the error message against the regex.

Detailed digest
- Source: https://vitest.dev/api/expect.html
- Retrieved: 2026-03-21
- Bytes retrieved during crawl: 514216
- Extract focuses on matcher signatures and precise parameter/behaviour details needed to write the unit tests that satisfy the mission acceptance criteria.

Attribution
- Original source: Vitest Expect API
- URL: https://vitest.dev/api/expect.html
- Data bytes fetched: 514216
