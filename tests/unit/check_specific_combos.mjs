import { createState, simulate, autopilot } from '../../src/lib/main.js';

const combos = [
  { altitude: 2000, velocity: 25, fuel: 10 },
  { altitude: 2000, velocity: 25, fuel: 15 },
  { altitude: 2000, velocity: 25, fuel: 20 },
  { altitude: 2000, velocity: 25, fuel: 25 },
];

for (const cfg of combos) {
  const st0 = createState(cfg);
  const trace = simulate(st0, autopilot);
  const last = trace[trace.length - 1];
  console.log(cfg, '=> landed:', last.landed, 'crashed:', last.crashed, 'fuel left:', last.fuel);
}
