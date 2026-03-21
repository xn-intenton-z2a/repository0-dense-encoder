MDN_TYPEERROR

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Definition and purpose
2. Constructor and signature
3. Typical usage patterns
4. When to throw TypeError in mission

1. Definition and purpose
- TypeError represents an error when an operation cannot be performed because a value is not of the expected type.

2. Constructor and signature
- new TypeError([message]) -> TypeError object
- Typical throw form: throw new TypeError('message')

3. Typical usage patterns
- Used to indicate invalid argument types (e.g., expecting integer but received string or object).
- Engines produce TypeError for built-in operations with invalid types; user code throws TypeError to signal API contract violations.

4. When to throw TypeError in mission
- Non-integer input: if Number.isInteger(n) is false then throw TypeError with a clear message such as 'n must be an integer'.

SUPPLEMENTARY DETAILS
- TypeError inherits from Error; its message property should be concise and actionable.
- When designing API: prefer throwing TypeError for incorrect types and RangeError for out-of-range numeric values.

REFERENCE DETAILS
- Constructor: TypeError([message])
- Example validation pattern: if (!Number.isInteger(n)) throw new TypeError('n must be an integer');

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
- Retrieved: 2026-03-21
- Bytes fetched (truncated view used for extraction): 154126

ATTRIBUTION
- Content derived from MDN Web Docs (Mozilla).