// SPDX-License-Identifier: MIT
// tests/unit/list-encodings.test.js
import { describe, test, expect } from 'vitest';
import { listEncodings } from '../../src/lib/main.js';

describe('Encodings metadata', () => {
  test('listEncodings returns name, charsetSize (integer), bitsPerChar (number) and bitsPerChar ≈ log2(charsetSize)', () => {
    const encs = listEncodings();
    expect(Array.isArray(encs)).toBe(true);
    for (const e of encs) {
      expect(e).toHaveProperty('name');
      expect(typeof e.name).toBe('string');
      expect(e).toHaveProperty('charsetSize');
      expect(Number.isInteger(e.charsetSize)).toBe(true);
      expect(e).toHaveProperty('bitsPerChar');
      expect(typeof e.bitsPerChar).toBe('number');
      const expected = Math.log2(e.charsetSize);
      expect(Math.abs(e.bitsPerChar - expected)).toBeLessThan(1e-12);
    }
  });
});
