# EXAMPLES_DIR

Summary
Create a small examples directory with runnable demos to help new contributors reproduce behaviour quickly and to support documentation examples.

Scope
- Add examples/default.js: a minimal runnable script that uses the public API to simulate default landing and prints a short summary of initial and final state
- Add examples/bench.js: a script that runs many randomized simulations and prints timing and tick-count statistics
- Ensure examples only use public API and include a short README link in the main README

Acceptance Criteria
- examples/default.js and examples/bench.js exist in the repository and are executable with node
- README links to examples and shows sample output for the default example
- Tests or documentation reference the examples location so contributors can find them easily
