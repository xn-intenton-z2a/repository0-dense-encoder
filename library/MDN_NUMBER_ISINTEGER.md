MDN_NUMBER_ISINTEGER

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Purpose
2. Syntax and signature
3. Parameters
4. Return value and behaviour
5. Notes and edge cases

1. Purpose
- Number.isInteger determines whether the provided value is an integer number (no fractional part) and of the Number type.

2. Syntax and signature
- Number.isInteger(value) -> boolean

3. Parameters
- value: any JavaScript value to be tested for being an integer.

4. Return value and behaviour
- Returns true if value is of type number, is finite, and has no fractional component; otherwise returns false.
- Explicit behaviours:
  - Number.isInteger(3) -> true
  - Number.isInteger(3.0) -> true
  - Number.isInteger(3.1) -> false
  - Number.isInteger(NaN) -> false
  - Number.isInteger(Infinity) -> false

5. Notes and edge cases
- Does not coerce non-number types; e.g., Number.isInteger("3") -> false.
- Recommended for input validation: if (!Number.isInteger(n)) throw new TypeError('n must be an integer').

SUPPLEMENTARY DETAILS
- Implementation equivalent check (conceptual): typeof value === 'number' && isFinite(value) && Math.floor(value) === value.
- Use when the mission requires rejecting non-integers (per acceptance criteria).

REFERENCE DETAILS
- Syntax: Number.isInteger(value)
- Return type: boolean
- Example validation pattern for mission: validate with Number.isInteger before range checks.

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
- Retrieved: 2026-03-21
- Bytes fetched (truncated view used for extraction): 154170

ATTRIBUTION
- Content derived from MDN Web Docs (Mozilla).