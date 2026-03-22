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

/**
 * Compute the Hamming distance between two strings by Unicode code points.
 * Throws TypeError if inputs are not strings.
 * Throws RangeError if strings do not have the same number of code points.
 */
export function hammingString(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    throw new TypeError("hammingString: both arguments must be strings");
  }
  const aCp = [...a]; // spreads by Unicode code points
  const bCp = [...b];
  if (aCp.length !== bCp.length) {
    throw new RangeError("hammingString: strings must have equal length (in code points)");
  }
  let diff = 0;
  for (let i = 0; i < aCp.length; i++) {
    if (aCp[i] !== bCp[i]) diff++;
  }
  return diff;
}

/**
 * Compute the Hamming distance between two non-negative integers by counting differing bits.
 * Throws TypeError if inputs are not integers.
 * Throws RangeError if inputs are negative.
 */
export function hammingBits(a, b) {
  if (typeof a !== "number" || typeof b !== "number" || !Number.isInteger(a) || !Number.isInteger(b)) {
    throw new TypeError("hammingBits: both arguments must be integer numbers");
  }
  if (a < 0 || b < 0) {
    throw new RangeError("hammingBits: arguments must be non-negative");
  }
  // Use BigInt to avoid issues with bitwise ops on >32-bit values
  let x = BigInt(a) ^ BigInt(b);
  let count = 0;
  while (x) {
    x &= x - 1n; // clear lowest set bit
    count++;
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
