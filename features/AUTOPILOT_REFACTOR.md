# AUTOPILOT_REFACTOR

Summary
The core autopilot was implemented and exported from src/lib/main.js; this feature has been converted into a maintenance task to make the autopilot tunable and to add deterministic tests that increase confidence for future refactors.

Scope
- Expose an optional options object to the autopilot controller: autopilot(state, options)
- Options should be a plain object with documented keys (example: margin, hysteresis, lookaheadLimit) and must not change default behaviour when omitted
- Add unit tests that verify deterministic outputs when the same options and state sequences are provided
- Add a short examples snippet (examples/default.js) demonstrating using the options object
- Keep backward compatibility: existing callers that call autopilot(state) continue to work

Acceptance Criteria
- autopilot accepts an optional second argument (options) and returns an integer thrustUnits when provided
- Default behaviour is unchanged when options is omitted; existing unit tests continue to pass
- Unit tests added to tests/unit/ which verify deterministic outputs for 5 example option sets
- README updated with a short usage note describing the options object and linking to examples/default.js
