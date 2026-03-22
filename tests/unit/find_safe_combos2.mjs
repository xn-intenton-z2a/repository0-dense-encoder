import { createState, simulate, autopilot } from '../../src/lib/main.js';

const safe = [];
for (let altitude of [100,200,300,400,500,600,700,800,900,1000,1200,1500,2000]){
  for (let velocity of [0,5,10,15,20,25]){
    for (let fuel of [0,1,2,3,5,8,10,12,15,20,25,30]){
      const st0 = createState({altitude, velocity, fuel});
      const trace = simulate(st0, autopilot);
      const last = trace[trace.length-1];
      if (last.landed && !last.crashed){
        safe.push({altitude,velocity,fuel});
      }
    }
  }
}
console.log(JSON.stringify(safe, null, 2));
