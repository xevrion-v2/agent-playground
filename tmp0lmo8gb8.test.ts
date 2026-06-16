import { describe, it, expect, beforeAll } from "vitest";
import * as fs from "fs";
import * as path from "path";

const LEADERBOARD_PATH = path.resolve(__dirname, "../../leaderboard.json");

describe("leaderboard.json", () => {
  let leaderboard: Record<string, number>;

  beforeAll(() => {
    const raw = fs.readFileSync(LEADERBOARD_PATH, "utf-8");
    leaderboard = JSON.parse(raw);
  });

  it("is valid JSON", () => {
    expect(() => JSON.parse(fs.readFileSync(LEADERBOARD_PATH, "utf-8"))).not.toThrow();
  });

  it("has at least one contributor", () => {
    expect(Object.keys(leaderboard).length).toBeGreaterThan(0);
  });

  it("all counts are positive integers", () => {
    for (const [user, count] of Object.entries(leaderboard)) {
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThan(0);
    }
  });

  it("usernames are non-empty strings", () => {
    for (const user of Object.keys(leaderboard)) {
      expect(user.length).toBeGreaterThan(0);
    }
  });

  it("new contributor can be added", () => {
    const newUser = "test-contributor-new";
    const updated = { ...leaderboard, [newUser]: (leaderboard[newUser] || 0) + 1 };
    expect(updated[newUser]).toBe(1);
  });

  it("existing contributor count increments", () => {
    const existingUser = Object.keys(leaderboard)[0];
    const updated = { ...leaderboard, [existingUser]: leaderboard[existingUser] + 1 };
    expect(updated[existingUser]).toBe(leaderboard[existingUser] + 1);
  });
});
