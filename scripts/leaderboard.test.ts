import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  incrementContributor,
  isPrAlreadyCounted,
  serializeLeaderboard,
} from "./leaderboard";

describe("incrementContributor", () => {
  it("initializes a new contributor with PR count 1", () => {
    const result = incrementContributor({}, "alice");
    assert.equal(result["alice"], 1);
  });
  it("increments an existing contributor", () => {
    const result = incrementContributor({ bob: 3 }, "bob");
    assert.equal(result["bob"], 4);
  });
  it("does not mutate the original leaderboard", () => {
    const original = { charlie: 1 };
    const updated = incrementContributor(original, "charlie");
    assert.equal(original["charlie"], 1);
    assert.equal(updated["charlie"], 2);
    assert.notStrictEqual(updated, original);
  });
  it("handles multiple increments correctly", () => {
    let lb = incrementContributor({}, "dave");
    lb = incrementContributor(lb, "dave");
    lb = incrementContributor(lb, "dave");
    assert.equal(lb["dave"], 3);
  });
  it("handles multiple contributors", () => {
    let lb = incrementContributor({}, "eve");
    lb = incrementContributor(lb, "frank");
    lb = incrementContributor(lb, "eve");
    assert.equal(lb["eve"], 2);
    assert.equal(lb["frank"], 1);
  });
});

describe("isPrAlreadyCounted", () => {
  it("returns false when PR has not been counted", () => {
    assert.equal(isPrAlreadyCounted([], "pr-1"), false);
  });
  it("returns true when PR has been counted", () => {
    assert.equal(isPrAlreadyCounted(["pr-1", "pr-2"], "pr-2"), true);
  });
  it("is case-sensitive", () => {
    assert.equal(isPrAlreadyCounted(["PR-1"], "pr-1"), false);
  });
});

describe("serializeLeaderboard", () => {
  it("returns JSON with sorted keys", () => {
    const result = serializeLeaderboard({ zebra: 1, alpha: 2, bravo: 3 });
    const parsed = JSON.parse(result);
    assert.deepEqual(Object.keys(parsed), ["alpha", "bravo", "zebra"]);
  });
  it("returns a valid JSON string", () => {
    const result = serializeLeaderboard({ test: 42 });
    assert.equal(result, '{"test":42}');
  });
});
