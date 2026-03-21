# BEHAVIOUR_TESTS

Summary
Add an end-to-end behaviour test that exercises the web demo UI (src/web/) using Playwright to ensure the demo is served and the UI computes results using the library API.

Scope
- Create a Playwright test at tests/behaviour/web-demo.spec.js that opens the built docs or dev server, enters an input (e.g., 15), submits the form and asserts the rendered list contains fifteen items and that the fifteenth item equals FizzBuzz.
- The test should verify the demo uses the exported fizzBuzz function by checking consistent output with the unit tests.
- Ensure tests run via npm run test:behaviour (Playwright) or equivalent.

Acceptance Criteria
- tests/behaviour/web-demo.spec.js exists and runs with the repository's Playwright configuration.
- The behaviour test navigates to the demo page, inputs 15, submits, and the page renders 15 result lines with the last line equal to FizzBuzz.
- The behaviour test passes in CI and locally and is included in the test:behaviour script path for maintainers to run.
