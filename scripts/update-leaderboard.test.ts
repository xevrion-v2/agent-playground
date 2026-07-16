import { describe, it } from "node:test";
import assert from "node:assert";

/**
 * Unit tests for the leaderboard update script stub.
 * Tests cover the run() function's output format and data shape.
 */

describe("update-leaderboard", () => {
  it("should export a run function", async () => {
    const module = await import("./update-leaderboard.js");
    assert.strictEqual(typeof module.run, "function", "run should be a function");
  });

  it("should return a rankedUsers array", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    assert.ok(Array.isArray(result.rankedUsers), "rankedUsers should be an array");
  });

  it("should return at least one ranked user", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    assert.ok(result.rankedUsers.length > 0, "should have at least one ranked user");
  });

  it("should include expected user fields", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    const firstUser = result.rankedUsers[0];

    assert.ok("id" in firstUser, "user should have id");
    assert.ok("name" in firstUser, "user should have name");
    assert.ok("score" in firstUser, "user should have score");
    assert.ok("rank" in firstUser, "user should have rank");
  });

  it("should assign rank 1 to the first user", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    assert.strictEqual(result.rankedUsers[0].rank, 1, "first user should be rank 1");
  });

  it("should include computedAt timestamp", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    assert.ok("computedAt" in result, "result should include computedAt");
    assert.ok(new Date(result.computedAt).toISOString() === result.computedAt, "computedAt should be valid ISO timestamp");
  });

  it("should have scores as numbers", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    for (const user of result.rankedUsers) {
      assert.strictEqual(typeof user.score, "number", "score should be a number");
      assert.ok(user.score >= 0, "score should be non-negative");
    }
  });

  it("should have string ids", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    for (const user of result.rankedUsers) {
      assert.strictEqual(typeof user.id, "string", "id should be a string");
      assert.ok(user.id.length > 0, "id should not be empty");
    }
  });

  it("should have incrementing ranks", async () => {
    const module = await import("./update-leaderboard.js");
    const result = await module.run();
    for (let i = 0; i < result.rankedUsers.length; i++) {
      assert.strictEqual(result.rankedUsers[i].rank, i + 1, `user at index ${i} should have rank ${i + 1}`);
    }
  });
});
