# LANDER_STATE

Purpose

Define the canonical lander state shape and provide a factory for creating initial states used across the library and tests.

Description

The lander state is a plain object describing the simulator at a discrete tick. Implement a factory function exported as createState(initialOverrides) that returns an initial state object. Canonical fields: altitude, velocity, fuel, tick, landed, crashed. Defaults: altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false. The factory must not mutate its input and must return plain objects.

API contract

- Provide a named export createState(initialOverrides).
- initialOverrides is an optional plain object with keys altitude, velocity, fuel.
- Returned object must contain numeric altitude, velocity, fuel, numeric tick and boolean landed and crashed.

Acceptance criteria

- [x] createState() with no arguments returns altitude 1000, velocity 40, fuel 25, tick 0, landed false, crashed false.
- [x] createState allows overriding altitude, velocity and fuel and always sets tick to 0 and landed/crashed to false.
- [x] The returned value is a plain object with exactly the keys altitude, velocity, fuel, tick, landed, crashed.
- [x] The factory does not mutate the provided overrides object.
- [x] Tests import createState from src/lib/main.js and validate the contract.
