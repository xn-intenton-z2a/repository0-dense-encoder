JAVASCRIPT_MODULES

Table of contents:
1. Module types and runtime semantics
2. Import syntax and resolution rules
3. Export syntax and live bindings
4. Dynamic import and top-level await
5. Strict mode and scoping
6. Circular dependencies and evaluation order

Normalised extract (key technical details):
- ES modules (ECMAScript modules) are files loaded with module semantics: module scope, implicit strict mode, different top-level this binding (undefined), support for import/export declarations, and module-level evaluation once per module instance.
- Import specifiers resolve to exact file paths or package name entries; browsers require explicit file extensions for local file imports. Node and bundlers apply resolution rules but modern runtimes increasingly require explicit specifiers for interop.
- Export forms: named exports create live bindings: when module A imports a named export from module B, the imported value reflects updates to the exported binding. Default exports are a single export named "default" for the module.
- Dynamic import(expression) returns a promise that resolves to the module namespace object; this enables conditional or runtime loading.
- Top-level await is supported inside modules: await can be used at module top level where the host supports it, pausing module evaluation until promise resolves.
- Modules are evaluated in dependency order; circular dependencies create partly-initialized bindings and must rely on live bindings semantics to observe updates.

Supplementary details (implementation-focused):
- Module file identification: host/runtime determines whether a file is parsed as module or script. In browsers, type="module" or file extension and import form ensure module parsing. In Node, package.json type field and .mjs extension decide (see NODE_ESM document).
- Scoping: top-level variables declared in a module are not added to global scope. Modules always execute in strict mode even without 'use strict'.
- Live bindings mean assignment to an exported variable in the exporting module propagates to importers; re-exporting and renaming are supported as part of export syntax.

Reference details (exact syntax and semantics):
- Export syntax variants (representations):
  - Named export: export const NAME = value
  - Named export with list: export { a, b as c }
  - Default export: export default expression
  - Re-export from another module: export { name } from 'module-specifier'
  - Export all: export * from 'module-specifier'
- Import syntax (representations):
  - Import whole namespace: import * as NS from 'module-specifier'
  - Named import: import { a, b as c } from 'module-specifier'
  - Default import: import defaultExport from 'module-specifier'
  - Mixed: import defaultExport, { a } from 'module-specifier'
  - Dynamic import: import('module-specifier') returns a Promise resolving to module namespace object
- Module resolution notes: host may require full specifier strings (including extension) for local files; bare specifiers refer to package entry points resolved by runtime or bundler.

Digest (extracted on 2026-03-22):
- Source: MDN JavaScript modules guide (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- Retrieval date: 2026-03-22
- Data size retrieved: 264116 bytes

Attribution:
- Content extracted and condensed from MDN Web Docs: JavaScript modules.
