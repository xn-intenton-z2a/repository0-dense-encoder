# PERF_PROFILING

Summary
Add profiling guidance and a small profiling script to locate hotspots in simulate/step and to support low-risk optimisations.

Scope
- Provide a profiling command or script that runs the bench workload under Node.js profiling or simple timing hooks
- Document typical hotspots and low-risk micro-optimisations (e.g., avoid unnecessary object allocations in hot loops)
- Keep the library API unchanged; profile-only additions are opt-in

Acceptance Criteria
- A profiling guide and example command are present in the feature doc
- The feature references examples/bench.js as the workload for profiling
- The doc lists 3 low-risk optimisation ideas with rationale and testable assertions about unchanged behaviour
