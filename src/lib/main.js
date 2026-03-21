#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

// Hamming distance between two strings measured by Unicode code points
export function hammingString(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    throw new TypeError('hammingString expects two string arguments');
  }
  const pointsA = Array.from(a);
  const pointsB = Array.from(b);
  if (pointsA.length !== pointsB.length) {
    throw new RangeError('Strings must have equal length (in Unicode code points)');
  }
  let diff = 0;
  for (let i = 0; i < pointsA.length; i++) {
    if (pointsA[i] !== pointsB[i]) diff++;
  }
  return diff;
}

// Hamming distance between two non-negative integers by differing bits
export function hammingBits(x, y) {
  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    throw new TypeError('hammingBits expects integer arguments');
  }
  if (x < 0 || y < 0) {
    throw new RangeError('hammingBits expects non-negative integers');
  }
  let v = x ^ y; // differing bits
  let count = 0;
  while (v !== 0) {
    count += v & 1;
    v = v >>> 1;
  }
  return count;
}

export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
