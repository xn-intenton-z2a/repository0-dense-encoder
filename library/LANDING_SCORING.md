LANDING_SCORING

NORMALISED EXTRACT:
Table of contents:
- Scoring formula
- Function signature
- Examples

Scoring formula:
- If trace ends with crashed === true then score = 0
- Else score = (initialFuel - fuelRemaining) * 10 + Math.max(0, (4 - landingVelocity) * 25)

Function signature:
- scoreLanding(trace: Array<state>, initialFuel: number) -> number
- landingVelocity is the velocity value in the final state of the trace

Examples:
- Crash: scoreLanding([...crashTrace], 25) -> 0
- Perfect soft landing: initialFuel 25, fuelRemaining 25 (no fuel used), landingVelocity 0 => (25-25)*10 + (4-0)*25 = 100
- Typical: initialFuel 25, fuelUsed 5, landingVelocity 3 => (5)*10 + (4-3)*25 = 50 + 25 = 75

SUPPLEMENTARY DETAILS:
- Fuel used is computed as initialFuel - finalState.fuel
- If final state is landed but landingVelocity missing, use absolute final velocity

REFERENCE DETAILS:
Plain implementation pattern:
function scoreLanding(trace, initialFuel) {
  const final = trace[trace.length-1];
  if (final.crashed) return 0;
  const fuelUsed = initialFuel - final.fuel;
  const landingVelocity = Math.abs(final.velocity);
  return fuelUsed * 10 + Math.max(0, (4 - landingVelocity) * 25);
}

DETAILED DIGEST:
Sources retrieved 2026-03-22: scoring formula derived from mission spec and validated against kinematics sources listed in SOURCES.md; see API_EXPORTS.md for downloaded byte sizes.
