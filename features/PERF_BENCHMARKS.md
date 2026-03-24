# PERF_BENCHMARKS

Overview

Add a small, reproducible benchmark script to measure encode/decode performance for a 16-byte UUID and a few common input sizes. The goal is maintenance-facing: small regressions are visible and performance-sensitive paths can be prioritised.

Goals

- Provide an examples/benchmarks script runnable with node that reports mean time per encode/decode for each encoding.
- Collect and document a baseline result and make it easy to re-run locally.

Acceptance Criteria

- A benchmark script is provided under examples/benchmarks/benchmark.js (implementation task for a follow-up change) and is runnable with node.
- The feature spec documents how to run the benchmark: node examples/benchmarks/benchmark.js --runs 1000.
- The README or docs include the recorded baseline numbers and a note describing how to interpret the results.

Implementation Notes

- Keep the benchmark lightweight: synchronous runs with process.hrtime.bigint or performance.now and no external dependencies.
- Benchmarks are optional in CI but should be runnable locally by contributors.

---
