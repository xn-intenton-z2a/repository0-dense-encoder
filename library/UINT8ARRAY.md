UINT8ARRAY

NORMALISED EXTRACT

TABLE OF CONTENTS
1. Typed-array fundamentals
2. Creating and converting to/from hex and Buffer
3. Endianness and DataView usage
4. Best practices for encode/decode APIs

DETAILED INFORMATION

Typed-array basics:
- Uint8Array is a typed array view over an ArrayBuffer; it represents an array of 8-bit unsigned integers.
- Construction examples: new Uint8Array(length), Uint8Array.from(arrayLike), new Uint8Array(buffer, byteOffset, length).

Converting hex string <-> Uint8Array (exact procedure):
- hexToBytes(hex: string):
  - Normalize: remove optional 0x prefix, lower/upper case allowed, validate even length.
  - let out = new Uint8Array(hex.length / 2);
  - for i from 0 to out.length-1: out[i] = parseInt(hex.substr(i*2,2), 16).
- bytesToHex(bytes: Uint8Array):
  - Map each byte b to two-digit lowercase hex (b < 16 ? '0'+b.toString(16) : b.toString(16)) and join.

Node.js Buffer interop and performance:
- In Node.js, Buffer.from(Uint8Array) or Buffer.from(arrayBuffer) can be used; Buffer and Uint8Array may share memory.
- For high-throughput workloads prefer Buffer where available, but keep public API types as Uint8Array for cross-platform compatibility.

Endianness concerns:
- When interpreting multi-byte numeric values from a byte array use DataView for explicit endianness: new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset, littleEndianBoolean)
- Network byte order (big-endian) is the canonical choice for external binary encodings unless otherwise specified.

API PATTERNS (signatures)

hexToBytes(hex: string): Uint8Array
bytesToHex(bytes: Uint8Array): string
ensureUint8Array(input: unknown): Uint8Array  // coerce Buffer or ArrayBuffer to Uint8Array or throw

DIGEST
Source: MDN - Uint8Array documentation
Retrieved: 2026-03-21
Crawled data size: ~163 KB
Key extracted implementable points: constructors, ArrayBuffer interplay, DataView for endianness, hex conversion algorithms.

ATTRIBUTION
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
Data size: ~163 KB
