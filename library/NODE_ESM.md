NODE_ESM

Table of contents:
1. Package type and file extensions
2. Module resolution and specifiers
3. Interop with CommonJS
4. Runtime flags and loader hooks
5. import.meta and top-level features

Normalised extract (key technical details):
- Node's ECMAScript Modules implementation uses package.json "type" field to decide resolution: if package.json contains "type": "module", .js files are treated as ES modules; otherwise .js defaults to CommonJS. The .mjs extension forces module parsing; .cjs forces CommonJS.
- Import specifiers in Node ESM require file extensions for relative imports (for local files, include .js, .mjs, .json as appropriate); bare specifiers are resolved via package exports or node_modules lookup.
- CommonJS interoperability: importing a CommonJS module from ESM yields a default namespace corresponding to module.exports; named import of CommonJS bindings is not available by static analysis unless the module uses named exports via export syntax.
- Dynamic import, import.meta.url, and top-level await are supported in ESM contexts; import assertions are supported for JSON modules when enabled.

Supplementary details (implementation-focused):
- package.json configuration: set "type": "module" to treat .js files as ESM. To maintain dual packages, use .mjs/.cjs extensions for explicit formats.
- Loader behavior: experimental loader hooks exist for advanced resolution; when building tooling, implement transform step for compatibility (transpilers often convert ESM to CommonJS for older runtimes).
- Resolving algorithm: Node resolves file specifiers strictly; missing file extension is a common source of runtime errors for ESM code.

Reference details (explicit behaviors and options):
- package.json: { "type": "module" } => .js parsed as ESM
- File extensions: .mjs => ESM, .cjs => CommonJS, .js => depends on package.type
- Import assertions for JSON: import data from './file.json' assert { type: 'json' } (runtime must support assertions)
- Interop: const ns = await import('./cjs-file.cjs') yields a namespace where ns.default maps to module.exports

Digest (extracted on 2026-03-22):
- Source: Node.js documentation: ECMAScript modules (https://nodejs.org/api/esm.html)
- Retrieval date: 2026-03-22
- Data size retrieved: 126011 bytes

Attribution:
- Content condensed from Node.js official documentation for ESM.
