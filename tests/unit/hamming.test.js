// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { hammingString, hammingBits } from '../../src/lib/main.js';

describe('hammingString', () => {
  test('karolin vs kathrin -> 3', () => {
    expect(hammingString('karolin', 'kathrin')).toBe(3);
  });

  test('empty strings -> 0', () => {
    expect(hammingString('', '')).toBe(0);
  });

  test('unicode code points compared, not UTF-16 units', () => {
    // '𝄞' is U+1D11E (musical symbol) — single code point but surrogate pair in UTF-16
    expect(hammingString('a𝄞c', 'a𝄞c')).toBe(0);
    expect(hammingString('a𝄞c', 'aBc')).toBe(1);
  });

  test('non-string throws TypeError', () => {
    expect(() => hammingString(null, 'x')).toThrow(TypeError);
  });

  test('unequal lengths throws RangeError', () => {
    expect(() => hammingString('a', '')).toThrow(RangeError);
  });
});

describe('hammingBits', () => {
  test('1 vs 4 -> 2', () => {
    expect(hammingBits(1, 4)).toBe(2);
  });

  test('0 vs 0 -> 0', () => {
    expect(hammingBits(0, 0)).toBe(0);
  });

  test('large integers', () => {
    expect(hammingBits(0xFFFFFFFF, 0)).toBe(32);
  });

  test('non-integer throws TypeError', () => {
    expect(() => hammingBits(1.5, 2)).toThrow(TypeError);
  });

  test('negative throws RangeError', () => {
    expect(() => hammingBits(-1, 0)).toThrow(RangeError);
  });
});
