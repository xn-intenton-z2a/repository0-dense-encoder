# Flow Benchmark Report 001

**Date**: 2026-03-22
**Operator**: agentic-lib-flow (automated)
**agentic-lib version**: 0.1.0
**Run**: [23415434677](https://github.com/xn-intenton-z2a/repository0-dense-encoder/actions/runs/23415434677)

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission seed | 3-kyu-analyze-lunar-lander |
| Model | gpt-5-mini |
| Profile | max |
| Workflow runs | 8 |
| Init mode | purge |

## State File

```toml
# no state
```

## Results

| Metric | Value |
|--------|-------|
| Mission complete | NO |
| Mission failed | NO |
| Source lines | 48 |
| Test files | 2 |
| Agent log files | 0 |

## Mission

```
# Mission

A JavaScript library that simulates a lunar lander descent and provides an autopilot controller.

## Physics Model (1D simplified)

- Initial altitude: 1000m, initial velocity: 40 m/s (toward surface), fuel: 25 units
- Gravity: adds 2 m/s per tick to velocity (increasing downward speed)
- Thrust: each fuel unit burned reduces velocity by 4 m/s
- Landing: altitude reaches 0. Safe if velocity ≤ 4 m/s, crash if > 4 m/s

## Required Capabilities

- Create a lander state with configurable initial conditions (altitude, velocity, fuel). Defaults to the values above.
- Advance one tick: burn thrust fuel (clamped to available fuel), apply gravity and thrust, return a new immutable state. State objects are plain objects: `{ altitude, velocity, fuel, tick, landed, crashed }`.
- Simulate to completion using a controller function `(state) => thrustUnits` and return the full trace (array of states).
- Provide a built-in autopilot controller that lands safely. This is the algorithmically interesting part.
- Score a landing: `0` for crash, otherwise `(initialFuel - fuelUsed) * 10 + Math.max(0, (4 - landingVelocity) * 25)`. Higher is better.

## Requirements
```

## Agent Log Files


