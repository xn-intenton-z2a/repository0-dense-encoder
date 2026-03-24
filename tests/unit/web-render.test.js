// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { JSDOM } from "jsdom";
import { listEncodings, encodeUUID } from '../../src/lib/main.js';

describe("Website", () => {
  test("src/web/index.html exists", () => {
    expect(existsSync("src/web/index.html")).toBe(true);
  });

  test("index.html contains valid HTML structure", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
  });

  test("index.html imports the library via lib.js", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("lib.js");
  });

  test("src/web/lib.js re-exports from the library", () => {
    expect(existsSync("src/web/lib.js")).toBe(true);
    const lib = readFileSync("src/web/lib.js", "utf8");
    expect(lib).toContain("../lib/main.js");
  });

  test("index.html displays library identity elements", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("lib-name");
    expect(html).toContain("lib-version");
  });

  test("index.html includes encoding comparison table placeholder", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain('encoding-table');
  });

  test('rendered encoding table matches runtime encodings', async () => {
    const html = readFileSync('src/web/index.html', 'utf8');
    const dom = new JSDOM(html);
    const { document } = dom.window;

    const uuid = '0181b3b4-1f2e-7f00-8c3a-5fb3c2d8a1b2';
    const encs = listEncodings();

    const table = document.createElement('table');
    table.id = 'encoding-table';
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Encoding</th><th>Charset Size</th><th>Bits/char</th><th>UUID (encoded)</th><th>Length</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');

    for (const e of encs) {
      const encoded = encodeUUID(e.name, uuid);
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.textContent = e.name;
      const tdSize = document.createElement('td');
      tdSize.style.textAlign = 'center';
      tdSize.textContent = String(e.charsetSize);
      const tdBits = document.createElement('td');
      tdBits.style.textAlign = 'center';
      tdBits.textContent = e.bitsPerChar.toFixed(3);
      const tdEncoded = document.createElement('td');
      tdEncoded.style.fontFamily = 'monospace';
      tdEncoded.textContent = encoded; // use textContent to avoid HTML injection
      const tdLen = document.createElement('td');
      tdLen.style.textAlign = 'center';
      tdLen.textContent = String(encoded.length);

      tr.appendChild(tdName);
      tr.appendChild(tdSize);
      tr.appendChild(tdBits);
      tr.appendChild(tdEncoded);
      tr.appendChild(tdLen);

      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.body.appendChild(table);

    const rows = document.querySelectorAll('#encoding-table tbody tr');
    expect(rows.length).toBe(encs.length);

    let foundDensest = false;
    for (const tr of rows) {
      const name = tr.children[0].textContent.trim();
      const encodedText = tr.children[3].textContent.trim();
      const len = parseInt(tr.children[4].textContent.trim(), 10);
      const expected = encodeUUID(name, uuid);
      expect(encodedText).toBe(expected);
      expect(len).toBe(expected.length);
      if (name === 'densest') {
        foundDensest = true;
        expect(len).toBeLessThan(22);
      }
    }
    expect(foundDensest).toBe(true);
  });
});
