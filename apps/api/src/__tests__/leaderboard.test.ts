import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const DATA_FILE = join(__dirname, "..", "leaderboard.json");

function readLeaderboard(): Record<string, number> {
  if (!existsSync(DATA_FILE)) return {};
  return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
}

function updateLeaderboard(username: string, points: number) {
  const data = readLeaderboard();
  data[username] = (data[username] || 0) + points;
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getTopContributors(limit = 5): Array<{ username: string; points: number }> {
  const data = readLeaderboard();
  return Object.entries(data)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, limit)
    .map(([username, points]) => ({ username, points: points as number }));
}

describe("Leaderboard", () => {
  const originalData = existsSync(DATA_FILE)
    ? readFileSync(DATA_FILE, "utf-8")
    : null;

  afterEach(() => {
    // Restore original data
    if (originalData) {
      writeFileSync(DATA_FILE, originalData);
    }
  });

  describe("readLeaderboard", () => {
    it("should return a non-empty object", () => {
      const data = readLeaderboard();
      assert.ok(typeof data === "object");
      assert.ok(Object.keys(data).length > 0);
    });

    it("should have numeric point values", () => {
      const data = readLeaderboard();
      for (const [, points] of Object.entries(data)) {
        assert.strictEqual(typeof points, "number", "Each point value must be a number");
        assert.ok(points >= 0, "Points must be non-negative");
        assert.ok(Number.isInteger(points), "Points must be an integer");
      }
    });
  });

  describe("updateLeaderboard", () => {
    it("should increment points for an existing contributor", () => {
      const before = readLeaderboard();
      const username = Object.keys(before)[0];
      const beforePoints = before[username];

      updateLeaderboard(username, 5);
      const after = readLeaderboard();
      assert.strictEqual(after[username], beforePoints + 5);
    });

    it("should add a new contributor with the given points", () => {
      const newUser = `test-new-user-${Date.now()}`;
      updateLeaderboard(newUser, 10);
      const after = readLeaderboard();
      assert.strictEqual(after[newUser], 10);
      // Clean up
      delete after[newUser];
      writeFileSync(DATA_FILE, JSON.stringify(after, null, 2));
    });
  });

  describe("getTopContributors", () => {
    it("should return the correct number of contributors", () => {
      const top = getTopContributors(3);
      assert.ok(top.length <= 3);
    });

    it("should return contributors sorted by points descending", () => {
      const top = getTopContributors(5);
      for (let i = 1; i < top.length; i++) {
        assert.ok(
          top[i - 1].points >= top[i].points,
          "Contributors must be sorted by points descending"
        );
      }
    });

    it("should return objects with username and points", () => {
      const top = getTopContributors(1);
      if (top.length > 0) {
        assert.ok(typeof top[0].username === "string");
        assert.ok(typeof top[0].points === "number");
      }
    });
  });
});
