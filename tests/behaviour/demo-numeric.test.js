// SPDX-License-Identifier: MIT
import { test, expect } from "@playwright/test";

test("demo page prints numeric landing velocity and score", async ({ page }) => {
  await page.goto("./", { waitUntil: "networkidle" });
  await page.waitForSelector('#final-velocity', { timeout: 10000 });
  await page.waitForSelector('#final-score', { timeout: 10000 });
  const velText = (await page.locator('#final-velocity').textContent()).trim();
  const scoreText = (await page.locator('#final-score').textContent()).trim();
  const vel = Number(velText);
  const score = Number(scoreText);
  expect(Number.isFinite(vel)).toBe(true);
  expect(Number.isFinite(score)).toBe(true);
});
