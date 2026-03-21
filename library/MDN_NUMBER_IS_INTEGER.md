MDN_NUMBER_IS_INTEGER

TABLE OF CONTENTS:
1. Signature
2. Behavior and return values
3. Implementation (equivalent)
4. Usage for input validation
5. Reference details
6. Digest and attribution

NORMALISED EXTRACT:
- Signature: Number.isInteger(value) -> boolean
- Returns true if Type(value) is Number and value is finite and has no fractional part
- Does not coerce the argument; non-number types return false

EXAMPLE BEHAVIOR:
- Number.isInteger(0) -> true
- Number.isInteger(1.0) -> true
- Number.isInteger(1.2) -> false
- Number.isInteger(NaN) -> false
- Number.isInteger(Infinity) -> false

IMPLEMENTATION PATTERN (equivalent):
- Equivalent check (conceptual): typeof value === 'number' && isFinite(value) && Math.floor(value) === value

USAGE:
- Use to validate function inputs that must be integer numbers
- Validation example (plain text): if (!Number.isInteger(n)) throw new TypeError('n must be an integer')

REFERENCE DETAILS:
- Method signature: Number.isInteger(value) -> boolean
- Parameter: value (any)
- Return: boolean; true only for values that are integer numbers

DIGEST (extracted content, retrieved 2026-03-21):
"The Number.isInteger() method determines whether the passed value is an integer."

ATTRIBUTION:
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
Crawl bytes: ~155.2 KB
