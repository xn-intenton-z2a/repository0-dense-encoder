BASE62

TABLE OF CONTENTS:
- Common alphabets and variants
- Bits per character and expected encoded lengths
- Encoding algorithm notes (big-integer vs bit-buffer)
- Interoperability notes and URL-safety

NORMALISED EXTRACT:
Common alphabet (canonical variant): 0-9 a-z A-Z
Alphabet string: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
Charset size: 62 -> bits per char = log2(62) ≈ 5.95419631039 bits/char
Encoding length estimates for N bytes: encoded_length ≈ ceil((8 * N) / log2(62)) but many implementations convert the full input to a big integer then output digits in base-62; for fixed-length binary (UUID 16 bytes) the exact required character count is ceil((8*16)/log2(62)) = 21 characters in typical implementations.
Encoding algorithms:
- Two common approaches: (A) treat the entire input as a big-endian integer and repeatedly divide by 62 to produce digits, (B) use a bit-buffer approach accumulating bits and emitting chars when enough bits are available. Approach (A) is simpler and deterministic for fixed-length buffers; approach (B) is stream-friendly.
URL and filename safety:
- Base62 is URL-safe because it uses only alphanumerics; however case-sensitivity matters for some contexts. Choose a canonical alphabet and document it.

REFERENCE DETAILS:
- encode(bytes: Uint8Array): string
- decode(str: string): Uint8Array
- When using big-integer division on large inputs, ensure arbitrary-precision or big-integer libraries; for fixed 16-byte UUIDs a 128-bit integer implementation suffices.

DIGEST:
- Source: https://en.wikipedia.org/wiki/Base62
- Retrieved: 2026-03-21
- Bytes fetched during crawl: 71425

ATTRIBUTION:
Wikipedia: Base62 (variants and usage notes)
