// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { encode, decode, listEncodings, encodeUUID } from "../../src/lib/main.js";

const encs = listEncodings().map(e => e.name);

describe("Dense encodings round-trip", () => {
  const samples = [
    { name: "empty", bytes: new Uint8Array([]) },
    { name: "single", bytes: new Uint8Array([0x7f]) },
    { name: "zeros16", bytes: new Uint8Array(16) },
    { name: "ff16", bytes: (() => { const b = new Uint8Array(16); b.fill(0xff); return b; })() }
  ];

  for (const enc of encs) {
    for (const sample of samples) {
      test(`${enc} round-trip ${sample.name}`, () => {
        const encoded = encode(enc, sample.bytes);
        const decoded = decode(enc, encoded);
        expect(Array.from(decoded)).toEqual(Array.from(sample.bytes));
      });
    }
  }
});

test("densest encoding produces UUID shorter than base64 (22)", () => {
  const uuid = "01234567-89ab-cdef-0123-456789abcdef";
  const encodings = listEncodings();
  encodings.sort((a, b) => b.bitsPerChar - a.bitsPerChar);
  const densest = encodings[0].name;
  const encoded = encodeUUID(densest, uuid);
  expect(encoded.length).toBeLessThan(22);
});

test("listEncodings returns metadata", () => {
  const list = listEncodings();
  expect(Array.isArray(list)).toBe(true);
  const found = list.find(e => e.name === "base62");
  expect(found).toBeTruthy();
});
