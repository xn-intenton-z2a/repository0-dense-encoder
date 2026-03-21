# UUID_SHORTHAND

Purpose

Define the shorthand pipeline used by the mission for concise UUID representation: normalize textual UUID, convert to bytes, reverse the byte array, then encode with a chosen encoding. Also define the reverse decode pipeline.

# ACCEPTANCE CRITERIA

- Provide helpers to convert a canonical UUID string (with or without dashes) to a 16-byte Uint8Array and to format a 16-byte Uint8Array back to canonical dashed lowercase hex.
- Provide a shorthand encoding helper that performs: normalize uuid string -> hex-to-bytes -> reverse bytes -> encoding.encode(bytes) and returns a printable string.
- Provide a shorthand decoding helper that performs: encoding.decode(str) -> reverse bytes -> bytes-to-dashed-uuid and returns the canonical UUID string.
- Round-trip property: shorthandDecode(shorthandEncode(uuid)) must equal the canonical dashed lowercase UUID for a representative set of UUID inputs including all-zero and all-0xFF.
- Unit tests confirm that shorthand helpers accept UUIDs with or without dashes and that byte-order and reversing are handled exactly as specified.

# IMPLEMENTATION NOTES

- Use network-order mapping (hex pair to byte left-to-right) and perform a full array reverse as the mission describes. Do not reinterpret individual UUID fields.