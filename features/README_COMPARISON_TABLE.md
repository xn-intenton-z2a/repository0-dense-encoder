# README_COMPARISON_TABLE

Description
Add a UUID encoding comparison table to README.md that shows encoding name, charset size, bits per character (approx), and observed UUID length.

# ACCEPTANCE CRITERIA

- README.md contains a table with rows for: hex (32 chars), base64 (22 chars, no padding), base62, base85, base91, and the densest custom encoding implemented.
- Each row shows charset size, approximate bits per char, and the measured UUID length for a canonical 16-byte sample.
- The README explains measurement methodology (fixed 16-byte input, no padding) and links to tests that reproduce the numbers.

# IMPLEMENTATION NOTES

- Pull charset sizes from the library docs (library/ files) to avoid manual error.
- Files to change: README.md and tests that produce the numbers.