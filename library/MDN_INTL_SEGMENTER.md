MDN_INTL_SEGMENTER

Table of contents:
1. Overview
2. Constructor and options
3. segment() method and returned segments
4. Granularity values and effects
5. Using Segmenter for grapheme clusters
6. Implementation notes and performance
7. Detailed digest and attribution

1. Overview
Intl.Segmenter provides locale-aware text segmentation: it can split text into grapheme clusters, words, or sentences. For Hamming distance that should operate on user-perceived characters, use 'grapheme' granularity.

2. Constructor and options
Signature: new Intl.Segmenter(locales?, options?) -> Intl.Segmenter object
Options:
- locales: optional BCP 47 language tag or array of tags
- options: object with optional properties
  - granularity: one of 'grapheme', 'word', 'sentence'
  - localeMatcher: 'lookup'|'best fit'

3. segment() method and returned segments
- segment(input) -> Segments object which is iterable; each result is an object with at least properties:
  - segment: string containing the segment text
  - index: integer start index in code units
  - isWordLike: boolean (for word granularity) — indicates text considered part of a word
- The Segments object implements the iterator protocol so it can be used in for-of loops or converted using Array.from.

4. Granularity values and effects
- 'grapheme': splits into user-perceived characters (grapheme clusters).
- 'word': splits into word-like units; returned records include isWordLike to filter punctuation/whitespace.
- 'sentence': splits into sentence units.

5. Using Segmenter for grapheme clusters
- To compute Hamming distance over grapheme clusters: construct a Segmenter with granularity 'grapheme' and convert the segmentation to an array of segment strings before comparing.
- This produces an array of user-perceived characters; compare arrays as with code-point arrays but note array elements may contain multiple code points.

6. Implementation notes and performance
- Intl.Segmenter is locale-aware and may be slower than simple code-point iteration but yields correct user-visible segmentation for many scripts.
- For simple code-point based Hamming distance, prefer Array.from(string) which is faster and simpler.

7. Detailed digest and attribution
- Source: MDN Web Docs — Intl.Segmenter
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter
- Retrieved: 2026-03-21
- Data size obtained during crawl: 153279 bytes
