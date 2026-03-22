# Benchmark Report

**Date**: 2026-03-22
**Repository**: xn-intenton-z2a/repository0-dense-encoder
**Period**: PT19H40M → 2026-03-22T20:46:38.174Z
**Model**: gpt-5-mini

---

## Summary

Mission: implement a 1D lunar-lander library with an autopilot, scoring, tests, and README examples. Code and tests implement the required API and behaviours (PASS on all acceptance criteria), but the dataset has critical audit gaps: workflow run records are missing and acceptance-criteria bookkeeping is inconsistent, which prevents reliable traceability of transforms to CI runs.

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission complete | NO |
| Mission failed | NO |
| Transforms | 40 |
| Budget | 40/128 |
| Total tokens | 15927442 |
| Workflow runs | 0 |
| Commits | 100 |
| PRs merged | 22 |
| Issues (open/closed) | 0/0 |

---

## Timeline

No workflow runs were recorded in /tmp/report-data/workflow-runs.json (it is an empty array), so the timeline below is reconstructed from commits.json, pull-requests.json and agentic state.

- 2026-03-21T19:26:01Z — commit 72c830f8: "agentic-step: transform issue #45 (#46)" → PR #46 merged (transform). (commits.json)
- 2026-03-21T20:35:19Z — commit 83b61e81: "mission-complete: All required functions, exports, tests, and README examples are present" (agent declared a mission-complete milestone in a commit). (commits.json)
- 2026-03-22T04:18:27Z — commit d065bc06 / PR #75: "agentic-step: transform issue #73,70,72,74" merged (group transform). (pull-requests.json / commits.json)
- 2026-03-22T10:33:45Z — PR #85 merged: "agentic-step: transform issue #73, #79, #82, #83" (pull-requests.json)
- 2026-03-22T11:25:56Z — PR #84 merged: "fix: auto-fix broken main build" (pull-requests.json)
- 2026-03-22T11:40:04Z — commit e020cabf: "maintain(features+library): tests completed [healthy]" (CI reported healthy tests). (commits.json)

State file (/tmp/report-data/state.toml) records cumulative-transforms = 40 and last-transform-at = 2026-03-22T11:53:42.792Z. This timestamp is after the latest CI-related commit recorded in commits.json (11:40:04Z), demonstrating a mismatch between state and commit data. pull-requests.json contains 23 PR entries (22 merged). Many PRs are 'agentic-step' transforms and a number of PRs show zero additions/deletions (metadata-only or checkbox updates). Because workflow-runs.json is empty, it is not possible to map runs->job logs->artifacts->PRs reliably from the provided dataset.

---

