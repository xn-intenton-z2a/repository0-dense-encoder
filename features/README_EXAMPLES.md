# README_EXAMPLES

## Summary
Add concise README examples that show library usage, CLI usage, and the documented error semantics, and provide a small runnable example in the examples directory.

## Motivation
Good examples lower the barrier to using the library and make the acceptance criteria easier to verify by humans and CI reviewers.

## Implementation
- Update README.md with short examples demonstrating how to import and call the named exports and how to run the CLI for a single integer.
- Include a note on input validation and the exceptions thrown for invalid inputs.
- Add a minimal example file in examples/ that demonstrates calling fizzBuzz for a small n and shows the expected output.

## Acceptance Criteria
- README.md contains usage examples for both the library API and the CLI that match the implemented behaviour.
- The examples directory contains at least one runnable example demonstrating the functions and their expected outputs.
- The README documents error handling for negative and non-integer inputs.