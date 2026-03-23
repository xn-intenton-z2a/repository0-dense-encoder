# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. The project now includes a Lunar Lander simulation library with a built-in autopilot.

## Lunar Lander Example

The library exports a small API: createState, step, simulate, autopilot, score. A simple demo using defaults:

```js
import { createState, simulate, autopilot } from './src/lib/main.js';

const state = createState();
const trace = simulate(state, autopilot);
console.log('Steps:', trace.length - 1);
console.log('Initial:', trace[0]);
console.log('Final:', trace[trace.length - 1]);
```

Example successful landing trace (abbreviated):

[
  { altitude: 1000, velocity: 40, fuel: 25, tick: 0, landed: false, crashed: false },
  /* ... steps ... */
  { altitude: 0, velocity: 3.5, fuel: 8, tick: 32, landed: true, crashed: false }
]

Use `score(initialFuel, fuelUsed, landingVelocity, crashed)` to compute a numeric score for a landing.

See `tests/unit/lander.test.js` for full usage examples and behaviour expectations.
