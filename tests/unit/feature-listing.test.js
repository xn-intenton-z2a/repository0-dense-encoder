// SPDX-License-Identifier: MIT
// Tests for listing available encodings and metadata
import { test, expect } from "vitest";
import { listEncodings } from "../../src/lib/main.js";

test("listEncodings returns metadata for built-in encodings", () => {
  const meta = listEncodings();
  const names = meta.map(m => m.name);
  expect(names).toContain('base62');
  expect(names).toContain('base85');
  expect(names).toContain('base91');
  expect(names).toContain('printable89');

  const base62 = meta.find(m => m.name === 'base62');
  expect(base62).toBeTruthy();
  expect(base62.charsetSize).toBe(62);
  expect(base62.bitsPerChar).toBeGreaterThan(5.9);

  const base85 = meta.find(m => m.name === 'base85');
  expect(base85).toBeTruthy();
  expect(base85.charsetSize).toBeGreaterThan(80);
  expect(base85.bitsPerChar).toBeGreaterThan(6.3);
});
