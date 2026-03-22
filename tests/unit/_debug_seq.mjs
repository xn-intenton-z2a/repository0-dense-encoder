import('../../src/lib/main.js').then(({ createState, step, simulate, autopilot }) => {
  const cfg = { altitude: 500, velocity: 20, fuel: 10 };
  let s = createState(cfg);
  console.log('START', JSON.stringify(s));
  for (let t = 0; t < 100; t++) {
    if (s.landed || s.crashed) break;
    const burn = autopilot(s);
    console.log('TICK', t, 'burn', burn, 'before', JSON.stringify(s));
    s = step(s, burn);
    console.log('      after', JSON.stringify(s));
  }
  console.log('END', JSON.stringify(s));
}).catch(e => { console.error(e); process.exit(1); });
