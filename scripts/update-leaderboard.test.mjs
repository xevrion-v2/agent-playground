import assert from "node:assert/strict";
import { test } from "node:test";

import { applyLeaderboardUpdate } from "./update-leaderboard.mjs";

test("adds a new contributor with count 1", () => {
  const result = applyLeaderboardUpdate({ alice: 2 }, "bob");

  assert.deepEqual(result, { alice: 2, bob: 1 });
});

test("increments an existing contributor", () => {
  const result = applyLeaderboardUpdate({ alice: 2, bob: 5 }, "alice");

  assert.deepEqual(result, { alice: 3, bob: 5 });
});

test("starts missing or non-numeric counts at 1", () => {
  const result = applyLeaderboardUpdate({ alice: "x" }, "alice");

  assert.deepEqual(result, { alice: 1 });
});

test("does not mutate the input leaderboard", () => {
  const original = { alice: 1 };
  const result = applyLeaderboardUpdate(original, "alice");

  assert.deepEqual(original, { alice: 1 });
  assert.deepEqual(result, { alice: 2 });
  assert.notEqual(result, original);
});

test("rejects empty usernames", () => {
  assert.throws(() => applyLeaderboardUpdate({}, ""), {
    name: "TypeError",
  });
  assert.throws(() => applyLeaderboardUpdate({}, "   "), {
    name: "TypeError",
  });
});
