# AUTOPILOT_REFACTOR

# Summary
Refactor the built-in autopilot into a pure, named export and improve testability and swapping ability.

# Scope
- Make autopilotController a named export from src/lib/main.js
- Ensure controller signature is (state, options?) -> integer thrustUnits and is deterministic
- Provide an options object for tuning (e.g., margin, hysteresis) without internal side effects
- Update simulate to accept controller as a parameter if not already doing so

# Acceptance Criteria
- autopilotController is exported as a named export and covered by unit tests
- simulate accepts a controller parameter and behaves identically when autopilotController is supplied
- Unit tests verify autopilotController lands safely with default initial conditions and across at least 10 configurations
- Public API remains backwards-compatible except for clarified named exports; README updated with usage example