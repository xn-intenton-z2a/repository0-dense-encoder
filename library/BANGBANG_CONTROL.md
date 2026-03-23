BANGBANG_CONTROL

Table of contents
- Definition and characteristics
- Applicability to lander autopilot
- Implementation pattern (discrete thrust decisions)
- Safety considerations and limits
- Supplementary and reference details

Definition and characteristics
- Bang–bang control switches between extreme control actions (full-on or full-off) based on thresholds.
- For a discrete fuel-thrust lander, bang-bang means burning either 0 or some maximal integer units determined by policy.

Applicability to lander autopilot
- Simple autopilots may use bang-bang to cut thrust when velocity below threshold or apply maximal thrust to reduce velocity when above threshold.
- Advantages: simple, deterministic, minimal parameter tuning. Disadvantages: may oscillate near target velocity.

Implementation pattern
- controller(state): if predicted landing velocity without thrust > safe threshold then apply required thrustUnits (possibly as many units as available or needed), else 0.
- Use one-tick prediction: predict v_next = state.velocity + gravity - 4*maxBurn and check altitude and fuel tradeoffs.

Safety considerations
- Clamp thrust to available fuel; avoid oscillation by introducing hysteresis: require margin before toggling thrust on/off.

Reference details
- Source: https://en.wikipedia.org/wiki/Bang%E2%80%93bang_control

Crawl digest
- Retrieved 2026-03-23; extracted definition and control patterns relevant to discrete autpilot for lander.

Attribution
- Wikipedia: Bang–bang control
