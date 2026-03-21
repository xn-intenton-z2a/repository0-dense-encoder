NODE_ESM

Normalised extract (direct, implementation-focused)
- package.json type field:
  - Setting package.json property type to "module" causes files with .js extension to be treated as ECMAScript modules by Node.js.
  - Alternatively, use .mjs extension to force ESM parsing regardless of package.json.
- Import/export semantics in Node:
  - Use static import and export syntax at top level in ES modules.
  - Dynamic import expression import(moduleSpecifier) returns a Promise resolved with the module namespace object.
  - Top-level await is supported in ES modules.
- CommonJS interop:
  - Importing CommonJS from ESM: default import receives module.exports as the default export; named imports are undefined unless the CommonJS module sets explicit properties.
  - Importing ESM from CommonJS requires dynamic import or using createRequire; prefer writing tests and library in ESM to match project package.json which already specifies type: module.

Table of Contents
1. package.json type behavior
2. File extension rules
3. Static and dynamic import semantics
4. Top-level await support
5. CommonJS interop and recommendations
6. Implementation pattern for the fizzBuzz library in Node

Detailed information
1. package.json type behavior
- "type": "module" in package.json makes Node treat .js files as ES modules. Without it, .js defaults to CommonJS.
- Keep package.json type: module to allow using export and import without .mjs extension.

2. File extension rules
- .mjs: treated as ESM regardless of package.json.
- .cjs: treated as CommonJS regardless of package.json.

3. Static and dynamic import semantics
- Static import uses syntax import { a } from 'mod'; valid only in ESM top-level.
- Dynamic import: import('mod').then(ns => { /* ns.default or ns.named */ }) returns a Promise resolving to the module namespace object.
- import() returns a Module Namespace Object whose properties correspond to exported bindings. Access default via ns.default.

4. Top-level await
- Supported in ESM; allows awaiting promises at top-level of modules without wrapping in async functions.

5. CommonJS interop and recommendations
- When interoperating, prefer writing the library as ESM to avoid subtle interop issues. If importing CommonJS modules into ESM, the CommonJS module will appear as the default export value.
- Tests running in the repo use Vitest which supports ESM; keep source files as ES modules and export named functions.

6. Implementation pattern for fizzBuzz library in Node
- The repository package.json already lists "type": "module"; implement named exports with top-level function declarations, e.g., export function fizzBuzz(n) { ... } and export function fizzBuzzSingle(n) { ... }.
- Consumers and tests should import as: import { fizzBuzz, fizzBuzzSingle } from '../../src/lib/main.js' (path adjusted for test layout).

Reference details (exact config and effects)
- package.json: { "type": "module" }  -- Node treats .js as ESM.
- File extension: .mjs (ESM), .cjs (CommonJS).
- Dynamic import: import(moduleSpecifier) => Promise<ModuleNamespaceObject>
- ModuleNamespaceObject: named export bindings accessible as properties; default is available as property default.

Detailed digest
- Source: https://nodejs.org/api/esm.html
- Retrieved: 2026-03-21
- Bytes retrieved during crawl: 125992
- Extract focuses on Node-specific module resolution, package.json type effects, file extensions, dynamic import, and interop rules necessary to ensure tests and library use ESM correctly.

Attribution
- Original source: Node.js Documentation — ECMAScript modules
- URL: https://nodejs.org/api/esm.html
- Data bytes fetched: 125992
