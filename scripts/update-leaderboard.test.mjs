import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { readFileSync, writeFileSync, mkdtempSync, cpSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

// Test the leaderboard logic directly
function updateLeaderboardLogic(agents, currentLeaderboard) {
  const leaderboard = { ...(currentLeaderboard || {}) };
  for (const agent of agents) {
    const username = agent.github_username;
    if (username && !leaderboard[username]) {
      leaderboard[username] = 1;
    }
  }
  return leaderboard;
}

describe("Leaderboard Updater", () => {
  it("should add new contributors to empty leaderboard", () => {
    const agents = [
      { github_username: "user1" },
      { github_username: "user2" }
    ];
    const result = updateLeaderboardLogic(agents, {});
    assert.strictEqual(result.user1, 1);
    assert.strictEqual(result.user2, 1);
    assert.strictEqual(Object.keys(result).length, 2);
  });

  it("should preserve existing contributor scores", () => {
    const agents = [
      { github_username: "existing_user" },
      { github_username: "new_user" }
    ];
    const existing = { existing_user: 5 };
    const result = updateLeaderboardLogic(agents, existing);
    assert.strictEqual(result.existing_user, 5);
    assert.strictEqual(result.new_user, 1);
  });

  it("should not duplicate existing entries", () => {
    const agents = [
      { github_username: "user1" },
      { github_username: "user1" }
    ];
    const result = updateLeaderboardLogic(agents, {});
    assert.strictEqual(result.user1, 1);
    assert.strictEqual(Object.keys(result).length, 1);
  });

  it("should handle empty agents array", () => {
    const result = updateLeaderboardLogic([], { existing: 3 });
    assert.strictEqual(result.existing, 3);
    assert.strictEqual(Object.keys(result).length, 1);
  });

  it("should handle agents without github_username", () => {
    const agents = [
      { model: "test" },
      { github_username: "real_user" }
    ];
    const result = updateLeaderboardLogic(agents, {});
    assert.strictEqual(result.real_user, 1);
    assert.strictEqual(Object.keys(result).length, 1);
  });
});
