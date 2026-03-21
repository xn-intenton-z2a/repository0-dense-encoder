Plan for implementing dense-encoding mission (fallback plan file)

Problem

The repository needs feature specs and tracked todos to implement dense binary-to-text encodings, a public API, UUID shorthands, custom encodings, an encoding listing, unit tests, and a README comparison table.

Approach

Create focused feature specs under features/, one per capability, and register todos in the session DB. If the session workspace path is not writable, keep a local plan copy under features/PLAN.md so it is visible in the repository.

Feature files created in this run

- BASE62.md
- BASE85.md
- HIGH_DENSITY.md
- ENCODER_API.md
- CUSTOM_CHARSET.md
- UUID_SHORTCUT.md
- ENCODING_LISTING.md
- TESTS_AND_README.md

Next steps

- Implement features iteratively in src/lib/main.js, add unit tests in tests/unit/, and update README.md with the comparison table.
