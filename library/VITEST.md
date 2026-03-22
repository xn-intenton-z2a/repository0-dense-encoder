VITEST

Table of contents:
1. Installation and CLI
2. Test API: describe/test/expect
3. Configuration options and file
4. Running, watch mode, and reporters
5. Coverage provider and integration

Normalised extract (key technical details):
- Vitest is a Vite-native test runner providing describe/test (or it) and expect APIs; tests can run in node or jsdom environments configured via the test environment option.
- Installation: add vitest as a dev dependency and add scripts such as test: vitest or use npx vitest. CLI flags include --run, --watch, --coverage, --reporter.
- Configuration: create vitest.config.js (or package.json test config) to set test environment, include/exclude patterns, globals, setup files, and coverage provider (for example, @vitest/coverage-v8).
- Test API: describe(name, fn) groups tests; test(name, fn) or it(name, fn) defines test cases; expect(value).toBe/ toEqual / toContain / toMatchSnapshot etc. are available assertions.

Supplementary details (implementation-focused):
- Key config fields: test: { include: ['tests/**/*.test.{js,ts}'], environment: 'node' | 'jsdom', globals: boolean, setupFiles: ['path/to/setup.js'] }
- Running in CI: use vitest --run --coverage; configure coverage provider and reporters in config.
- Mocking and isolation: vitest supports module mocking similar to Jest; use vi.mock to mock module imports in tests.

Reference details (API signatures and options):
- describe(name: string, fn: () => void) groups tests
- test(name: string, fn: () => void | Promise<void>) defines a test case
- expect(received).toBe(expected) strict equality; expect(received).toEqual(expected) deep equality
- Configuration example keys: test.environment, test.include, test.exclude, test.setupFiles, coverage.provider

Digest (extracted on 2026-03-22):
- Source: Vitest guide (https://vitest.dev/guide/)
- Retrieval date: 2026-03-22
- Data size retrieved: 122518 bytes

Attribution:
- Content condensed from Vitest official guide and documentation.
