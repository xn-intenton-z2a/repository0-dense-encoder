BASE62 — Base62 encoding (charset and density)

Table of contents
- Overview and use-cases
- Canonical charset (62 characters)
- Bit density and length calculation
- Implementation notes and API signatures
- Short UUID length expectations
- Supplementary details
- Detailed digest and retrieval
- Attribution and crawl size

Normalised extract (direct technical details)
Overview
- Base62 uses an alphabet of 62 printable characters: digits, lowercase letters, uppercase letters. Density approximately 5.954 bits per character.

Canonical charset (most common ordering)
- The canonical 62-character alphabet used by many implementations (and listed in base-x README) is:
  0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
- Written as a single 62-character string: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

Bit density and length calculation
- Each Base62 character encodes log2(62) ≈ 5.9541963104 bits.
- To compute encoded length for N bytes, use ceil((N*8)/log2(62)) or use base-x long-division algorithm which computes digit count precisely.
- For a 16-byte UUID approximate length = ceil(128 / 5.9541963) ≈ 22 characters (common implementations produce 22 characters).

Implementation notes and API signatures
- Many implementations reuse the crypto/base-x style algorithm:
  1. Treat the input bytes as a large unsigned integer in big-endian order.
  2. Repeatedly divide by 62, producing remainder digits (least significant first), then map each remainder to alphabet characters and reverse.
- createEncoding(charset: string) -> { encode(bytes: Uint8Array) -> string, decode(str: string) -> Uint8Array }
  - charset must contain unique characters and length equals base (62 for base62).
- encodeBase62(bytes: Uint8Array) -> string
- decodeBase62(str: string) -> Uint8Array

Short UUID length expectations
- Widely-used base62 alphabets produce 22-character encodings for 16-byte inputs; exact length depends on specific alphabet and leading-zero compression policy used by the algorithm.

Supplementary details
- Implementations that treat the input as a big integer must take care to preserve leading-zero bytes by using explicit leading-zero handling: each leading 0x00 byte corresponds to one leading '0' character in alphabets that use '0' as the first symbol.
- Use established libraries (e.g., base-x) for correctness and to avoid subtle off-by-one errors in digit computation.

Detailed digest
- Sources: base-x README (cryptocoinjs), Wikipedia Base62
- Retrieved: 2026-03-21
- Bytes downloaded (base-x README): 2,826; (Base62 wiki page): 66,092
- Extracted: canonical alphabet string used by many libraries, algorithmic approach (big-integer long division with leading-zero preservation), and expected density/length for UUIDs.

Attribution
- Source URLs:
  - https://raw.githubusercontent.com/cryptocoinjs/base-x/master/README.md
  - https://en.wikipedia.org/wiki/Base62
- Date retrieved: 2026-03-21
- Bytes downloaded: 2,826 (base-x README), 66,092 (Base62 wiki)
