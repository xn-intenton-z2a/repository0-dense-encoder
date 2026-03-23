# PERFORMANCE_BENCHMARK

Summary
Add a lightweight, reproducible benchmark to detect regressions in simulate/step performance and document baseline metrics for local comparison.

Scope
- Provide examples/bench.js that runs a configurable number of randomized simulations and measures per-simulation time and tick counts
- Record a local baseline in the feature doc and document recommended run parameters (e.g., N=1000 for coarse baseline, N=100 for quick local runs)
- Keep the bench script decoupled from CI by default; document how to add it to CI as an optional job

Acceptance Criteria
- examples/bench.js is present and executable (node examples/bench.js) and prints: total simulations, median ticks, median simulation time (ms), total runtime (ms)
- Feature doc records a small baseline example and explains how to interpret the metrics
- Running the bench script does not modify repository files or library API
