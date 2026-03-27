# UUID_COMPARISON

Purpose

Provide a clear, reproducible README section and evidence showing encoded lengths for a v7 UUID across available encodings, so users can compare density and verify the densest encoding beats base64 for UUIDs.

Description

Update the project README with a small table that shows, for a canonical 16-byte UUID input, the encoded length produced by each supported encoding and the bits per character metric. The feature spec documents how to reproduce the table programmatically using listEncodings and a single sample UUID value.

Acceptance criteria

- README includes a table with columns: Encoding, Charset size, Bits per char, Encoded length for 16-byte UUID
- The table includes at least base62, base85, base91 and the densest custom encoding
- README contains one paragraph describing how to reproduce the measurements using the library API (listEncodings and encode)
- The table demonstrates that the densest encoding produces an encoded length shorter than base64 (less than 22 characters) for a 16-byte UUID

Notes

This is a documentation feature; no behaviour change is required. Keep reproducibility instructions minimal and actionable.