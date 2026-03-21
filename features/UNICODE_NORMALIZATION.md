# UNICODE_NORMALIZATION

Overview

Ensure the string Hamming feature handles composed and decomposed Unicode sequences predictably by normalizing inputs before comparing code points. This prevents false mismatches when the same human-visible character can be represented by different code point sequences.

Behavior

- hammingString accepts two string arguments and an optional third argument options.
- The options object supports a boolean property normalize which defaults to true.
- When normalize is true both input strings are normalized to Unicode Normalization Form C (NFC) before code-point iteration and comparison.
- All existing validation rules remain: non-string arguments throw TypeError; if the normalized code-point lengths differ a RangeError is thrown.

API

- hammingString(a, b, options?) -> number
- options.normalize: boolean (default true)

Acceptance Criteria

- Comparing a precomposed character (for example LATIN SMALL LETTER E WITH ACUTE) with the equivalent decomposed sequence (LATIN SMALL LETTER E followed by COMBINING ACUTE ACCENT) returns 0 when options.normalize is not provided or is true.
- The same comparison returns a non-zero Hamming distance when options.normalize is explicitly set to false.
- Validation behaviour is unchanged: non-string inputs produce TypeError and unequal normalized code-point lengths produce RangeError.
- Unit tests demonstrate the default normalization behaviour and the ability to disable normalization.

Notes for implementer

- Use String.prototype.normalize with form NFC to normalise inputs when enabled. See library guidance on MDN string normalization.
- Normalization must occur before code-point splitting and length checks so errors reflect normalized forms rather than raw input length.