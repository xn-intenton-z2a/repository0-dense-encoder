Plan: Extract technical details from SOURCES.md into library documents

Steps:
1. Fetch each URL listed in SOURCES.md and record retrieval date and byte-size.
2. For each source create a library document named in SCREAMING_SNAKECASE with:
   - Normalised technical extract and Table of Contents
   - Supplementary details and exact implementation specs
   - Reference details with API method signatures, parameters, return types, and config options
   - Crawl digest with retrieval date and byte-size
3. Prioritise implementation-focused items: charsets, bits-per-char, block sizes, padding rules, algorithm steps, and API examples for creating custom encodings.

Targets: BASE_X, BASE64, BASE62, ASCII85, BASE91, UUID
