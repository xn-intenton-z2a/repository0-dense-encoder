# CLI_DOCUMENTATION

Description
Document the library's CLI entrypoint (node src/lib/main.js and npm run start:cli) and provide examples for common tasks: encoding a UUID, listing encodings, and running benchmarks.

# ACCEPTANCE CRITERIA

- Add a CLI documentation section (README or docs/CLI.md) that documents:
  - Commands and flags: --help, --version, encode --encoding <name> --input <hex|uuid>, list-encodings, benchmark [--n N]
  - Examples with expected output for a canonical UUID input and instructions to pipe outputs.
  - A small smoke-testable example that runs node src/lib/main.js --version and node src/lib/main.js encode --encoding base62 --input <sample> and expects exit code 0.
- Link CLI docs to the README comparison table and to tests that verify CLI behaviour.

# IMPLEMENTATION NOTES

- Keep CLI behaviour minimal: the CLI should delegate to the library's named exports and act as a thin wrapper.
- Document both library API usage and CLI examples to help integrators choose an approach.