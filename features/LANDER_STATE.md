# LANDER_STATE

Purpose

Define the canonical lander state shape and a factory for creating initial states used across the library and tests.

Description

The lander state is a plain object describing the simulator at a discrete tick. Implement a factory function that produces an initial state given optional overrides. The canonical fields are: altitude, velocity, fuel, tick, landed, crashed. The factory should provide repository-wide defaults: altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false. The state objects must be plain objects and treated immutably by library functions (each step returns a new state object).

API contract

- Provide a named export createLanderState(initialOverrides) that returns a state object.
- initialOverrides is an optional plain object with keys altitude, velocity, fuel.
- The returned state's fields must be numbers where appropriate and booleans for landed and crashed.

Acceptance criteria

- [ ] createLanderState with no arguments returns a state with altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false.
- [ ] createLanderState allows overriding altitude, velocity and fuel and sets tick to 0 and landed/crashed to false.
- [ ] The return value is a plain object with the exact keys altitude, velocity, fuel, tick, landed, crashed.
- [ ] The factory does not mutate the provided overrides object.
- [ ] Tests can import createLanderState from src/lib/main.js and verify the above.
