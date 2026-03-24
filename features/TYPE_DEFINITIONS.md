# TYPE_DEFINITIONS

Overview

Add TypeScript declaration files and JSDoc for the public API to improve developer DX and enable static type checking in consumer projects and editors.

Goals

- Provide an accessible declaration file at src/lib/main.d.ts or equivalent so TypeScript-aware editors resolve types for the exported API.
- Add JSDoc in src/lib/main.js where appropriate to surface types in editors if a separate declaration file is not used.
- Update package.json "types" field to point to the declaration file when present.

Acceptance Criteria

- A declaration file path is present in package.json "types" and a file exists at src/lib/main.d.ts, or equivalent JSDoc is present and documented.
- The declaration exposes named exports with these signatures (or equivalent JSDoc types):
  - encode(name: string, data: Uint8Array): string
  - decode(name: string, encoded: string): Uint8Array
  - createEncoding(charset: string): Encoding
  - listEncodings(): Array<{ name: string; bitsPerChar: number; charsetSize: number; urlSafe: boolean }>
  - encodeUUID(uuid: string, encodingName: string): string
  - decodeUUID(encoded: string, encodingName: string): string
- README contains a short "Types" section that shows how to import the library in TypeScript-aware projects and where to find the declaration file.
- A maintainer can verify the types by opening an editor that understands TypeScript or by running a manual type-check against example code (tsc --noEmit), with no type errors reported for the examples (manual verification accepted).

Implementation Notes

- Prefer a small hand-written .d.ts to avoid adding a TypeScript toolchain; keep declarations minimal and focused on the public surface.
- If JSDoc is used instead, ensure examples in README demonstrate TypeScript-aware editor behaviour.

---
