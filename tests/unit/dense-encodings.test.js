// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { encode, decode, listEncodings, createEncodingFromCharset, encodeUuid, decodeUuid } from '../../src/lib/main.js';

function uint8Equal(a, b) {
  if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

describe('Dense encodings - roundtrip and UUID lengths', () => {
  test('built-in encodings present', () => {
    const enc = listEncodings().map(e => e.name);
    expect(enc).toEqual(expect.arrayContaining(['base62', 'base85', 'base91']));
  });

  test('round-trip for edge cases across encodings', () => {
    const encs = listEncodings().map(e => e.name);
    const cases = [
      new Uint8Array([]),
      new Uint8Array([0x01]),
      new Uint8Array(16), // all zeros
      new Uint8Array(16).fill(0xff),
      new Uint8Array([0x00, 0x01, 0x02, 0x03, 0xff])
    ];
    for (const name of encs) {
      for (const c of cases) {
        const encoded = encode(name, c);
        const decoded = decode(name, encoded);
        expect(uint8Equal(decoded, c)).toBe(true);
      }
    }
  });

  test('UUID encoding lengths and densest < 22 chars', () => {
    const uuid = '00112233-4455-6677-8899-aabbccddeeff';
    const encs = listEncodings();
    const lengths = encs.map(e => ({ name: e.name, len: encodeUuid(e.name, uuid).length }));
    // find minimal
    const minLen = Math.min(...lengths.map(x => x.len));
    expect(minLen).toBeLessThan(22);
  });

  test('create custom encoding and round-trip', () => {
    const customCharset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    createEncodingFromCharset('custom', customCharset);
    const enc = listEncodings().map(e => e.name);
    expect(enc).toContain('custom');
    const sample = new Uint8Array([0x00, 0xff, 0x10, 0x20]);
    const encoded = encode('custom', sample);
    const decoded = decode('custom', encoded);
    expect(uint8Equal(decoded, sample)).toBe(true);
  });
});
