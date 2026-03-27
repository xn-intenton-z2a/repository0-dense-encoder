# TEST_DETERMINISM

Purpose

Reduce CI flakiness and improve reproducibility by making randomized test samples deterministic while keeping a small set of true-random smoke tests optional.

Description

Refactor tests that use randomness (currently tests/unit/encodings.test.js uses randomBytes) to use a deterministic, seeded PRNG for most samples and reserve a small number of non-deterministic smoke samples behind an explicit flag.

Implementation notes

- Add a tiny test helper at tests/utils/seeded-rng.js that implements a reproducible PRNG (e.g., an xorshift or mulberry32) and a helper randomBytes(seed, length) that produces a Uint8Array.
- Replace ad-hoc calls to crypto.randomBytes in unit tests used for property sampling with the seeded helper.
- Allow an environment variable TEST_RANDOM=1 or a CLI flag to enable non-deterministic smoke tests when desired.

Acceptance criteria

- Unit tests that previously relied on randomBytes use the seeded PRNG for randomized samples and are deterministic across runs.
- CI runs produce stable test results; any remaining non-deterministic tests are opt-in and documented.
- Tests include at least 100 deterministic random samples for round-trip checks (configurable to keep CI time bounded).

Notes

This is a maintenance and reliability improvement and should not change production code behaviour.