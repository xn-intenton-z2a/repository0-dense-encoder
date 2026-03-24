# PERF_BENCHMARKS

Overview

Add a lightweight benchmark script so maintainers can re-run a quick performance baseline for encode/decode paths locally.

Goals

- Provide a single-file benchmark under examples/benchmarks/benchmark.js that can be run with node and reports average encode/decode times for a 16-byte UUID and a few larger inputs.

Acceptance Criteria

- examples/benchmarks/benchmark.js exists and accepts a --runs N argument (default 1000).
- The script measures and prints mean and median times (in microseconds) for encode and decode for each built-in encoding.
- README documents how to run the benchmark and records the repository baseline numbers (optional manual update accepted).

Implementation Notes

- Use performance.now() or process.hrtime.bigint() for timing; keep the script dependency-free.
- Benchmarks are for local use only — not required in CI.

---
