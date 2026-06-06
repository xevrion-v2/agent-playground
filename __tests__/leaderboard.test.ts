/**
 * Unit tests for the leaderboard update logic.
 *
 * The GitHub Actions workflow (auto-process.yml) uses this jq expression
 * to increment PR counts:
 *
 *   jq --arg user "$PR_USER" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json
 *
 * These tests replicate that logic in pure JS so we can verify:
 *   - New contributors are added with count 1
 *   - Existing contributors have their count incremented
 *   - Other entries are not modified
 *   - Empty leaderboards are handled
 */

import * as fs from "fs";
import * as path from "path";

const LEADERBOARD_PATH = path.resolve(__dirname, "../../leaderboard.json");

/**
 * Replicate the jq update logic:
 *   .[$user] = ((.[$user] // 0) + 1)
 */
function incrementUser(
  board: Record<string, number>,
  user: string
): Record<string, number> {
  return {
    ...board,
    [user]: (board[user] ?? 0) + 1,
  };
}

function loadLeaderboard(): Record<string, number> {
  const raw = fs.readFileSync(LEADERBOARD_PATH, "utf-8");
  return JSON.parse(raw);
}

describe("leaderboard update logic", () => {
  let original: Record<string, number>;

  beforeAll(() => {
    original = loadLeaderboard();
  });

  test("leaderboard.json is valid JSON with numeric values", () => {
    expect(typeof original).toBe("object");
    for (const [key, value] of Object.entries(original)) {
      expect(typeof key).toBe("string");
      expect(typeof value).toBe("number");
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
    }
  });

  test("incrementing an existing user increases their count by 1", () => {
    const firstKey = Object.keys(original)[0];
    const before = original[firstKey];
    const result = incrementUser(original, firstKey);
    expect(result[firstKey]).toBe(before + 1);
  });

  test("incrementing a new user sets their count to 1", () => {
    const result = incrementUser(original, "__test_new_user__");
    expect(result["__test_new_user__"]).toBe(1);
  });

  test("incrementing one user does not affect other users", () => {
    const result = incrementUser(original, "__test_iso_user__");
    for (const key of Object.keys(original)) {
      expect(result[key]).toBe(original[key]);
    }
  });

  test("incrementing an empty leaderboard", () => {
    const empty: Record<string, number> = {};
    const result = incrementUser(empty, "first-user");
    expect(result).toEqual({ "first-user": 1 });
  });

  test("incrementing the same user twice", () => {
    let board: Record<string, number> = {};
    board = incrementUser(board, "repeat-user");
    board = incrementUser(board, "repeat-user");
    expect(board["repeat-user"]).toBe(2);
  });

  test("all values remain integers after update", () => {
    const result = incrementUser(original, Object.keys(original)[0]);
    for (const value of Object.values(result)) {
      expect(Number.isInteger(value)).toBe(true);
    }
  });
});
