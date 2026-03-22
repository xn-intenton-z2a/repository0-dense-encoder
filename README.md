# repo

A small lunar-lander simulation library and demo.

This repository demonstrates a simple 1D lunar lander physics model, an autopilot controller, scoring, and a small website demo.

## Usage

Import the library and run a short simulation using the built-in autopilot:

```js
import { createState, simulate, autopilot } from './src/lib/main.js';

const initial = createState();
const trace = simulate(initial, autopilot);
console.log('Trace length:', trace.length);
console.log('Final state:', trace[trace.length - 1]);
```

Example output (shortened 6-state excerpt showing a safe landing):

```
Trace length: 22
Final state: { altitude: 0, velocity: 3, fuel: 5, tick: 21, landed: true, crashed: false }

Trace excerpt:
{
  altitude: 1000,
  velocity: 40,
  fuel: 25,
  tick: 0,
  landed: false,
  crashed: false
}
{
  altitude: 998,
  velocity: 2,
  fuel: 15,
  tick: 1,
  landed: false,
  crashed: false
}
...
{
  altitude: 2,
  velocity: 3,
  fuel: 5,
  tick: 21,
  landed: true,
  crashed: false
}
```

See `tests/unit/` for automated tests covering physics, autopilot behaviour, edge cases, and scoring.
