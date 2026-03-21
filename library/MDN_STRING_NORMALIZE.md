MDN_STRING_NORMALIZE

Table of contents:
1. Overview
2. Syntax and signature
3. Normalization forms and effects
4. Use cases (comparison and storage)
5. Errors and edge cases
6. Supplementary implementation notes
7. Detailed digest and attribution

1. Overview
String.prototype.normalize returns a new string with Unicode Normalization applied. Use normalization to make canonically-equivalent strings compare equal (for example, composed vs decomposed accented characters).

2. Syntax and signature
Signature: String.prototype.normalize(form?) -> string
Parameters:
- form (optional): one of the strings 'NFC', 'NFD', 'NFKC', 'NFKD'. If omitted, default is 'NFC'.
Return:
- A new string that is the result of applying the Unicode Normalization Form specified.

3. Normalization forms and effects
- NFC: Canonical decomposition, followed by canonical composition (composed form). Preferred for storage and display.
- NFD: Canonical decomposition (decomposed form); base character and combining marks separated.
- NFKC: Compatibility decomposition followed by canonical composition; removes compatibility distinctions (e.g., superscripts, font variants) where possible.
- NFKD: Compatibility decomposition only.

4. Use cases (comparison and storage)
- To implement Unicode-aware equality before comparing code-point sequences, normalize both strings to the same form (commonly 'NFC') and then compare code points.
- For Hamming distance where visual equivalence matters, normalize to the chosen form before splitting into code points. If Hamming should operate on user-perceived characters, use Intl.Segmenter with granularity='grapheme'.

5. Errors and edge cases
- Passing an invalid form value causes a RangeError. Accept only the four specified forms.
- Normalization can change string length in code points; always normalize both inputs before length checks for Hamming distance.

6. Supplementary implementation notes
- Normalization follows the Unicode Normalization Algorithm; exact composition/decomposition rules are defined by the Unicode standard and implementations on the host platform.
- Performance: normalization is O(n) and allocates a new string; avoid repeated normalizations inside tight loops.

7. Detailed digest and attribution
- Source: MDN Web Docs — String.prototype.normalize
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Retrieved: 2026-03-21
- Data size obtained during crawl: 166623 bytes
