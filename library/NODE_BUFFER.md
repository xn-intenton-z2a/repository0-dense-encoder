NODE_BUFFER

TABLE OF CONTENTS:
- Overview
- Construction methods
- Conversions to/from Uint8Array and strings
- Useful instance methods
- Base64 specific helpers
- Memory and performance considerations

NORMALISED EXTRACT:
Overview:
Buffer is Node.js's raw binary representation, a subclass of Uint8Array with extra convenience methods for binary I/O.

Construction:
- Buffer.from(arrayBuffer): creates a Buffer that shares the ArrayBuffer memory (Node v6+).
- Buffer.from(array): copies from array of bytes.
- Buffer.from(string, encoding='utf8'): creates from string using encoding.
- Buffer.alloc(size): allocates zero-filled buffer.

Key methods:
- Buffer.concat(list[, totalLength]): concatenate multiple Buffers.
- Buffer.byteLength(string, encoding='utf8'): returns number of bytes for string in encoding.
- buffer.toString(encoding='utf8'): decode buffer to string; toString('base64') returns base64 encoding of buffer contents.
- Buffer.from(base64String, 'base64'): decode base64 string into Buffer.

Interop:
- Buffers are Uint8Array instances; `new Uint8Array(buffer)` will create a copy or use `Uint8Array.from(buffer)`; Buffer.from(uint8array) produces a Buffer view.

Best practices:
- Use Buffer.allocUnsafe when performance-critical but initialise before use to avoid sensitive data leakage.

SUPPLEMENTARY DETAILS:
- When encoding/decoding base64, Node provides direct conversion via toString('base64') and Buffer.from(str,'base64').
- For APIs that accept Uint8Array, pass Buffer instances directly where Node accepts them since Buffer is a Uint8Array subclass.

REFERENCE DETAILS:
API signatures:
- Buffer.from(input: string | ArrayBuffer | Iterable<number>, encoding?: string): Buffer
- Buffer.alloc(size: number): Buffer
- buffer.toString(encoding?: string): string

DIGEST:
- Source: https://nodejs.org/api/buffer.html
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 1111904

ATTRIBUTION:
Node.js Buffer documentation
