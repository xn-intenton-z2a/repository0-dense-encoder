UINT8ARRAY

TABLE OF CONTENTS
- Overview
- Constructors and factory signatures
- Properties
- Core methods (signatures and semantics)
- Interop with ArrayBuffer / DataView
- Byte semantics, endianness and coercion rules

OVERVIEW
Typed array view of 8-bit unsigned integers. Primary input type for binary encoders/decoders in JS; the library must accept and return Uint8Array for encode/decode APIs.

CONSTRUCTORS AND FACTORY SIGNATURES
- new Uint8Array(length: number) -> Uint8Array
- new Uint8Array(arrayLike: ArrayLike<number> | Iterable<number>) -> Uint8Array (copies values coerced to 0..255)
- new Uint8Array(buffer: ArrayBufferLike, byteOffset?: number, length?: number) -> Uint8Array (creates a view)
- static from(arrayLike: ArrayLike<number>, mapFn?: (v:number,i:number)=>number, thisArg?: any) -> Uint8Array

PROPERTIES
- buffer: ArrayBuffer  (backing ArrayBuffer)
- byteOffset: number   (offset in bytes from buffer start)
- byteLength: number   (length in bytes)
- length: number       (number of elements)

CORE METHODS (signatures and semantics)
- set(source: ArrayLike<number> | ArrayBufferView, offset?: number): void
  Copies source values into this view starting at offset. Values are coerced to unsigned 8-bit integers (value mod 256).

- subarray(begin?: number, end?: number): Uint8Array
  Returns a new view referencing the same ArrayBuffer (no copy) covering [begin,end).

- slice(start?: number, end?: number): Uint8Array
  Returns a new Uint8Array containing copied elements from start to end.

- copyWithin(target: number, start: number, end?: number): Uint8Array
  In-place copy of a range within the array.

- fill(value: number, start?: number, end?: number): Uint8Array
  Fill with numeric value coerced to 0..255.

INTEROP WITH ARRAYBUFFER / DATAVIEW
- To interpret multi-byte integers use DataView with explicit endianness: new DataView(uint8.buffer, uint8.byteOffset).
- When passing Uint8Array into Node Buffer APIs use Buffer.from(uint8) to avoid extra string conversions.

BYTE SEMANTICS & ENDIANNESS
- Uint8Array stores raw bytes. Multi-byte integer decoding/encoding must be explicit about endianness (DataView.getUint32/setUint32 with littleEndian flag).
- Assigning out-of-range numbers causes ToNumber then modular reduction to 0..255.

USAGE NOTES FOR ENCODERS
- Accept input: Uint8Array; return: string (encode) or Uint8Array (decode).
- Avoid unnecessary copies: use views and Buffer.from when interop with Node.

DETAILED DIGEST
Extracted technical API surface and behavioral details from MDN `Uint8Array` reference. Retrieved: 2026-03-27. Crawled content size: ~163 KB.

ATTRIBUTION
Source: MDN Uint8Array — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
