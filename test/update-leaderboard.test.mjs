import test from "node:test";
import assert from "node:assert/strict";

import { applyLeaderboardUpdate } from "../scripts/update-leaderboard.mjs";

test("adds a new contributor with an initial count", () => {
  const updated = applyLeaderboardUpdate({}, "wisdom518");

  assert.deepEqual(updated, { wisdom518: 1 });
});

test("increments an existing contributor count", () => {
  const updated = applyLeaderboardUpdate({ wisdom518: 2 }, "wisdom518");

  assert.deepEqual(updated, { wisdom518: 3 });
});
