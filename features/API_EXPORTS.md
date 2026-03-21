# API_EXPORTS

Overview

Ensure all public API functions for the library are exported as named exports from src/lib/main.js so unit tests and the website can import them directly.

Public API

- name (string)
- version (string)
- description (string)
- getIdentity (function)
- main (function)
- hammingString (function)  -- from HAMMING_STRINGS
- hammingBits (function)    -- from HAMMING_BITS

Behavior

- Keep existing exports unchanged and add hammingString and hammingBits as named exports in src/lib/main.js.
- Consumers should be able to import these symbols with import { hammingString, hammingBits } from "../../src/lib/main.js".

Acceptance Criteria

- src/lib/main.js exports hammingString and hammingBits as named exports.
- Existing tests for name, version, description, getIdentity and main continue to pass.