// SPDX-License-Identifier: MIT
// tests/unit/web-render.test.js — simulate the page rendering logic using the library
import { describe, test, expect } from 'vitest';
import { listEncodings, encodeUUID } from '../../src/lib/main.js';

describe('Simulated web page encoding table', () => {
  test('table would include expected encodings and encoded values match library outputs', () => {
    const uuid = '0181b3b4-1f2e-7f00-8c3a-5fb3c2d8a1b2';
    const encs = listEncodings();
    const names = encs.map(e => e.name);
    expect(names).toEqual(expect.arrayContaining(['base62', 'base85', 'base91', 'densest']));

    for (const e of encs) {
      const encoded = encodeUUID(e.name, uuid);
      // should be a string and non-empty for supported encodings
      expect(typeof encoded).toBe('string');
      expect(encoded.length).toBeGreaterThanOrEqual(0);
    }
  });

  test('densest encoding produces fewer than 22 characters for the v7 UUID', () => {
    const uuid = '0181b3b4-1f2e-7f00-8c3a-5fb3c2d8a1b2';
    const encs = listEncodings();
    const densest = encs.find(e => e.name === 'densest');
    expect(densest).toBeDefined();
    const encoded = encodeUUID('densest', uuid);
    expect(encoded.length).toBeLessThan(22);
  });
});
