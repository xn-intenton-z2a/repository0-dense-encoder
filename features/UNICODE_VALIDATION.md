# UNICODE_VALIDATION

Summary

Define validation and Unicode-handling expectations for the library so string comparisons operate on Unicode code points rather than UTF-16 code units. This feature ensures correct behaviour for emoji and astral-plane characters.

Goals

- Specify how inputs are validated and how code points are counted.
- Provide explicit test cases that must be covered by unit tests.

Behaviour and API

- Strings are compared by code points. Implementers should use Array.from, for...of, or String.prototype[@@iterator] to enumerate code points.
- Unequal-length detection must consider code-point length, not .length of the JavaScript string.
- Error types: pass TypeError for non-strings; RangeError for unequal code-point length.

Required test cases (to be added to tests/unit/)

1) Basic multi-byte: hammingString('a\u030A', '\u00E5') should treat combining sequences carefully; tests should choose stable normalized inputs or specify normalization behaviour.
2) Astral characters: hammingString('😀', '😃') should return 1.
3) Mixed BMP and astral: hammingString('a😀b', 'a😃b') returns 1.
4) Unequal by code points: a string with an emoji made of two code points vs a single code point must be treated per code-point counts; implementers should document whether normalization (NFC/NFD) is required.

Acceptance criteria

- Tests demonstrate code-point-aware comparisons using at least one astral-plane character and one combining-sequence example.
- Documentation in README states that comparisons operate on Unicode code points and notes any normalization expectations.

Notes for implementers

- Prefer to avoid automatic normalization unless the library explicitly documents and tests it; instead, document recommended normalization for callers if exact equivalence of visually identical sequences is required.
- Keep validation behaviour deterministic and explicit in API docs.
