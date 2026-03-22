# README_EXAMPLE

Purpose

Describe the example usage and example simulation output to be added to the project README so users and reviewers can see a successful landing trace.

Description

Update README.md to include a short usage section showing how to import the library and run a simulation with the built-in autopilot, and include example output showing the trace of states leading to a safe touchdown. The example should be brief and human readable so it can be validated by reviewers and included in the acceptance criteria.

Example expectations

- The README must show how to run the CLI: node src/lib/main.js and how to run tests: npm test.
- The README must display a small excerpt of the simulation trace, for example a sequence of 6 to 12 states showing altitude, velocity and fuel decreasing followed by a final landed state with velocity less or equal to 4.

Acceptance criteria

- [ ] README.md contains a usage section describing how to run the library and the CLI.
- [ ] README.md includes a short example trace demonstrating a successful landing with the autopilot.
- [ ] The example is consistent with the library's public API and can be reproduced by running the CLI.
