# DOCS_EXAMPLES

Summary
A minimal README example exists, but runnable example scripts are missing. Provide a small examples directory with a copy-pasteable default script and a simple benchmark script so contributors can reproduce behaviour locally.

Scope
- Create examples/default.js that imports the public API and prints a simulation trace for default initial conditions
- Create examples/bench.js that runs N randomized simulations and prints simple timing statistics (median tick count, median time)
- Update README to link to examples and include a short sample output matching examples/default.js

Acceptance Criteria
- examples/default.js is present and executable with node; when run it prints an array-like trace or summary consistent with README
- examples/bench.js is present and executable with node and prints timing and tick statistics for a configurable N
- README links to the examples directory and shows sample output for the default example
- tests/unit include a check for the presence of example files (or this is documented as a follow-up test change)
