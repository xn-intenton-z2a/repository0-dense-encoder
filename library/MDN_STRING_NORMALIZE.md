Title: MDN_STRING_NORMALIZE

Table of contents:
- Syntax and parameters
- Unicode normalization forms (NFC, NFD, NFKC, NFKD)
- Return value and exceptions
- Canonical vs compatibility normalization
- Implementation notes and examples
- Reference details and spec links
- Retrieval digest and attribution

Syntax and parameters
normalize()
normalize(form)
form: one of "NFC", "NFD", "NFKC", "NFKD". If omitted or undefined, "NFC" is used.
Throws RangeError if form is not one of the allowed values.

Unicode normalization forms
NFC: Canonical Decomposition followed by Canonical Composition. Produces composed forms where possible.
NFD: Canonical Decomposition. Produces decomposed forms (base + combining marks).
NFKC: Compatibility Decomposition followed by Canonical Composition. Replaces compatibility equivalents (ligatures, widenings) with compatibility decomposed forms then composes.
NFKD: Compatibility Decomposition. Decomposes compatibility equivalents without recomposition.

Return value and exceptions
Returns a string containing the Unicode Normalization Form of the input string.
RangeError thrown if provided form is invalid.

Canonical vs compatibility normalization
Canonical equivalence: sequences representing the same abstract characters; use NFC or NFD to obtain canonical forms for comparison/sorting.
Compatibility equivalence: sequences that are compatible but not canonically equivalent (e.g., ligatures); use NFKC/NFKD when compatibility folding is desired (search, normalization for comparison where visual difference is acceptable to lose).

Implementation notes and examples
- Use normalize() before comparing Unicode strings when user input may contain composed/decomposed variants.
- For Hamming distance on Unicode code points: normalize to NFC or NFD consistently, then iterate over code points (not UTF-16 code units) to compare positions.
- Example flow for Unicode-aware Hamming: normalize both strings to NFC (or choose NFD if you need decomposed combining marks), iterate by code points (for...of or Array.from(str)), ensure equal lengths after normalization, then count differing code points.

Reference details and spec links
- ECMAScript spec: https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.normalize
- Unicode Normalization Forms (UAX #15): https://www.unicode.org/reports/tr15/

Retrieval digest and attribution
Source: MDN Web Docs — String.prototype.normalize; retrieved 2026-03-21
Data size fetched: approximately 9KB (MDN page extract)
Attribution: MDN contributors; page last modified Jul 10, 2025
