import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { updateLeaderboard } from "./update_leaderboard.js";

describe("updateLeaderboard", () => {
  it("adds new contributor with count 1", () => {
    const out = updateLeaderboard({}, "reckoning89");
    assert.deepEqual(out, { reckoning89: 1 });
  });

  it("increments existing contributor", () => {
    const out = updateLeaderboard({ reckoning89: 3, other: 1 }, "reckoning89");
    assert.equal(out.reckoning89, 4);
    assert.equal(out.other, 1);
  });
});
