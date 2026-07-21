import assert from "node:assert/strict";
import { test } from "node:test";

import { applyLeaderboardUpdate } from "../scripts/update-leaderboard.mjs";

test("increments an existing contributor count", () => {
  const result = applyLeaderboardUpdate({ BowenMilner: 1, xevrion: 3 }, "BowenMilner");

  assert.deepEqual(result, { BowenMilner: 2, xevrion: 3 });
});

test("adds a new contributor with an initial count", () => {
  const result = applyLeaderboardUpdate({ xevrion: 3 }, "BowenMilner");

  assert.deepEqual(result, { xevrion: 3, BowenMilner: 1 });
});

test("trims contributor names before updating", () => {
  const result = applyLeaderboardUpdate({}, "  BowenMilner  ");

  assert.deepEqual(result, { BowenMilner: 1 });
});
