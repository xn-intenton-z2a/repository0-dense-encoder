# LIBRARY_API

Summary
Provide the library API surface: named exports fizzBuzz and fizzBuzzSingle from src/lib/main.js and a minimal CLI entrypoint for demonstration.

Motivation
Ensure consumers can import and run FizzBuzz core functions and enable simple CLI usage during development.

Scope
- Export named functions fizzBuzz(n) -> string[] and fizzBuzzSingle(n) -> string from src/lib/main.js.
- Provide a CLI entrypoint at src/lib/main.js that accepts a single integer argument and prints lines to stdout for demonstration.

Acceptance Criteria
- src/lib/main.js exports named functions fizzBuzz and fizzBuzzSingle.
- Importing the module and calling fizzBuzzSingle(3) returns "Fizz".
- Calling fizzBuzz(15) returns an array of length 15 with the final element "FizzBuzz".
- A minimal CLI at node src/lib/main.js 15 prints the expected lines to stdout (one line per result).