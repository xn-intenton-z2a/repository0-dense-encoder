# HIGH_DENSITY

Purpose

Support custom encodings derived from printable ASCII and provide a safe default printable charset that omits visually ambiguous characters. This feature enables users to create dense encodings from arbitrary charsets.

# ACCEPTANCE CRITERIA

- Provide createEncodingFromCharset that accepts a string of unique printable characters and returns an encoding object with encode, decode and metadata fields name, bitsPerChar, charsetLength.
- Offer a built-in printable-safe default charset derived from ASCII codepoints U+0021..U+007E excluding the ambiguous characters 0, O, 1, l and I. The default charset length must be 89 and its bitsPerChar must be computed and exposed in metadata.
- The API must validate charset input: reject control characters, require unique characters, and reject empty charsets.
- listEncodings must include the printable-safe custom encoding when registered and show its metadata.
- The densest available encoding among built-ins and registered customs (for example base91) must produce a 16-byte UUID encoding strictly shorter than 22 characters.

# IMPLEMENTATION NOTES

- When computing bitsPerChar use base-2 logarithm of the charsetLength and expose a numeric value suitable for display.
- Enforce uniqueness of characters in the provided charset and reject or sanitize input containing duplicates.