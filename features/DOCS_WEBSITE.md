# DOCS_WEBSITE

Summary
Improve the small website documentation to include an Examples section that shows a sample trace and points to the runnable example scripts in examples/.

Scope
- Update src/web/index.html (or add an examples page) to include a static Examples section showing initial and final sample states and a short explanation
- Link from the site to examples/default.js and examples/bench.js so users can run local demos
- Ensure changes are static and do not require server-side code

Acceptance Criteria
- The feature doc documents the proposed website changes and shows the exact content to add to the Examples section
- Tests that check for index.html and lib.js continue to pass (no breaking changes)
- The site content remains static and references examples in the repo
