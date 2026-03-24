// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { encodeUUID, listEncodings } from '../../src/lib/main.js';

describe('README encoding table matches runtime', () => {
  test('reported lengths in README match actual encoded lengths', () => {
    const md = readFileSync('README.md', 'utf8');
    const uuid = '0181b3b4-1f2e-7f00-8c3a-5fb3c2d8a1b2';
    const encNames = listEncodings().map(e => e.name);

    const mapping = {};
    for (const name of encNames) {
      // match a table row for the encoding and capture the final parentheses number
      const re = new RegExp(`\\|\\s*${name}\\s*\\|[^\\n]*\\((\\d+)\\)`, 'i');
      const m = md.match(re);
      if (m) mapping[name] = parseInt(m[1], 10);
    }

    expect(Object.keys(mapping).length).toBeGreaterThan(0);

    for (const name of Object.keys(mapping)) {
      const encoded = encodeUUID(name, uuid);
      expect(encoded.length).toBe(mapping[name]);
    }
  });
});
