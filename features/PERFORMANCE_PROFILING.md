# PERFORMANCE_PROFILING

Description
Add profiling and microbenchmarking support to identify CPU hotspots in encode/decode paths and provide actionable, low-risk refactor suggestions to improve throughput.

# ACCEPTANCE CRITERIA

- Provide examples/perf/profile.js that:
  - Runs encode and decode microbenchmarks for each encoding over configurable iterations.
  - Emits a JSON report with per-encoding metrics: opsPerSec, meanMs, medianMs, p95Ms, sampleCount.
  - Supports an optional --profile flag that either runs node --prof or writes perf_hooks events to a file for post-processing.
- Include guidance in the feature spec for interpreting results and a short checklist of recommended refactors (e.g., precomputed lookup tables, avoid per-byte allocation, memoize bit-packing for fixed-length inputs).
- Add a smoke test idea: tests/unit/perf.test.js that runs the script with a small iteration count and asserts the JSON report contains expected keys.

# IMPLEMENTATION NOTES

- Keep tooling dependency-free (Node built-ins) and make output machine-parseable for CI consumption.
- Avoid performance changes in this spec; the spec is for measurement and low-risk optimisation recommendations only.