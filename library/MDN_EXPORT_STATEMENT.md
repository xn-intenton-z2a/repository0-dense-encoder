MDN_EXPORT_STATEMENT

Normalised extract (direct, implementation-focused)
- Export forms available:
  - Named export declarations: export function name(params) { ... } exports a named binding called name.
  - Variable/class export: export const name = value; export class C { ... } create named exported bindings.
  - Default export: export default <expression> creates the module's default export accessible as the default import.
  - Export list: export { a, b as c } declares named exports from local bindings.
  - Re-export from another module: export { x } from "module" re-exports x without creating a local binding.
  - Re-export all: export * from "module" re-exports all named exports except the default.
  - Namespace re-export: export * as ns from "module" re-exports under namespace ns.
- Semantics and constraints:
  - Exports are only valid in module context; they must appear at the top level of a module.
  - Exported bindings are live bindings: imports observe subsequent updates to the exported local binding.
  - export declarations cannot appear inside block scopes or functions.
  - Function and class declaration exports behave like the corresponding declarations with hoisting semantics for functions.

Table of Contents
1. Syntax forms
2. Named vs default exports
3. Re-export patterns
4. Live binding semantics
5. Module context requirements
6. Implementation patterns for fizzBuzz library
7. Supplementary notes and edge cases

Detailed information
1. Syntax forms
- Named function export: "export function fname(params) { ... }" creates a local function declaration and exposes fname as a named export.
- Named variable/class export: "export const name = value" or "export class C { }" expose the declared binding as a named export.
- Export list: "export { localName as exportedName }" references a local binding and exposes it under exportedName.
- Default export: "export default expression" sets the default export; importing modules retrieve it via default import syntax.
- Re-exports: "export { name } from 'mod'" forwards the binding from 'mod' without creating a new local binding; "export * from 'mod'" forwards all named exports except default.

2. Named vs default exports
- Named exports are referenced by their export name; multiple named exports allowed per module.
- Default export is single-per-module; importing as a named import uses "import def from 'mod'" semantics.

3. Re-export patterns
- Use re-exports to create consolidated public APIs. "export { x } from 'mod'" is a direct forward. "export * from 'mod'" is a wildcard forward excluding default.

4. Live binding semantics
- The exported identifier is a reference to the local binding. If the local binding is reassigned, importing modules observe the updated value.
- Example implication: mutating an exported array or reassigning exported variable will be visible to importers.

5. Module context requirements
- Export statements are parse-time syntax valid in ES modules only. In Node.js, ensure package.json type: "module" or use .mjs extension so the runtime treats the file as an ES module.

6. Implementation pattern for this project
- Preferred: define the functions as top-level named function declarations and export them as named exports, for example define: export function fizzBuzz(n) { ... } and export function fizzBuzzSingle(n) { ... } then consumers can import { fizzBuzz, fizzBuzzSingle } from 'src/lib/main.js'. This yields clear names, hoisting for test-time imports, and direct live binding semantics.

7. Supplementary notes and edge cases
- Avoid exporting the same binding name twice; duplicated export names are a syntax error.
- Re-exporting default requires explicit aliasing: "export { default as name } from 'mod'".

Reference details (exact forms and effects)
- export function fname(params) { ... }  -- declares fname and exports named binding fname.
- export const name = value  -- creates exported binding name bound to value (constant reference to the binding).
- export default <expression>  -- module default export; importers retrieve it via default import.
- export { local as exported }  -- forwards local binding under exported name.
- export { name } from 'module'  -- re-export named export from module without local binding.
- export * from 'module'  -- re-export all named exports (excluding default).
- export * as ns from 'module'  -- create a namespace export named ns that groups exports from module.

Detailed digest
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
- Retrieved: 2026-03-21
- Bytes retrieved during crawl: 211584
- Extract focuses on syntactic forms, live-binding semantics, and module-context restrictions needed to implement and export the fizzBuzz functions as ES named exports.

Attribution
- Original source: MDN Web Docs — export (developer.mozilla.org)
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
- Data bytes fetched: 211584
