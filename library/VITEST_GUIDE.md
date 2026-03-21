VITEST_GUIDE

Normalised extract (direct, implementation-focused)
- Core test primitives:
  - describe(name, fn) groups tests; optional but useful for organization.
  - it(name, fn) or test(name, fn) declares a test case.
  - expect(received) returns a matcher object with assertion methods (toBe, toEqual, toThrow, etc.).
- Running tests:
  - The repository test script uses vitest; run via npm test which maps to vitest invocation in package.json.
  - Test files are located under tests/unit and follow pattern *.test.js by the npm script configuration.
- Assertions for edge cases required by mission:
  - To assert thrown errors: expect(() => fn()).toThrow(RangeError) or expect(() => fn()).toThrow("message substring") or expect(() => fn()).toThrow(/regex/).
  - To assert empty arrays: expect(result).toEqual([]) or expect(result).toHaveLength(0).
  - To assert exact string values: expect(value).toBe("Fizz") or expect(value).toBe("7") when numeric converted to string.

Table of Contents
1. Test primitives and structure
2. Running tests and file locations
3. Key matchers for this mission
4. Assertions for error types and messages
5. Implementation and test examples (patterns, not code blocks)

Detailed information
1. Test primitives and structure
- describe groups tests; it defines individual test cases. Tests can be synchronous or return a Promise for async behavior.

2. Running tests and file locations
- Use npm test to run vitest as configured. In this repo, tests/unit/*.test.js is the unit tests target for vitest.

3. Key matchers for this mission
- toBe(expected) compares by strict equality; use for primitive string checks.
- toEqual(expected) performs deep equality checks; use for arrays and objects.
- toHaveLength(n) asserts collection length.

4. Assertions for thrown errors
- Use expect(() => call()).toThrow(ErrorConstructor) to assert a specific error class (TypeError, RangeError).
- Use expect(() => call()).toThrow("substring") to assert error message contains substring.
- For non-integer input edge cases, assert expect(() => fizzBuzz(-1)).toThrow(RangeError) and expect(() => fizzBuzzSingle(1.2)).toThrow(TypeError).

5. Implementation guidance for tests
- Prefer explicit matcher usage: toThrow(TypeError) and toThrow(RangeError) for error class checks; toEqual([]) to verify empty arrays; toBe("Fizz") for single-result checks.

Reference details (exact API signatures)
- describe(name: string, fn: () => void): void
- it(name: string, fn: () => void | Promise<void>): void
- expect(received: any): Matchers
  - Matchers methods used: toBe(expected: any): void, toEqual(expected: any): void, toThrow(expected?: string | RegExp | ErrorConstructor): void, toHaveLength(expected: number): void

Detailed digest
- Source: https://vitest.dev/guide/
- Retrieved: 2026-03-21
- Bytes retrieved during crawl: 122499
- Extract focuses on test primitives, running tests, and the specific matchers and assertion patterns required to validate fizzBuzz behaviour and error handling.

Attribution
- Original source: Vitest Guide
- URL: https://vitest.dev/guide/
- Data bytes fetched: 122499
