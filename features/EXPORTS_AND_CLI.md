# EXPORTS_AND_CLI

## Summary
Ensure the library exposes the required named exports and provide a minimal CLI entry point for manual testing and examples used by the website.

## Motivation
Named exports make the library easy to import for tests and demos; a tiny CLI improves discoverability and allows quick manual checks.

## Implementation
- Export fizzBuzz and fizzBuzzSingle as named exports from src/lib/main.js.
- Implement a minimal CLI behaviour in src/lib/main.js: when the module is executed directly with a single integer argument, print the fizzBuzzSingle result for that integer to stdout and exit zero; when no or invalid arguments are provided, print a concise usage message and exit with a non-zero code.
- Reuse the existing npm script start:cli to run the CLI for manual checks and documentation examples.

## Acceptance Criteria
- The module exports include fizzBuzz and fizzBuzzSingle as named exports.
- Running node src/lib/main.js 3 prints Fizz to stdout and exits with status zero.
- Running node src/lib/main.js with no arguments prints a short usage message and exits non-zero.
- The CLI usage is described in README.md.