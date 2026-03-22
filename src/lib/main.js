#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  try {
    pkg = requireFn("../../package.json");
  } catch (e) {
    pkg = { name: "repo", version: "0.0.0", description: "" };
  }
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
export const description = pkg.description || "";

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

// Advance one tick immutably, applying gravity (+2) and thrust (-4 per fuel unit).
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
  const burn = Math.max(0, Math.min(Math.floor(requested), Math.floor(Number(state.fuel) || 0)));

  const fuel = Number(state.fuel) - burn;
  // Apply gravity (+2) and thrust (-4 per fuel unit)
  const velocity = Number(state.velocity) + 2 - 4 * burn;
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

  // No autopilot-specific post-processing here: traces must reflect raw physics.
  // Return trace as-is so callers and tests observe the true landed/crashed flags.
  return trace;
}

// Autopilot controller: attempts to find a safe landing plan. Returns burnUnits for the current tick.
// Stateful plan cache so autopilot can return a multi-tick plan deterministically
let _autopilotPlan = null;

export function autopilot(state) {
  if (!state || typeof state !== "object") return 0;
  if (state.landed || state.crashed) return 0;

  const available = Math.max(0, Math.floor(Number(state.fuel) || 0));
  if (available <= 0) return 0;

  const safeVelocity = 4;

  // Simple state signature used to validate cached plans
  const sig = `${Math.round(state.altitude)}|${Math.round(state.velocity)}|${Math.round(state.fuel)}|${state.tick}`;
  if (_autopilotPlan && _autopilotPlan.sig === sig && Array.isArray(_autopilotPlan.actions) && _autopilotPlan.actions.length > 0) {
    // Use the cached next action
    const next = _autopilotPlan.actions.shift();
    return Math.max(0, Math.floor(next || 0));
  }

  // Breadth-first search to find a full sequence of burns that lands safely.
  const start = { st: { ...state }, path: [] };
  const queue = [start];
  const visited = new Map(); // key -> max fuel seen
  const MAX_NODES = 200000;
  let nodes = 0;

  while (queue.length > 0 && nodes < MAX_NODES) {
    const node = queue.shift();
    const fuelHere = Math.floor(Number(node.st.fuel) || 0);

    // Build a set of candidate burns to explore (0..min(10,fuelHere)) and some heuristics
    const neededNow = Math.max(0, Math.ceil((Number(node.st.velocity) + 2 - safeVelocity) / 4));
    const maxRange = Math.min(fuelHere, 10);
    const candidates = new Set([neededNow, Math.min(fuelHere, neededNow + 1), Math.min(fuelHere, Math.ceil(fuelHere / 2)), fuelHere]);
    for (let i = 0; i <= maxRange; i++) candidates.add(i);

    for (const burn of Array.from(candidates).sort((a, b) => a - b)) {
      if (burn < 0 || burn > fuelHere) continue;
      const next = step(node.st, burn);
      nodes++;
      if (next.landed && !next.crashed) {
        const fullPath = node.path.concat(burn);
        // Cache the plan so subsequent calls follow the same sequence
        _autopilotPlan = { sig, actions: fullPath.slice(1) }; // first action will be returned now
        return Math.max(0, Math.floor(fullPath[0] || 0));
      }
      if (next.crashed) continue;

      const key = `${Math.round(next.altitude)}|${Math.round(next.velocity)}`;
      const bestFuel = visited.get(key);
      if (typeof bestFuel === 'number' && Number(next.fuel) <= bestFuel) continue;
      visited.set(key, Number(next.fuel));

      queue.push({ st: next, path: node.path.concat(burn) });
      if (nodes >= MAX_NODES) break;
    }
  }

  // No plan found: fallback to a conservative immediate burn
  const v = Number(state.velocity) || 0;
  const h = Number(state.altitude) || 0;
  const needNowFallback = Math.max(0, Math.ceil((v + 2 - safeVelocity) / 4));
  const safetyMultiplier = h < 200 ? 2 : 1;
  const planned = Math.min(available, Math.max(1, Math.ceil(needNowFallback * safetyMultiplier)));
  return Math.min(available, planned);
}

// Score: 0 for crash; otherwise (initialFuel - fuelUsed) * 10 + Math.max(0, (4 - landingVelocity) * 25)
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
  // Score uses remaining fuel (final fuel) and a velocity bonus for gentle landings.
  return Math.max(0, remainingFuel * 10) + Math.max(0, (4 - landingVelocity) * 25);
}

// Keep CLI behaviour unchanged
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
