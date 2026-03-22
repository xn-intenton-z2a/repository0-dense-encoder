// SPDX-License-Identifier: MIT
import { test, expect } from "@playwright/test";

test("demo page shows a safe landing for default initial state", async ({ page }) => {
  await page.goto("./", { waitUntil: "networkidle" });
  await page.waitForSelector('#final-status', { timeout: 10000 });
  const status = (await page.locator('#final-status').textContent()).trim();
  const velText = (await page.locator('#final-velocity').textContent()).trim();
  const scoreText = (await page.locator('#final-score').textContent()).trim();

  // Assert status and numeric constraints
  expect(status).toBe('LANDED');
  const vel = Number(velText);
  expect(Number.isFinite(vel)).toBe(true);
  expect(vel).toBeLessThanOrEqual(4);
  const score = Number(scoreText);
  expect(Number.isFinite(score)).toBe(true);
  expect(score).toBeGreaterThan(0);
});
