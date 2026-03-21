# LISTING_METADATA

Description

Define the behaviour and schema for listEncodings. This API returns an array of metadata objects describing each available encoding. Each metadata object must include: name, charsetSize, bitsPerChar (numeric), urlSafe (boolean), and recommendedForUuid (boolean).

Acceptance Criteria

- [ ] listEncodings returns metadata for every registered encoding.
- [ ] bitsPerChar is calculated as log2(charsetSize) and presented to three decimal places.
- [ ] Each metadata entry includes name and charsetSize as integers and bitsPerChar as a number.
- [ ] README is updated to include a comparison table of encodings and a sample encoded UUID for each encoding.

Notes

- Tests should verify metadata shapes and the presence of the comparison table in README.
