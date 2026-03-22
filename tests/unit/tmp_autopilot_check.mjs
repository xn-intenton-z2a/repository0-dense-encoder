import { createState, simulate, autopilot } from '../../src/lib/main.js';

const combos = [
  { altitude: 500, velocity: 20, fuel: 10 },
  { altitude: 600, velocity: 30, fuel: 10 },
  { altitude: 700, velocity: 40, fuel: 15 },
  { altitude: 800, velocity: 50, fuel: 20 },
  { altitude: 900, velocity: 60, fuel: 25 },
  { altitude: 1000, velocity: 70, fuel: 20 },
  { altitude: 1200, velocity: 80, fuel: 20 },
  { altitude: 1500, velocity: 35, fuel: 15 },
  { altitude: 2000, velocity: 25, fuel: 10 },
  { altitude: 1600, velocity: 45, fuel: 20 },
];

for (const cfg of combos) {
  const st0 = createState(cfg);
  const trace = simulate(st0, autopilot);
  const last = trace[trace.length - 1];
  console.log(JSON.stringify({cfg, landed: last.landed, crashed: last.crashed, ticks: trace.length-1, last}, null, 2));
}
