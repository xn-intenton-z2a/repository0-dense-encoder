// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { hammingString, hammingInt } from '../../src/lib/main.js';

describe('Hamming String', () => {
  test('karolin vs kathrin => 3', () => {
    expect(hammingString('karolin', 'kathrin')).toBe(3);
  });

  test('empty strings => 0', () => {
    expect(hammingString('', '')).toBe(0);
  });

  test('unicode code points handled correctly', () => {
    // '𝌆' is a surrogate pair; compare with different astral char
    expect(hammingString('a𝌆c', 'a𝌇c')).toBe(1);
  });

  test('different lengths throws RangeError', () => {
    expect(() => hammingString('a', 'ab')).toThrow(RangeError);
  });

  test('non-string throws TypeError', () => {
    expect(() => hammingString(1, 'a')).toThrow(TypeError);
  });
});

describe('Hamming Int', () => {
  test('1 vs 4 => 2', () => {
    expect(hammingInt(1,4)).toBe(2);
  });

  test('0 vs 0 => 0', () => {
    expect(hammingInt(0,0)).toBe(0);
  });

  test('large integers', () => {
    expect(hammingInt(0xFFFF, 0x0)).toBe(16);
  });

  test('negative throws RangeError', () => {
    expect(() => hammingInt(-1, 2)).toThrow(RangeError);
  });

  test('non-integer throws TypeError', () => {
    expect(() => hammingInt(1.5, 2)).toThrow(TypeError);
  });
});
