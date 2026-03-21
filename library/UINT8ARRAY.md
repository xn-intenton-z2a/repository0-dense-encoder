UINT8ARRAY

TABLE OF CONTENTS:
- Overview
- Constructors and creation
- Properties and fields
- Methods that affect bytes
- Interop and conversions (ArrayBuffer, Buffer)
- Edge cases and performance notes

NORMALISED EXTRACT:
Overview:
Uint8Array is a typed array view over an ArrayBuffer that represents an array of 8-bit unsigned integers. It is the canonical browser/JS container for raw binary byte buffers used by encoding/decoding functions.

Constructors and creation:
- new Uint8Array(length): allocates zero-filled buffer of given element count.
- new Uint8Array(array): copies values from an array-like or iterable of numbers into a new Uint8Array.
- new Uint8Array(buffer, byteOffset?, length?): creates a view on an existing ArrayBuffer.

Properties:
- buffer: ArrayBuffer backing store.
- byteLength: number of bytes in the view.
- length: number of elements (equal to byteLength for Uint8Array).

Methods:
- set(source, offset=0): copies values from source (Array, TypedArray) into this view starting at offset.
- subarray(begin, end): returns a new Uint8Array view sharing the same buffer.
- slice(begin, end): returns a new Uint8Array with copied bytes.

Conversions and interop:
- From ArrayBuffer: new Uint8Array(arrayBuffer).
- From Node Buffer: Uint8Array.from(buffer) or Buffer.from(uint8array) to convert both ways.
- To ArrayBuffer: uint8.buffer or uint8.subarray(...).buffer (watch byteOffset).

Edge cases:
- Typed array views may share buffer; modifying one view affects others sharing same buffer.
- When interpreting multi-byte numeric fields, use DataView with explicit endianness.

SUPPLEMENTARY DETAILS:
- For encode/decode APIs accept Uint8Array directly; ensure correct length checks.
- Avoid repeated allocations for streaming by reusing a single Uint8Array where possible and using set with offsets.

REFERENCE DETAILS:
API helper signatures:
- toUint8Array(input: ArrayBuffer | Buffer | number[] | string): Uint8Array
  - Converts supported input forms to a Uint8Array.
- encode(bytes: Uint8Array): string
  - Encodes bytes using library encoding; must accept any Uint8Array length including zero-length.
- decode(str: string): Uint8Array
  - Decodes into a Uint8Array; must produce exact original bytes for round-trip.

DIGEST:
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 162007

ATTRIBUTION:
MDN Web Docs: Uint8Array
