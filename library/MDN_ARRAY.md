MDN_ARRAY

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Core Array concepts
2. Construction and factory methods
3. Common instance methods used for generation and transformation
4. Implementation patterns for FizzBuzz

1. Core Array concepts
- Arrays are ordered collections with zero-based indexes and a length property.
- Arrays may be constructed with array literals [], Array(length), or created from array-like/iterable objects via Array.from.

2. Construction and factory methods
- Array(length) -> creates a new Array with the given length (sparse if only length provided).
- Array.from(arrayLike[, mapFn]) -> returns a new Array created from an array-like or iterable object; optional mapFn applies a mapping per element.
  - Signature: Array.from(arrayLike[, mapFn]) -> Array

3. Common instance methods used for generation and transformation
- Array.prototype.map(callback[, thisArg]) -> returns a new array of mapped values. Signature: arr.map(callback[, thisArg])
- Array.prototype.push(...items) -> appends items, returns new length.
- Access patterns: arr[i] reads element at zero-based index i; arr.length gives number of elements.

4. Implementation patterns for FizzBuzz
- Two common, directly implementable patterns:
  - Indexed loop with push: for i from 1..n compute string and push to result array (O(n)).
  - Array.from factory: Array.from({length: n}, (_, i) => computeForIndex(i+1)) — creates array of length n and maps indices to values.
- When n = 0, both patterns yield an empty array.

SUPPLEMENTARY DETAILS
- Use Array.from when concise single-pass creation is desired; use explicit loop when clarity and step-by-step validation (type/range checks) are required before allocation.
- Avoid creating unnecessarily large intermediate arrays; allocate to the required size or push incrementally.

REFERENCE DETAILS
- Key signatures:
  - Array.from(arrayLike[, mapFn]) -> Array
  - arr.map(callback[, thisArg]) -> Array
  - new Array(length) -> Array
- Practical mission pattern: create result array of length n and assign string values for each index corresponding to numbers 1..n.

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- Retrieved: 2026-03-21
- Bytes fetched (truncated view used for extraction): 236066

ATTRIBUTION
- Content derived from MDN Web Docs (Mozilla).