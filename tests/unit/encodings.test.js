// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from 'vitest';
import { encode, decode, listEncodings, createEncodingFromCharset, encodeUUID, decodeUUID } from '../../src/lib/main.js';

function u8(arr) { return new Uint8Array(arr); }

describe('Encodings - registry and roundtrip', () => {
  test('built-in encodings are listed', () => {
    const encs = listEncodings().map(e => e.name);
    expect(encs).toEqual(expect.arrayContaining(['base62', 'base85', 'base91']));
  });

  test('round-trip for edge cases across encodings', () => {
    const samples = [
      { name: 'empty', bytes: u8([]) },
      { name: 'single', bytes: u8([0x7a]) },
      { name: 'zeros16', bytes: new Uint8Array(16).fill(0) },
      { name: 'ff16', bytes: new Uint8Array(16).fill(0xff) }
    ];
    const encs = listEncodings().map(e => e.name);
    for (const enc of encs) {
      for (const s of samples) {
        const encoded = encode(enc, s.bytes);
        const decoded = decode(enc, encoded);
        expect(decoded).toEqual(s.bytes);
      }
    }
  });

  test('custom encoding factory validates and round-trips', () => {
    const cs = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz!@%*+-=();';
    const enc = createEncodingFromCharset(cs, 'custom-test');
    expect(enc.name).toBe('custom-test');
    const bytes = u8([0,1,2,3,4,5,250,251,252]);
    const encoded = encode(enc.name, bytes);
    const decoded = decode(enc.name, encoded);
    expect(decoded).toEqual(bytes);
  });

  test('uuid shorthand and length comparison', () => {
    const uuid = '00112233-4455-6677-8899-aabbccddeeff';
    const encs = listEncodings();
    const results = encs.map(e => ({ name: e.name, encoded: encodeUUID(e.name, uuid) }));
    // round-trip decodeUUID
    for (const r of results) {
      const round = decodeUUID(r.name, r.encoded);
      expect(round).toBe(uuid);
    }
    const lengths = results.map(r => r.encoded.length);
    const minLen = Math.min(...lengths);
    expect(minLen).toBeLessThan(22); // densest encoding should be shorter than base64 (22)
  });
});
