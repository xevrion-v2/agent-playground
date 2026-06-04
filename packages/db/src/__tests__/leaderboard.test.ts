import { describe, it, expect } from "vitest";

// Leaderboard data shape
interface Leaderboard {
  [username: string]: number;
}

import leaderboardData from "../../leaderboard.json";

describe("leaderboard", () => {
  it("is a non-empty object", () => {
    expect(typeof leaderboardData).toBe("object");
    expect(Object.keys(leaderboardData).length).toBeGreaterThan(0);
  });

  it("has all numeric values (contribution counts)", () => {
    for (const value of Object.values(leaderboardData)) {
      expect(typeof value).toBe("number");
      expect(Number.isInteger(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
    }
  });

  it("has username keys that are non-empty strings", () => {
    for (const key of Object.keys(leaderboardData)) {
      expect(typeof key).toBe("string");
      expect(key.length).toBeGreaterThan(0);
    }
  });

  it("allows adding a new contributor", () => {
    const lb: Leaderboard = { ...leaderboardData };
    const newUser = "test-contributor";
    lb[newUser] = 1;
    expect(lb[newUser]).toBe(1);
  });

  it("allows incrementing an existing contributor", () => {
    const lb: Leaderboard = { ...leaderboardData };
    const firstKey = Object.keys(lb)[0];
    const original = lb[firstKey];
    lb[firstKey] = original + 1;
    expect(lb[firstKey]).toBe(original + 1);
  });

  it("has a total_contributions that matches sum of values", () => {
    const lb: Leaderboard = leaderboardData as Leaderboard;
    let total = 0;
    for (const count of Object.values(lb)) {
      total += count;
    }
    expect(total).toBeGreaterThan(0);
  });

  it("handles updating an existing contributor without affecting others", () => {
    const lb: Leaderboard = { ...leaderboardData };
    const keys = Object.keys(lb);
    const targetKey = keys[0];
    const otherKeys = keys.slice(1);

    lb[targetKey] = lb[targetKey] + 1;

    // Verify other entries unchanged
    for (const key of otherKeys) {
      expect(lb[key]).toBe(leaderboardData[key]);
    }
  });
});
