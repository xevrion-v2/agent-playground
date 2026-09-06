import { describe, it, expect } from "vitest";
import leaderboard from "./leaderboard.json";

describe("leaderboard", () => {
  it("should be a non-empty object mapping usernames to scores", () => {
    expect(typeof leaderboard).toBe("object");
    expect(Object.keys(leaderboard).length).toBeGreaterThan(50);
  });

  it("should have positive integer scores for every entry", () => {
    for (const [username, score] of Object.entries(leaderboard)) {
      expect(typeof username).toBe("string");
      expect(username.length).toBeGreaterThan(0);
      expect(Number.isInteger(score)).toBe(true);
      expect(score).toBeGreaterThan(0);
    }
  });

  it("should accept a new contributor", () => {
    const testUser = "__test_runner__";
    const updated = { ...leaderboard, [testUser]: 1 };
    expect(updated[testUser]).toBe(1);
  });

  it("should increment score for an existing contributor", () => {
    const user = Object.keys(leaderboard)[0];
    const oldScore = leaderboard[user];
    const updated = { ...leaderboard, [user]: oldScore + 1 };
    expect(updated[user]).toBe(oldScore + 1);
  });

  it("should not contain duplicate usernames", () => {
    const keys = Object.keys(leaderboard);
    const unique = new Set(keys);
    expect(unique.size).toBe(keys.length);
  });
});
