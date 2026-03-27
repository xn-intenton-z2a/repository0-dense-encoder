# BENCHMARK_SUITE

Purpose

Provide a small, reproducible benchmark script and guidance to measure encoding density and throughput for each supported encoding so contributors can compare speed and compactness trade-offs.

Description

Add an examples/benchmarks run script that:

- Generates N random 16-byte UUID buffers (configurable, default 10000)
- For each registered encoding measures average encode time, average decode time, ops/sec and average encoded length
- Emits a small summary (CSV or JSON) showing encoding name, bits per char, avg encoded length, encode ops/sec, decode ops/sec

Acceptance criteria

- The feature spec includes a runnable example path (examples/benchmarks/run.js) and documents how to run it with node
- Benchmark output contains for each encoding: name, bitsPerChar, avgEncodedLength, encodeOpsPerSec, decodeOpsPerSec
- README references the benchmark script and shows sample output for at least one run

Notes

This feature is for measurement; keep the script simple and dependency-free. If long runs are undesirable in CI, document a smaller run configuration for CI use.