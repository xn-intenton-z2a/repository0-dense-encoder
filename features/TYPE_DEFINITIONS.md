# TYPE_DEFINITIONS

Overview

Provide TypeScript-friendly declarations or comprehensive JSDoc so consumers and editors get accurate type information for the public API.

Goals

- Ship either a small hand-written declaration file src/lib/main.d.ts or comprehensive JSDoc in src/lib/main.js and reference it from package.json.

Acceptance Criteria

- A declaration file exists at src/lib/main.d.ts and package.json contains a "types" field pointing at it, or JSDoc is present and sufficient for editor-time type hints.
- The declaration exposes named exports with the following shapes (or equivalent JSDoc types):
  - encode(name: string, data: Uint8Array): string
  - decode(name: string, encoded: string): Uint8Array
  - registerEncoding(name: string, charset: string): Encoding
  - createEncodingFromCharset(charset: string, name?: string, options?: { sanitize?: boolean }): Encoding
  - listEncodings(): Array<{ name: string; bitsPerChar: number; charsetSize: number; urlSafe: boolean }>
  - encodeUUID(name: string, uuid: string): string
  - decodeUUID(name: string, encoded: string): string
- README contains a short "Types" section pointing to the declaration file and showing an example TypeScript import.

Implementation Notes

- Prefer a minimal declaration file to avoid adding TypeScript as a devDependency; the declarations should only cover the public API surface.

Status

Open — no declaration file present; this is a small, focused maintenance task.

---
