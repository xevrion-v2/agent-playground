import assert from "node:assert/strict";
import test from "node:test";

import { incrementLeaderboard, updateLeaderboardJson } from "./update-leaderboard.mjs";

test("incrementLeaderboard adds a new contributor", () => {
  assert.deepEqual(incrementLeaderboard({}, "new-user"), {
    "new-user": 1
  });
});

test("incrementLeaderboard increments an existing contributor", () => {
  assert.deepEqual(incrementLeaderboard({ "existing-user": 2 }, "existing-user"), {
    "existing-user": 3
  });
});

test("updateLeaderboardJson preserves other contributors", () => {
  const result = JSON.parse(updateLeaderboardJson('{"alice":2,"bob":1}\n', "alice"));

  assert.deepEqual(result, {
    alice: 3,
    bob: 1
  });
});
