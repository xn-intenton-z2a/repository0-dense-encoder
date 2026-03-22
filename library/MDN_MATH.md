MDN_MATH — Extracted technical reference

Table of contents
- Overview
- Constants (names and values)
- Core methods and signatures
- Numeric behaviour and edge cases
- Implementation notes and patterns
- Supplementary details (performance, precision)
- Reference detail: method signatures, parameters, return types
- Detailed digest and retrieval
- Attribution and data size

Overview
The JavaScript global Math object provides numeric constants and standard mathematical functions. Methods accept and return IEEE-754 double-precision Number values. Math is a plain object (no constructor); use Math.<name>.

Constants
Math.E -> Number (Euler's constant, ~2.718281828459045)
Math.LN2 -> Number (natural log of 2)
Math.LN10 -> Number (natural log of 10)
Math.LOG2E -> Number (log base 2 of E)
Math.LOG10E -> Number (log base 10 of E)
Math.PI -> Number (pi, ~3.141592653589793)
Math.SQRT1_2 -> Number (1/sqrt(2))
Math.SQRT2 -> Number (sqrt(2))

Core methods and signatures
Each entry below is the canonical signature, parameter expectation, and return type. All parameters are coerced to Number; NaN inputs produce NaN as defined in IEEE-754 semantics.

Math.abs(x) -> Number
- x: Number
- returns absolute value of x; returns +0 for -0 input.

Math.acos(x) -> Number (radians)
Math.asin(x) -> Number (radians)
Math.atan(x) -> Number (radians)
Math.atan2(y, x) -> Number (radians)

Math.cbrt(x) -> Number (cube root)
Math.ceil(x) -> Number (smallest integer >= x)
Math.clz32(x) -> Number (count leading zero bits of 32-bit unsigned integer)
Math.cos(x) -> Number
Math.exp(x) -> Number (e^x)
Math.floor(x) -> Number (largest integer <= x)
Math.fround(x) -> Number (nearest 32-bit float representation)
Math.hypot(...values) -> Number (sqrt(sum(values[i]^2)))
Math.imul(a, b) -> Number (32-bit integer multiplication result)
Math.log(x) -> Number (natural log)
Math.log10(x) -> Number (base-10 log)
Math.log2(x) -> Number (base-2 log)
Math.max(...values) -> Number (largest)
Math.min(...values) -> Number (smallest)
Math.pow(base, exponent) -> Number
Math.random() -> Number (pseudorandom in range [0,1))
Math.round(x) -> Number (nearest integer, ties to +Infinity)
Math.sign(x) -> Number (-1, 0, +1, or NaN)
Math.sin(x) -> Number
Math.sqrt(x) -> Number (square root)
Math.tan(x) -> Number
Math.trunc(x) -> Number (integer part truncated toward zero)

Numeric behaviour and edge cases
- All Math methods operate on IEEE-754 double values; expect NaN and Infinity handling per ECMAScript.
- Math.random returns values in the half-open interval [0, 1); do not assume uniformity beyond practical pseudo-randomness; not cryptographically secure.
- Some methods (imul, clz32, fround) coerce to 32-bit integer or single-precision semantics; use when 32-bit results are required.

Implementation notes and patterns
- Use Math.pow(base, exp) or exponentiation operator (base ** exp) interchangeably; Math.pow is robust for explicit calls.
- For performance-critical loops, avoid repeated property lookup by caching Math methods: const { abs, max } = Math; then call abs(x).
- For reproducible random sequences in tests, do not rely on Math.random; stub or inject a PRNG.

Supplementary details (precision and performance)
- Math operations are implemented in native code and are generally constant-time per call; heavy numeric workloads should prefer vectorized or typed-array algorithms.
- Use Math.fround to convert to single-precision when interacting with WebGL or binary formats that expect float32 representation.

Reference detail: selected method signatures (complete list is in MDN)
- Math.abs(x: Number) => Number
- Math.acos(x: Number) => Number
- Math.asin(x: Number) => Number
- Math.atan(x: Number) => Number
- Math.atan2(y: Number, x: Number) => Number
- Math.ceil(x: Number) => Number
- Math.floor(x: Number) => Number
- Math.round(x: Number) => Number
- Math.trunc(x: Number) => Number
- Math.sign(x: Number) => Number
- Math.max(...values: Number[]) => Number
- Math.min(...values: Number[]) => Number
- Math.pow(base: Number, exponent: Number) => Number
- Math.sqrt(x: Number) => Number
- Math.exp(x: Number) => Number
- Math.log(x: Number) => Number
- Math.random() => Number in [0,1)
- Math.hypot(...values: Number[]) => Number
- Math.imul(a: Number, b: Number) => Number (signed 32-bit overflow semantics)
- Math.clz32(x: Number) => Number (0..32)
- Math.fround(x: Number) => Number (float32 rounding)

Detailed digest (extracted technical content)
- The Math object exposes named constants and deterministic pure functions for numeric calculation.
- All methods take Numbers and return Numbers; many are stable for numeric algorithm implementations used in simulation code (integration, kinematics, random sampling).
- Use Math.random for non-critical randomness and inject deterministic PRNG for unit tests of simulation traces.

Retrieved: 2026-03-22
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
Data obtained during crawling: HTML snapshot retrieved (~160 KB)

Attribution
Content condensed from MDN Web Docs Math reference, licensed under Mozilla Public License; source URL above.
