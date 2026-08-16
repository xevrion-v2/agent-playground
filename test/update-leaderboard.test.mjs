import assert from "node:assert/strict";
import { test, describe } from "node:test";
import { applyLeaderboardUpdate } from "../scripts/update-leaderboard.mjs";

describe("applyLeaderboardUpdate", () => {
  test("increments an existing contributor count", () => {
    const result = applyLeaderboardUpdate({ alice: 5, bob: 3 }, "alice");
    assert.deepEqual(result, { alice: 6, bob: 3 });
  });

  test("adds a new contributor with count 1", () => {
    const result = applyLeaderboardUpdate({ alice: 5 }, "charlie");
    assert.deepEqual(result, { alice: 5, charlie: 1 });
  });

  test("trims whitespace from contributor name", () => {
    const result = applyLeaderboardUpdate({}, "  alice  ");
    assert.deepEqual(result, { alice: 1 });
  });

  test("handles multiple increments for the same contributor", () => {
    let lb = {};
    lb = applyLeaderboardUpdate(lb, "alice");
    lb = applyLeaderboardUpdate(lb, "alice");
    lb = applyLeaderboardUpdate(lb, "alice");
    assert.deepEqual(lb, { alice: 3 });
  });

  test("throws on empty string contributor", () => {
    assert.throws(() => applyLeaderboardUpdate({}, ""), TypeError);
  });

  test("throws on whitespace-only contributor", () => {
    assert.throws(() => applyLeaderboardUpdate({}, "   "), TypeError);
  });

  test("throws on null/undefined contributor", () => {
    assert.throws(() => applyLeaderboardUpdate({}, null), TypeError);
    assert.throws(() => applyLeaderboardUpdate({}, undefined), TypeError);
  });

  test("does not mutate the original leaderboard", () => {
    const original = { alice: 5 };
    const result = applyLeaderboardUpdate(original, "bob");
    assert.deepEqual(original, { alice: 5 });
    assert.deepEqual(result, { alice: 5, bob: 1 });
  });
});
