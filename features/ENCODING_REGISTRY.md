# ENCODING_REGISTRY

Purpose

Centralise encoding metadata and expose a small metadata API so callers and tests can discover encoding properties without depending on implementation internals.

Current state

The project keeps encodings in an internal Map and exports listEncodings() which returns lightweight metadata (name, charset, charsetSize, bitsPerChar). getEncoding(name) is not currently exported as a public helper.

Description

Expand the metadata surface to include a stable programmatic getter and richer metadata useful for tests and the website:

- Export getEncoding(name) which returns a metadata object for the named encoding or throws a descriptive error for unknown names.
- Metadata object fields: name, charset (string), charsetSize (integer), bitsPerChar (number), uuidLength (integer — expected encoded length for a 16-byte UUID using the encoding's raw form if available, or the length when encoding a 16-byte UUID using encode/encodeUUID semantics).
- Preserve existing encode/decode behaviour; this feature only exposes metadata and a safe getter.
- Add unit tests asserting that built-in encodings (base62, base85, base91) are present and that bitsPerChar and uuidLength are plausible.

Acceptance criteria

- listEncodings remains exported and returns an array of metadata objects with fields: name, charset, charsetSize, bitsPerChar, uuidLength
- getEncoding(name) is exported and returns a single metadata object or throws a descriptive error for unknown names
- Unit tests under tests/unit assert the registry contains base62, base85 and base91 and that bitsPerChar approximations match expected values within ±0.05
- README references listEncodings/getEncoding for programmatic discovery of encodings

Notes

Keep the registry and new getter minimal and backward-compatible; avoid changing encode/decode internals.