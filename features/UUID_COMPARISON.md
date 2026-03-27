# UUID_COMPARISON

Status: Completed

Summary

The repository README includes a canonical UUID comparison table and the unit tests verify that the densest builtin encoding produces a shorter encoded length for a 16-byte UUID than base64. The website also renders a comparison table per merged issues.

Evidence

- README.md contains a "UUID encoding comparison" table with example lengths for hex, base64, base62, base85 and base91.
- tests/unit/encodings.test.js contains assertions that validate UUID encode/decode behaviour and length expectations.

Action

This feature is complete and is retained as a completed record; no further work unless new encodings are added.