import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  incrementContributor,
  isPrAlreadyCounted,
  serializeLeaderboard,
  Leaderboard,
} from "./leaderboard";

describe("incrementContributor", () => {
  it("should initialize a new contributor with count 1", () => {
    const lb: Leaderboard = {};
    const result = incrementContributor(lb, "newUser");
    assert.equal(result["newUser"], 1);
  });

  it("should increment an existing contributor", () => {
    const lb: Leaderboard = { alice: 5 };
    const result = incrementContributor(lb, "alice");
    assert.equal(result["alice"], 6);
  });

  it("should not mutate the original leaderboard", () => {
    const lb: Leaderboard = { bob: 3 };
    const result = incrementContributor(lb, "bob");
    assert.notEqual(result, lb);
    assert.equal(lb["bob"], 3);
  });

  it("should handle multiple increments correctly", () => {
    let lb: Leaderboard = {};
    lb = incrementContributor(lb, "user1");
    lb = incrementContributor(lb, "user1");
    lb = incrementContributor(lb, "user1");
    assert.equal(lb["user1"], 3);
  });

  it("should support multiple distinct contributors", () => {
    let lb: Leaderboard = {};
    lb = incrementContributor(lb, "alice");
    lb = incrementContributor(lb, "bob");
    lb = incrementContributor(lb, "alice");
    assert.equal(lb["alice"], 2);
    assert.equal(lb["bob"], 1);
  });
});

describe("isPrAlreadyCounted", () => {
  it("should return true when the PR has been counted", () => {
    const messages = ["chore: update leaderboard for PR #42", "fix: typo"];
    assert.equal(isPrAlreadyCounted(messages, 42), true);
  });

  it("should return false when the PR has not been counted", () => {
    const messages = ["chore: update leaderboard for PR #99", "docs: readme"];
    assert.equal(isPrAlreadyCounted(messages, 42), false);
  });

  it("should return false for empty commit list", () => {
    assert.equal(isPrAlreadyCounted([], 1), false);
  });

  it("should not false-match partial PR numbers", () => {
    const messages = ["chore: update leaderboard for PR #123"];
    assert.equal(isPrAlreadyCounted(messages, 12), false);
  });
});

describe("serializeLeaderboard", () => {
  it("should produce valid JSON with sorted keys", () => {
    const lb: Leaderboard = { zebra: 3, apple: 1, mango: 2 };
    const result = serializeLeaderboard(lb);
    const parsed = JSON.parse(result);
    const keys = Object.keys(parsed);
    assert.deepEqual(keys, ["apple", "mango", "zebra"]);
    assert.equal(parsed["apple"], 1);
    assert.equal(parsed["mango"], 2);
    assert.equal(parsed["zebra"], 3);
  });

  it("should return empty object JSON for empty leaderboard", () => {
    const result = serializeLeaderboard({});
    const parsed = JSON.parse(result);
    assert.deepEqual(parsed, {});
  });

  it("should end with newline", () => {
    const lb: Leaderboard = { user: 1 };
    const result = serializeLeaderboard(lb);
    assert.ok(result.endsWith("\n"));
  });
});
