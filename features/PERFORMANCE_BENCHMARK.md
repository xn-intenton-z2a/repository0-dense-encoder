# PERFORMANCE_BENCHMARK

# Summary
Introduce lightweight benchmarks and documentation to detect performance regressions in simulate/step.

# Scope
- Add a bench script or example in examples/ that times simulate over many randomized initial conditions
- Document expected baseline metrics and provide instructions to run benchmarks locally
- Use simple timing to report median tick time and total simulation time

# Acceptance Criteria
- examples/bench.js added that runs N simulations and prints timing statistics
- README or features doc documents how to run the benchmark and interpret results
- Benchmarks run without changing library API and can be added to CI later if desired