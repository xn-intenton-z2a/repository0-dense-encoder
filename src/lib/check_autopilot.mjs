#!/usr/bin/env node
import { createState, step, simulate, autopilot } from './main.js';

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

function runOne(cfg) {
  console.log('--- cfg', JSON.stringify(cfg));
  let st = createState(cfg);
  for (let i = 0; i < 50 && !(st.landed || st.crashed); i++) {
    const burn = autopilot({ ...st });
    const next = step(st, burn);
    console.log(`tick ${st.tick} burn ${burn} -> v:${next.velocity} alt:${next.altitude} fuel:${next.fuel} landed:${next.landed} crashed:${next.crashed}`);
    st = next;
  }
  console.log('FINAL', st);
}

for (const cfg of combos) {
  runOne(cfg);
}
