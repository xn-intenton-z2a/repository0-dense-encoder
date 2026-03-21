# BASE91

Purpose

Provide base91 encoding as the higher-density built-in encoding; this is the primary densest built-in listed in the mission and must be implemented per the reference algorithm.

# ACCEPTANCE CRITERIA

- Expose a built-in encoding named base91 with metadata bitsPerChar approximately 6.5069 and canonical alphabet.
- Implement the variable-bit packing algorithm (13/14-bit branch) following the original reference rules so encoded output is interoperable with canonical implementations.
- encode and decode must round-trip arbitrary Uint8Array inputs including edge cases.
- For a 16-byte UUID the typical base91 output length should be about 20 characters and must be strictly less than 22 characters.
- listEncodings must include base91 and accurate metadata.

# IMPLEMENTATION NOTES

- Follow the original reference implementation for alphabet and packing choices to ensure deterministic interoperability and predictable output length.