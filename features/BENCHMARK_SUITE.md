# BENCHMARK_SUITE

Description
Define a lightweight, dependency-free benchmark in examples/benchmarks/ that measures encoded UUID length and encode/decode throughput for each encoding and emits CSV and JSON summaries.

# ACCEPTANCE CRITERIA

- Add examples/benchmarks/bench.js that:
  - Accepts N (default 1000) and output format (csv|json).
  - Uses a deterministic set of 16-byte inputs (canonical UUID bytes) and measures:
    - average encoded length
    - encode ops/sec
    - decode ops/sec
    - median and 95th percentile times for encode and decode
  - Outputs a CSV with columns: encoding, charsetSize, bitsPerChar, avgLength, encodeOpsPerSec, decodeOpsPerSec, medianEncodeMs, p95EncodeMs, medianDecodeMs, p95DecodeMs
  - Is dependency-free (Node built-ins only) and runnable with node examples/benchmarks/bench.js
- Document run instructions in examples/benchmarks/README.md with sample commands and interpretation guidance.

# IMPLEMENTATION NOTES

- Use performance.now() or process.hrtime.bigint() for high-resolution timing.
- Keep the benchmark deterministic (fixed inputs) and idempotent so CI can reproduce results.
- Prefer simple CSV/JSON output parsable by spreadsheets and by automated scripts.