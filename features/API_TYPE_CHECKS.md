# API_TYPE_CHECKS

Purpose

Enforce and document runtime input validation for the public encode and decode functions so callers get clear errors and convenient conversions when possible.

Description

Add light-weight runtime checks at the start of encode and decode to ensure the input is a Uint8Array. Behaviour:

- If the input is an ArrayBuffer or Buffer, convert to Uint8Array
- If the input is already a Uint8Array, accept it
- For any other type throw a TypeError with a clear message describing accepted input types

Export behaviour and tests should make the contract explicit.

Acceptance criteria

- encode and decode perform runtime checks and convert ArrayBuffer/Buffer inputs to Uint8Array
- Passing non-buffer types causes a TypeError and a helpful error message
- Unit tests cover successful conversions and error cases
- Documentation in README or API docs lists accepted input types and conversion behaviour

Notes

Keep checks minimal and efficient; these are guards, not heavy validation logic.