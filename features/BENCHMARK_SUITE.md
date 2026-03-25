# BENCHMARK_SUITE

Description
Define a lightweight benchmark in examples/ that measures average encoded UUID length and encode throughput for each encoding.

# ACCEPTANCE CRITERIA

- The feature specifies a script to be added to examples/benchmarks/ that:
  - Encodes N=1000 deterministic UUID byte arrays per encoding.
  - Reports average encoded length and average milliseconds per encode.
  - Produces a simple CSV or plain-text summary sortable by length and by time.
- The benchmark is documented in examples/benchmarks/README.md with run instructions.

# IMPLEMENTATION NOTES

- Keep the benchmark dependency-free and simple; rely on Node built-ins.
- Files to change: examples/benchmarks/bench.js and examples/benchmarks/README.md.