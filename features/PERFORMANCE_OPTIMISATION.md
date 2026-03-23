# PERFORMANCE_OPTIMISATION

Summary

Micro‑optimise core encode/decode paths in src/lib/main.js to reduce allocations and improve speed for typical inputs (UUID-sized and larger buffers) while preserving round-trip correctness.

Motivation

Densification algorithms can be CPU- and allocation-heavy; careful micro-optimisations keep the library practical for real workloads and make denser encodings useful in performance-sensitive contexts.

Specification

- Profile current encode/decode for common sizes (1, 16, 64 bytes) and identify hot paths.
- Implement optimisations that keep the algorithmic complexity unchanged but reduce per-call allocations: reuse buffers where safe, precompute lookup tables, and perform bit operations in batches where it improves throughput.
- Add a lightweight benchmark script (placed under tests/unit or examples) that runs short deterministic benchmarks for encode/decode and produces human-readable timing output.
- Maintain round-trip property for all encodings and keep behaviour identical from the API consumer standpoint.

Acceptance Criteria

1. A deterministic benchmark script is added and committed; it runs locally with npm test:bench or an npm script and prints timing and allocation observations.
2. All micro-optimisations include unit tests that assert round-trip behaviour remains correct for the same set of edge cases as TEST_COVERAGE.
3. Benchmarks demonstrate improvements for at least the 16-byte case (documented improvement number in the benchmark output or accompanying README note).

Implementation Notes

- Keep optimisations small and well-commented; prefer correctness and maintainability over obscure micro-tweaks.
- Do not change public API signatures; only internal implementation should vary.
- If larger refactors are required, isolate them behind well-named helper functions and include tests before and after changes.