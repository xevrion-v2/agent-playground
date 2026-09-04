import assert from "node:assert/strict";
import test from "node:test";

import { updateLeaderboard } from "./update-leaderboard.mjs";

test("adds a new contributor with a count of one", () => {
  assert.deepEqual(updateLeaderboard({ alice: 2 }, "bob"), {
    alice: 2,
    bob: 1
  });
});

test("increments an existing contributor", () => {
  assert.deepEqual(updateLeaderboard({ alice: 2 }, "alice"), {
    alice: 3
  });
});
