# API_TYPE_CHECKS

Purpose

Ensure the public encode and decode functions accept the common binary-like inputs used by callers and provide clear, testable error messages.

Current state

The library enforces Uint8Array for encode/decode and throws a TypeError for non-buffer types. Node Buffer objects are accepted because Buffer is a subclass of Uint8Array. ArrayBuffer and other ArrayBufferViews are not converted automatically.

Description

Add minimal, efficient runtime acceptance and conversion rules so the API is convenient while keeping behaviour explicit:

- Accept Uint8Array and Buffer directly (no change).
- Accept ArrayBuffer and all TypedArray views (e.g. Int8Array, Uint16Array) by converting to a Uint8Array view or a shallow copy when necessary.
- Accept DataView by creating a Uint8Array view over its underlying buffer.
- For other types throw a TypeError with a clear message: "data must be a Uint8Array, Buffer, ArrayBuffer, or TypedArray".
- Keep checks cheap and avoid expensive copies where a view suffices.

Acceptance criteria

- encode and decode accept Uint8Array and Buffer unchanged and return correct round-trip results.
- Passing an ArrayBuffer, TypedArray, or DataView is successfully converted and round-trips equal the original bytes.
- Passing other types (string, null, object) throws a TypeError with a helpful message.
- Unit tests added under tests/unit/api-type-checks.test.js that cover successful conversions and error cases.

Notes

Implement conversion paths as inline helpers in src/lib/main.js so overhead is minimal. Document accepted input types in the README API section.