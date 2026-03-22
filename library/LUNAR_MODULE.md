LUNAR_MODULE

Table of contents:
1. Vehicle role and descent engine characteristics
2. Fuel constraints and throttleability
3. Guidance, navigation and control considerations
4. Descent phase sequence and sensors

Normalised extract (key technical details):
- The Lunar Module (LM) carried a descent propulsion system intended for throttleable powered landing; throttleability enables modulation of thrust to control vertical descent rate and manage fuel consumption.
- Fuel is finite and must be budgeted across translational maneuvers; guidance computations plan the descent burn profile given current altitude, velocity, and remaining propellant.
- Guidance sensors used during descent: radar altimeter for precise altitude, inertial measurement for velocity/attitude, and telemetry for fuel/state monitoring.

Supplementary details (implementation-focused):
- Simulation abstraction: model the descent engine as a discrete-effect actuator where each unit of fuel burned reduces vertical velocity by a fixed delta (mission mapping: 1 fuel unit => 4 m/s reduction); gravity increases downward velocity by mission gravity per tick (2 m/s per tick).
- Control constraints: clamp commanded thrust to available fuel and to the thruster's maximum per-tick capability; ensure the simulation returns immutable state objects at each tick.

Reference details (specifications and patterns):
- Thrust mapping for simulation: thrust_units_burned * velocity_reduction_per_unit => instantaneous velocity reduction applied in per-tick update.
- Typical descent sequence: stabilization, approach, terminal descent (fine control of vertical velocity), touchdown initiation when altitude <= 0.

Digest (extracted on 2026-03-22):
- Source: Wikipedia — Lunar Module (https://en.wikipedia.org/wiki/Lunar_Module)
- Retrieval date: 2026-03-22
- Data size retrieved: 429098 bytes

Attribution:
- Content condensed from Wikipedia: Lunar Module.
