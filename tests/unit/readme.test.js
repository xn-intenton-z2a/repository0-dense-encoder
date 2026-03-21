// SPDX-License-Identifier: MIT
// README snapshot/validation test for the UUID encoding comparison table
import { test, expect } from "vitest";
import { readFileSync } from "fs";

test("README contains UUID encoding comparison table with expected entries", () => {
  const md = readFileSync('README.md', 'utf8');
  // ensure table header exists
  expect(md).toContain('| Representation | Characters |');

  const rBase62 = md.match(/\|\s*base62\s*\|\s*(\d+)/i);
  const rBase85 = md.match(/\|\s*base85\s*\|\s*(\d+)/i);
  const rBase91 = md.match(/\|\s*base91\s*\|\s*(\d+)/i);
  const rPrintable = md.match(/\|\s*printable89\s*\|\s*(\d+)/i);

  expect(rBase62).toBeTruthy();
  expect(Number(rBase62[1])).toBe(22);
  expect(rBase85).toBeTruthy();
  expect(Number(rBase85[1])).toBe(20);
  expect(rBase91).toBeTruthy();
  expect(Number(rBase91[1])).toBe(20);
  expect(rPrintable).toBeTruthy();
  expect(Number(rPrintable[1])).toBe(20);
});
