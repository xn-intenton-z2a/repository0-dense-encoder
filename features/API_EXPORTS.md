# API_EXPORTS

Purpose

Define the public API surface for the library and ensure tests and documentation rely on stable named exports.

Description

The library's public API must be exported as named exports from src/lib/main.js so consumers and tests can import functions directly. The canonical public surface required by the mission is: createState, step, simulate, autopilot, score. The module may also export helper utilities such as getIdentity and main for CLI support, but the five core functions above are required for the simulator and tests.

Acceptance criteria

- [ ] src/lib/main.js exports the named functions createState, step, simulate, autopilot and score as named exports.
- [ ] Tests import these named exports directly and exercise them (no default import required).
- [ ] The README contains a short usage example demonstrating simulate driven by autopilot and showing a small example trace, or the CLI prints the same example when invoked with a documented flag (either approach satisfies reviewers).
