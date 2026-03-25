# CHARSET_VALIDATION

Description
Centralise charset validation and the custom-encoding factory to ensure no control or ambiguous characters are used in custom encodings.

# ACCEPTANCE CRITERIA

- A documented createEncodingFromCharset(charset) behaviour is specified that:
  - Rejects control characters and whitespace.
  - Rejects or prunes ambiguous characters: 0 O 1 l I, with an option to choose behaviour (reject vs prune).
  - Returns encoding metadata including charset size and bits per character.
- Unit tests verify rejection/pruning behaviour and that encodings produced by the factory round-trip for representative buffers.

# IMPLEMENTATION NOTES

- Implement as a small refactor in src/lib/main.js exposing a validation helper used by the encoding constructors.
- Files to change: src/lib/main.js and tests/unit/charset.test.js.