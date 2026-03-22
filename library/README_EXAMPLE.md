README_EXAMPLE

NORMALISED EXTRACT:
Table of contents:
- Example simulation run (default initial state)
- Example autopilot usage and output

Example simulation output (default initial conditions):
- Initial: { altitude: 1000, velocity: 40, fuel: 25, tick: 0, landed: false, crashed: false }
- Tick 1: { altitude: 958, velocity: 42, fuel: 25, tick: 1 }
- Tick 2: { altitude: 916, velocity: 42, fuel: 25, tick: 2 }
- ... (coast phase) ...
- Approaching ignition: { altitude: 60, velocity: 38, fuel: 20, tick: N }
- Full burn sequence reduces velocity rapidly; example final states:
- Final: { altitude: 0, velocity: 3, fuel: 5, tick: M, landed: true, crashed: false }

Example usage (plain text):
import { createState, simulate, autopilotController, scoreLanding } from 'src/lib/main.js'
const state = createState()
const trace = simulate(state, autopilotController)
console.log('Final', trace[trace.length - 1])
console.log('Score', scoreLanding(trace, state.fuel))

DETAILED DIGEST:
Sources used to craft the example and algorithms: see SOURCES.md; retrieval captured on 2026-03-22; sizes available in API_EXPORTS.md.