## Acceptance Criteria

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Stepping correctly applies gravity and thrust physics | PASS | step(state,burn) in src/lib/main.js implements velocity = state.velocity + 2 - 4*burn and altitude = state.altitude - velocity; verified by tests/tests/unit/lander.test.js (applies gravity when no thrust, thrust and clamps fuel, detects landing/crash) and tests/unit/step.flooring.test.js (floors fractional burns and asserts expected velocity/altitude/fuel). |
| Autopilot lands safely with default initial conditions | PASS | tests/unit/create_state.test.js includes 'autopilot safely lands default initial state' — simulate(createState(), autopilot) is asserted to produce last.landed === true and last.crashed === false; implementation in src/lib/main.js exports autopilot and simulate used by the tests. |
| Autopilot lands safely across at least 10 different (altitude, velocity, fuel) combinations | PASS | tests/unit/autopilot.matrix.test.js and tests/unit/lander.test.js define a 10-entry 'combos' array and assert for each combo that simulate(createState(cfg), autopilot) ends with landed===true and crashed===false; these tests are present and exercised by CI (see commits). |
| Scoring returns 0 for crashes, positive for safe landings using the formula `(initialFuel - fuelUsed) * 10 + Math.max(0, (4 - landingVelocity) * 25)` | PASS | score(trace, initialState) implemented in src/lib/main.js returns remainingFuel*10 + Math.max(0,(4 - landingVelocity)*25) which is algebraically equal to (initialFuel - fuelUsed)*10; tests/unit/score.formula.test.js checks a worked example (expected 200) and tests/unit/simulate.autopilot-physics.test.js asserts crash => score 0. |
| Simulation returns a complete trace from start to landing | PASS | simulate(initialState, controller) returns an array 'trace' including the initial state; tests/unit/main.test.js and other tests assert trace length, controller call count, and that final trace state has landed or crashed flags set correctly. |
| All unit tests pass | PASS | Repository contains comprehensive unit tests (tests/unit/*.test.js) and commits.json shows multiple CI commits indicating tests passed: e020cabf (2026-03-22T11:40:04Z) 'maintain(...): tests completed [healthy]', 62eebc64 (2026-03-22T10:14:18Z), 83b61e81 (2026-03-21T20:35:19Z). These messages are the recorded evidence of passing test runs in the commit log snapshot provided. |
| README shows example simulation output | PASS | README.md contains a usage snippet and an example trace excerpt including 'Trace length: 22' and 'Final state: { altitude: 0, velocity: 3, fuel: 5, tick: 21, landed: true, crashed: false }', matching the mission requirement for an example. |

---

## Findings

### FINDING-1: Library and tests implement the mission API and behaviours (POSITIVE)

src/lib/main.js exports createState, step, simulate, autopilot, score as named exports and implements the physics, autopilot search, and scoring; multiple unit tests exercise these features (see tests/unit/*). Evidence: src/lib/main.js (step, simulate, autopilot, score) and tests/unit/lander.test.js, create_state.test.js, score.formula.test.js.

### FINDING-2: Missing workflow run metadata prevents auditability (CRITICAL)

/tmp/report-data/workflow-runs.json is an empty array while commits.json and pull-requests.json show many CI-related commits/merged PRs and state.toml records cumulative-transforms = 40. Without recorded workflow runs (timestamps, job logs, artifacts) it is not possible to map which run produced which transform or to retrieve failing logs for investigation. Evidence: /tmp/report-data/workflow-runs.json == []; state file shows cumulative-transforms=40 and last-transform-at=2026-03-22T11:53:42.792Z; commits.json contains CI commits (e.g., e020cabf at 2026-03-22T11:40:04Z).

### FINDING-3: Acceptance-criteria bookkeeping inconsistency (CONCERN)

The configuration snapshot (config.toml [acceptance-criteria]) shows each criterion met=false while the persistent state (agentic-lib-state.toml / state.toml) records mission_complete = true and commits include 'mission-complete' messages. This inconsistency between different stores undermines trust in automated mission-complete signalling. Evidence: config.toml acceptance-criteria entries met=false; /tmp/report-data/state.toml status.mission_complete = true; commits.json contains 'mission-complete' commits (e.g., 83b61e81, 0e70c3c9).

### FINDING-4: Many merged PRs contain zero additions/deletions (metadata-only merges) (CONCERN)

pull-requests.json shows numerous PRs with additions: 0 and deletions: 0 (PRs #85, #84, #80, #78, #77, #76, #75, etc.), and commits include 'update acceptance criteria checkboxes' and 'auto-fix' messages. This pattern suggests a mix of true code transforms and bookkeeping/no-op merges; it complicates assessing the substantive work done per transform. Evidence: sample PR entries in /tmp/report-data/pull-requests.json and commits like 'agentic-step: update acceptance criteria checkboxes [skip ci]'.

### FINDING-5: Tests are thorough, deterministic, and focused on safety properties (POSITIVE)

Unit tests include determinism checks, matrix sampling of 10 combos, edge-case tests (zero fuel, already landed), scoring examples and flooring behaviour. These give high confidence the library meets the functional requirements. Evidence: tests/unit/autopilot.determinism.test.js, autopilot.matrix.test.js, edge-cases.test.js, score.formula.test.js, step.flooring.test.js.

### FINDING-6: State timestamp and commit timeline mismatch (OBSERVATION)

state.toml.last-transform-at is 2026-03-22T11:53:42.792Z but the latest CI/test commit in commits.json is at 2026-03-22T11:40:04Z (e020cabf). This indicates either missing commits/runs in the collected snapshot or state updates occurring outside captured commits. Evidence: /tmp/report-data/state.toml and commits.json.

---

## Recommendations

1. Restore or re-run workflow run collection so workflow-runs.json contains run records (timestamps, job IDs, logs, artifacts); make this mandatory for future benchmark captures (HIGH priority).
2. Add a reconciliation step to the data-gathering pipeline that validates consistency between commits.json, pull-requests.json, state.toml and workflow-runs.json and alarms on mismatches (e.g., mission_complete true but no successful run record) (HIGH).
3. Require transform PRs to include non-empty diffs or a standardized metadata field describing the semantic change; treat pure-checkbox/metadata merges separately to avoid inflating transform counts (MEDIUM).
4. Ensure acceptance-criteria flags in config/data are updated atomically with state changes so there is a single source of truth for mission-complete; include a reproducible evidence bundle (test logs + artifact) when declaring mission-complete (HIGH).
5. Archive CI logs and test outputs alongside the workflow metadata so scoring and test pass claims can be independently verified; preserve run artifacts for at least the benchmark reporting window (MEDIUM).
6. Increase randomized/stress testing for autopilot (property-based or >100 randomized combos) to exercise the BFS search fallback and surface edge cases where the agent falls back to conservative burn (LOW/MEDIUM).

