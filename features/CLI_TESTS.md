# CLI_TESTS

Summary
Add deterministic unit tests for the command-line interface shipped by the library entrypoint (src/lib/main.js). These tests ensure the CLI uses the library API, validates inputs, and produces the same outputs as the programmatic functions.

Scope
- Add tests in tests/unit/cli.test.js that run the CLI via a child process (spawnSync or equivalent) and assert stdout, stderr and exit codes.
- Verify the CLI delegates to the exported fizzBuzz and fizzBuzzSingle functions rather than re-implementing logic.
- Cover valid input, non-integer input and negative input scenarios.

Acceptance Criteria
- tests/unit/cli.test.js exists and is runnable with npm test and contains tests that invoke node src/lib/main.js.
- Running node src/lib/main.js 15 exits with code 0 and prints fifteen newline-separated results whose final line equals FizzBuzz.
- Running node src/lib/main.js 2.5 exits with a non-zero code and prints an error message indicating a TypeError occurred.
- Running node src/lib/main.js -1 exits with a non-zero code and prints an error message indicating a RangeError occurred.
- Each CI/test run asserts the CLI output matches the programmatic fizzBuzz(15) result array.
