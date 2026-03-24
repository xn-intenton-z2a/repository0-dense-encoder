// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { encode, decode, encodeUUID } from '../../src/lib/main.js';

describe('Negative input validation', () => {
  test('encode throws when input is not Uint8Array', () => {
    expect(() => encode('base62', [1,2,3])).toThrow(TypeError);
  });

  test('decode throws when input is not string', () => {
    expect(() => decode('base62', 123)).toThrow(TypeError);
  });

  test('encodeUUID throws when uuid argument is not a string', () => {
    expect(() => encodeUUID('base62', 123)).toThrow(TypeError);
  });
});
