UNIT_TESTS

NORMALISED EXTRACT:
Table of contents:
- Test cases for physics stepping
- Autopilot safety matrix tests
- Edge cases
- Scoring tests

Physics stepping tests:
1. Default createState() produces { altitude:1000, velocity:40, fuel:25, tick:0, landed:false, crashed:false }
2. step with zero thrust consumes gravity: step({alt:10, vel:0, fuel:0}) -> velocity 2, altitude 8
3. step with thrust reduces velocity: step({alt:10, vel:10, fuel:5}, thrust=2) -> fuel=3, velocity=10 + 2 - 8 = 4, altitude=6
4. Landing detection: step({altitude:2, velocity:3, fuel:0}) should set altitude to 0 and landed=true if final velocity <= 4

Autopilot safety matrix (parameterised tests):
- Run autopilotController across at least 10 combinations of (altitude, velocity, fuel) within ranges:
  altitudes = [500, 750, 1000, 1500, 2000]
  velocities = [20, 30, 40, 60, 80]
  fuels = [10, 15, 20, 30, 50]
- For each combination, simulate and assert that either trace ends with landed===true OR final trace ends with crashed===true but no exceptions thrown; additionally assert for at least 10 combinations that landed===true.

Edge cases:
- Zero fuel: autopilot returns a trace that either coasts to crash or starts already landed
- Already landed initial state: simulate returns single-state trace with landed true
- Thrust requested > fuel: clamped to fuel and no exception

Scoring tests:
- Crash returns 0
- Known example: if initialFuel 25, final fuel 25, final velocity 0 => score = 100

Test implementation notes:
- Use deterministic controller stubs for unit tests where needed (e.g., constant thrust for N ticks)
- Use small tick cap in tests to keep runs short

DETAILED DIGEST:
Sources: physics and control theory pages listed in SOURCES.md; retrieval metadata in API_EXPORTS.md.
