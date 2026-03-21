# CLI_TOOL

Overview

Provide a minimal command-line interface so users can compute Hamming distances from the terminal using the library entry point. The CLI is intended as a thin wrapper that reuses the library functions and their validation rather than duplicating logic.

Behavior

- The script accepts a mode argument followed by two operands.
- Mode string: interpret the two operands as strings and print the Hamming distance computed by hammingString to standard output, then exit with status 0.
- Mode bits: interpret the two operands as non-negative integers (decimal or bigint where supported), compute the bit-level Hamming distance with hammingBits, print the numeric result to standard output, and exit with status 0.
- For invalid mode or invalid operands print a concise error message to standard error and exit with a non-zero status.

API

- The module exposes the main entry point used by the npm script start:cli and by direct invocation with node.
- main(argv) should accept an argv array or default to process.argv.slice(2) and return an exit code for easier unit testing.

Acceptance Criteria

- Running the CLI with mode string and operands karolin and kathrin prints 3 to stdout and exits with status 0.
- Running the CLI with mode bits and operands 1 and 4 prints 2 to stdout and exits with status 0.
- Invalid inputs (wrong mode, non-integer bits, negative numbers) cause a non-zero exit and produce a validation message on stderr.
- README examples reference the CLI usage so it is discoverable by users and tests.

Notes for implementer

- Keep CLI parsing minimal; delegate validation to the library functions so behaviour is consistent across APIs.
- Return numeric exit codes from main for easier testing rather than calling process.exit from deep code paths.