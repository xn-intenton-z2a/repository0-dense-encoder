JS_EXPORTS

Table of contents
- ES module named exports syntax
- Node ESM compatibility notes
- Recommended export patterns for src/lib/main.js
- Supplementary details and examples

ES module named exports syntax
- Use named exports: export function createState(...) { } export function step(...) { }
- Export list at module end: export { createState, step, simulate, autopilot, scoreLanding }

Node ESM compatibility notes
- Ensure package.json contains "type": "module" (present in this repo) to enable ESM imports/exports in Node.
- Use import/ export syntax; to run CLI entry point node src/lib/main.js works with node >= 14 with appropriate flags; this repo targets node >=24.
- Node specific features: top-level await supported; use conditional exports only when cross-target.

Recommended export patterns for src/lib/main.js
- Provide named exports for all public API: createState, step, simulate, autopilot, scoreLanding
- Keep functions pure and small for easier testing and tree-shaking.

Supplementary details
- MDN export statement spec: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
- Node ESM doc: https://nodejs.org/api/esm.html

Crawl digest
- Retrieved MDN and Node ESM docs on 2026-03-23; extracted export semantics and runtime notes.

Attribution
- MDN Web Docs; Node.js ESM documentation
