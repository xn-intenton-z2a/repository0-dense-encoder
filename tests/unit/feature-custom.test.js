// SPDX-License-Identifier: MIT
// Tests for defineEncoding character validation and custom encodings
import { describe, test, expect } from "vitest";
import { defineEncoding, encode, decode } from "../../src/lib/main.js";

describe("defineEncoding validation and custom charset", () => {
  test("rejects non-printable characters", () => {
    expect(() => defineEncoding('bad-np', 'ab\ncd')).toThrow(/non-printable|out-of-range/i);
  });

  test("rejects ambiguous characters by default", () => {
    expect(() => defineEncoding('bad-amb', '01O')).toThrow(/ambiguous/i);
  });

  test("allows ambiguous when option set", () => {
    expect(() => defineEncoding('amb-ok', '01O', { allowAmbiguous: true })).not.toThrow();
  });

  test("rejects duplicate characters", () => {
    expect(() => defineEncoding('dup', 'aa')).toThrow(/duplicate/i);
  });

  test("created encoding can encode/decode data", () => {
    // small custom alphabet
    defineEncoding('bin2', 'ab');
    const data = new Uint8Array([0, 1, 2, 3, 255]);
    const s = encode(data, 'bin2');
    const out = decode(s, 'bin2');
    expect(Array.from(out)).toEqual(Array.from(data));
  });
});
