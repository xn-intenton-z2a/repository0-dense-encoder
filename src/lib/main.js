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

// -------------------------
// Lunar lander library
// -------------------------

// Create a plain state object for the lander.
export function createState({ altitude = 1000, velocity = 40, fuel = 25 } = {}) {
  altitude = Number(altitude);
  velocity = Number(velocity);
  fuel = Number(fuel);
  const landed = altitude <= 0;
  const crashed = landed && Math.abs(velocity) > 4;
  return { altitude, velocity, fuel, tick: 0, landed, crashed };
}

// Advance one tick immutably, applying gravity and thrust.
export function step(state, burnUnits = 0) {
  if (!state || typeof state !== "object") {
    throw new TypeError("state must be an object");
  }
  // If already finished, return a shallow copy (do not call controller)
  if (state.landed || state.crashed) {
    return { ...state };
  }

  const requested = Number(burnUnits) || 0;
  // Burn must be an integer number of fuel units, clamped to available fuel
  const burn = Math.max(0, Math.min(Math.floor(requested), Number(state.fuel) || 0));

  const fuel = Number(state.fuel) - burn;
  // Apply gravity (+2) and thrust (-6 per fuel unit)
  const velocity = Number(state.velocity) + 2 - 6 * burn;
  // Altitude decreases by the (downward) velocity
  let altitude = Number(state.altitude) - velocity;

  let landed = false;
  let crashed = false;
  if (altitude <= 0) {
    landed = true;
    crashed = Math.abs(velocity) > 4;
    altitude = 0; // do not go below surface
  }

  return {
    altitude,
    velocity,
    fuel,
    tick: (Number(state.tick) || 0) + 1,
    landed,
    crashed,
  };
}

// Run simulation until landing or crash. Controller is (state) => burnUnits.
export function simulate(initialState, controller) {
  if (!initialState || typeof initialState !== "object") {
    throw new TypeError("initialState must be a state object from createState()");
  }
  if (controller && typeof controller !== "function") {
    throw new TypeError("controller must be a function(state) => burnUnits");
  }

  // Clone initial state to avoid mutation
  let current = { ...initialState };
  const trace = [current];

  const MAX_TICKS = 10000;
  for (let i = 0; i < MAX_TICKS && !(current.landed || current.crashed); i++) {
    // Controller must not be called after landing/crash; we call it only when running
    const burn = controller ? controller({ ...current }) : 0;
    const next = step(current, burn);
    trace.push(next);
    current = next;
  }
  return trace;
}

// Autopilot: search for a first burn that leads to a safe landing using a bounded BFS
export function autopilot(state) {
  if (!state || typeof state !== "object") return 0;
  if (state.landed || state.crashed) return 0;

  const available = Math.max(0, Math.floor(Number(state.fuel) || 0));
  if (available <= 0) return 0;

  // BFS over state-space (altitude|velocity|fuel) to find any sequence of burns that results in a safe landing.
  // Return the first burn from the found sequence. Bound the search to avoid pathological cases.
  const key = (s) => `${Math.round(s.altitude)}|${Math.round(s.velocity)}|${Math.round(s.fuel)}`;
  const start = { ...state };
  const visited = new Set([key(start)]);
  const queue = [{ state: start, firstBurn: null }];
  const MAX_NODES = 200000;
  let nodes = 0;

  while (queue.length > 0 && nodes < MAX_NODES) {
    const node = queue.shift();
    const cur = node.state;

    if (cur.landed) {
      if (!cur.crashed) return node.firstBurn === null ? 0 : node.firstBurn;
      nodes++;
      continue;
    }

    const fuelLeft = Math.max(0, Math.floor(Number(cur.fuel) || 0));
    // Limit maximum burn per tick to a reasonable cap to keep branching under control
    const maxBurnChoice = fuelLeft; // consider all possible burns up to available fuel

    for (let b = 0; b <= maxBurnChoice; b++) {
      const next = step(cur, b);
      const k = key(next);
      if (visited.has(k)) continue;
      visited.add(k);

      const first = node.firstBurn === null ? b : node.firstBurn;
      if (next.landed && !next.crashed) return first;
      queue.push({ state: next, firstBurn: first });
    }

    nodes++;
  }

  // Fallback: if no safe plan found within limits, use a conservative greedy immediate burn
  const safeVelocity = 4;
  const v = Number(state.velocity) || 0;
  const requiredNow = Math.ceil((v + 2 - safeVelocity) / 6);
  if (requiredNow <= 0) return 0;
  return Math.max(0, Math.min(requiredNow, available));
}

// Score: 0 for crash; otherwise remainingFuel*10 + Math.max(0, (4 - landingVelocity) * 25)
export function score(trace, initialState) {
  if (!Array.isArray(trace) || trace.length === 0) {
    throw new TypeError("trace must be a non-empty array of states");
  }
  if (!initialState || typeof initialState !== "object") {
    throw new TypeError("initialState must be provided");
  }
  const last = trace[trace.length - 1];
  if (last.crashed) return 0;
  const remainingFuel = Number(last.fuel) || 0;
  const landingVelocity = Math.abs(Number(last.velocity) || 0);
  return remainingFuel * 10 + Math.max(0, (4 - landingVelocity) * 25);
}

// Keep CLI behaviour unchanged
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
