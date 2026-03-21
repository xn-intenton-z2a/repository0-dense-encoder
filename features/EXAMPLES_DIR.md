# EXAMPLES_DIR

Summary
Provide runnable example code that demonstrates library usage in Node and in the browser; examples live in the examples/ directory and are referenced by the README and web demo.

Scope
- Add examples/node/usage.js showing how to import the named exports and print fizzBuzz(15) to stdout.
- Add examples/browser/index.html (and minimal JS) demonstrating how the web demo integrates the library and renders results to the page.
- Ensure README links to the examples and describes how to run them locally.

Acceptance Criteria
- examples/node/usage.js shows importing { fizzBuzz, fizzBuzzSingle } from the library and printing results; it can be run with node examples/node/usage.js and outputs fifteen lines for input 15.
- examples/browser/index.html loads a small script that calls fizzBuzz(15) and renders the results; opening the HTML in a modern browser shows the expected list ending with FizzBuzz.
- README.md contains links and short instructions for running both examples so that users can reproduce the outputs locally.
