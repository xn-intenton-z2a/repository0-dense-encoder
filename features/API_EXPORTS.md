# API_EXPORTS

Purpose

Specify the public API surface and the requirement that the library exports named functions for consumers and tests.

Description

Ensure src/lib/main.js exports the following named functions: createLanderState, step, simulate, autopilot, scoreLanding. The module should also support being run as a CLI (node src/lib/main.js) to produce an example simulation output, but named exports must be available for programmatic consumption.

Acceptance criteria

- [ ] The named exports createLanderState, step, simulate, autopilot and scoreLanding are present in src/lib/main.js.
- [ ] Tests import the named exports and exercise the functions directly.
- [ ] Running node src/lib/main.js prints a short example trace to stdout (used by README example tests).
