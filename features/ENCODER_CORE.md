# ENCODER_CORE

Description

Provide the core public API and behavioural contract required by the mission. The library must export named functions from src/lib/main.js: encode, decode, createEncoding, listEncodings, encodeUUID, decodeUUID. All binary inputs are Uint8Array and encoded outputs are strings. Implementations must guarantee the round-trip property: decode(encode(bytes)) equals the original bytes for every registered encoding.

Acceptance Criteria

- [ ] src/lib/main.js exports named functions: encode, decode, createEncoding, listEncodings, encodeUUID, decodeUUID.
- [ ] encode accepts a Uint8Array and returns a string; decode accepts a string and returns a Uint8Array.
- [ ] Round-trip holds for all registered encodings and edge-case inputs: empty buffer, single byte, all zeros, all 0xFF.
- [ ] Unit tests exist and are runnable with npm test that exercise the API surface.

Implementation Notes

- Keep API stable and tree-shakeable. Prefer deterministic algorithms for fixed-size inputs such as UUIDs.
