# TYPE_DEFINITIONS

Overview

Provide TypeScript-friendly declarations or comprehensive JSDoc so consumers and editors get accurate type information for the public API.

Goals

- Ship a small declaration file that covers the public API surface, and reference it from package.json so TypeScript users get correct editor hints without adding TypeScript as a heavy devDependency.

Acceptance Criteria

- A declaration file exists at src/lib/main.d.ts that exposes the public named exports and their types (or equivalent JSDoc is present in src/lib/main.js and package.json points to it via the "types" field).
- package.json contains a "types" field pointing to src/lib/main.d.ts (or appropriate JS+JSDoc entry) so consumers pick up types automatically.
- The declaration covers the public API shapes, including:
  - encode(name: string, data: Uint8Array): string
  - decode(name: string, encoded: string): Uint8Array
  - registerEncoding(name: string, charset: string, opts?: any): any
  - createEncodingFromCharset(charset: string, options?: { name?: string, sanitize?: boolean }): any
  - listEncodings(): Array<{ name: string; bitsPerChar: number; charsetSize: number }>
  - encodeUUID(name: string, uuid: string): string
  - decodeUUID(name: string, encoded: string): string
  - sanitizeCharset(charset: string): string (if exported)
- README contains a short "Types" section pointing to the declaration file and showing an example TypeScript import.

Implementation Notes

- Prefer a minimal hand-written declaration file to avoid adding TypeScript as a dependency; the declarations should only document the public API surface.
- If JSDoc is chosen instead, ensure examples and types are discoverable by editors and add the appropriate "types" pointer in package.json.

Status

Open — no declaration file is currently present and package.json does not include a "types" field. This is a small maintenance task that improves DX for consumers.

---
