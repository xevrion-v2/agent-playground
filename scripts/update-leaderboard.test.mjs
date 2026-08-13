import assert from "node:assert/strict";
import test from "node:test";

import { incrementContributor, loadLeaderboard } from "../scripts/update-leaderboard.mjs";

test("incrementContributor adds new users", () => {
  const next = incrementContributor({}, "alice");
  assert.equal(next.alice, 1);
});

test("incrementContributor bumps existing users", () => {
  const next = incrementContributor({ alice: 2 }, "alice");
  assert.equal(next.alice, 3);
});

test("loadLeaderboard reads JSON map", () => {
  const board = loadLeaderboard(new URL("../leaderboard.json", import.meta.url));
  assert.ok(typeof board === "object");
});
