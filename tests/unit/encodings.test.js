// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { listEncodings, encode, decode, createEncoding } from "../../src/lib/main.js";

describe("Encodings API", () => {
  test("built-in encodings are registered", () => {
    const encs = listEncodings();
    const names = encs.map(e => e.name);
    expect(names).toEqual(expect.arrayContaining(["base62", "base85", "base91"]));
  });

  test("round-trip for edge cases across encodings", () => {
    const encs = listEncodings().map(e => e.name);
    const cases = {
      empty: new Uint8Array([]),
      single: new Uint8Array([0x01]),
      small: new Uint8Array([0x00, 0xff, 0x10, 0x20, 0x7f]),
      allZero16: new Uint8Array(16),
      allFF16: new Uint8Array(16).fill(0xff),
    };

    for (const enc of encs) {
      for (const k of Object.keys(cases)) {
        const input = cases[k];
        const out = encode(enc, input);
        const back = decode(enc, out);
        expect(back).toEqual(input);
      }
    }
  });

  test("createEncoding registers a usable encoding", () => {
    const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; // excludes ambiguous 0/O,1/l/I
    const name = createEncoding(charset);
    const data = new Uint8Array([1,2,3,4,5]);
    const encoded = encode(name, data);
    const decoded = decode(name, encoded);
    expect(decoded).toEqual(data);
  });
});
