# README_EXAMPLES

Overview

Add concise usage examples to README.md demonstrating how to import and use the library functions from Node and in the web demo.

Examples required

- Import named exports from src/lib/main.js and call hammingString and hammingBits. Include the example inputs and expected outputs: 'karolin' vs 'kathrin' => 3 and 1 vs 4 => 2.
- CLI example: show how npm run start:cli will print library identity and illustrate an example invocation that computes a simple Hamming value.
- Web integration note: document how src/web/lib.js re-exports the library for browser demos and reference lib-name and lib-version placeholders used by web tests.

Acceptance Criteria

- README contains short, testable examples for hammingString and hammingBits using the specified example outputs.
- README mentions CLI usage and web integration points used by tests.