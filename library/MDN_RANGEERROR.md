MDN_RANGEERROR

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Definition and purpose
2. Constructor and signature
3. Typical usage patterns
4. When to throw RangeError in mission

1. Definition and purpose
- RangeError indicates an error when a numeric value is outside the set or range of allowed values.

2. Constructor and signature
- new RangeError([message]) -> RangeError object
- Typical throw form: throw new RangeError('message')

3. Typical usage patterns
- Used when an argument value is outside the acceptable range (e.g., negative length, too-large index).
- Built-in APIs throw RangeError in cases such as invalid array length or invalid numeric ranges.

4. When to throw RangeError in mission
- Negative input: if n < 0 then throw RangeError with a clear message such as 'n must be >= 0'.

SUPPLEMENTARY DETAILS
- RangeError inherits from Error; message should document the allowed range and actual provided value.
- Combine with TypeError: first validate type (Number.isInteger), then validate range (n >= 0).

REFERENCE DETAILS
- Constructor: RangeError([message])
- Example validation pattern: if (n < 0) throw new RangeError('n must be >= 0');

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError
- Retrieved: 2026-03-21
- Bytes fetched (truncated view used for extraction): 155937

ATTRIBUTION
- Content derived from MDN Web Docs (Mozilla).