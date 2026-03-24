// SPDX-License-Identifier: MIT
// tests/unit/charset-validation.test.js
import { describe, test, expect } from 'vitest';
import { createEncodingFromCharset, registerEncoding } from '../../src/lib/main.js';

describe('Charset validation for custom encodings', () => {
  test('rejects control characters', () => {
    expect(() => createEncodingFromCharset('ab\ncd', 'bad-control')).toThrow(/invalid/i);
  });

  test('rejects space U+0020', () => {
    expect(() => createEncodingFromCharset('ab cd', 'bad-space')).toThrow(/space|0020/i);
  });

  test('rejects ambiguous characters (0,O,1,l,I)', () => {
    const amb = ['0','O','1','l','I'];
    for (const c of amb) {
      expect(() => createEncodingFromCharset('ab' + c + 'cd', 'bad-amb-' + c)).toThrow(/ambiguous/i);
    }
  });

  test('rejects duplicate characters', () => {
    expect(() => createEncodingFromCharset('abcabc', 'bad-dup')).toThrow(/duplicate/i);
  });

  test('registerEncoding enforces validation by default', () => {
    // registerEncoding without skipValidation should validate and throw on invalid charset
    expect(() => registerEncoding('bad-register', 'ab cd')).toThrow();
  });
});
