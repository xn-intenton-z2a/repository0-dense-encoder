MDN_RANGE_ERROR

TABLE OF CONTENTS:
1. Constructor and signature
2. When to throw
3. Properties
4. Usage example
5. Reference details
6. Digest and attribution

NORMALISED EXTRACT:
- Constructor: new RangeError([message]) -> RangeError instance
- A RangeError is a built-in error thrown when a numeric value is outside an allowable range

PROPERTIES:
- name: 'RangeError'
- message: provided message string
- inherits Error prototype properties (stack, message)

USAGE:
- Use when a numeric argument is outside expected bounds, e.g., n < 0
- Example (plain text): throw new RangeError('n must be non-negative')

REFERENCE DETAILS:
- Syntax: RangeError([message])
- Typical pattern for argument validation: if (value < min || value > max) throw new RangeError('...')

DIGEST (extracted content, retrieved 2026-03-21):
"A RangeError indicates an error when a value is not in the set or range of allowed values."

ATTRIBUTION:
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError
Crawl bytes: ~157.0 KB
