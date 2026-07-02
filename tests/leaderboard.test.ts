import { describe, it, expect } from "vitest";
import leaderboard from "../leaderboard.json";

describe("Leaderboard", () => {
  it("should contain contributor scores as numbers", () => {
    for (const [key, value] of Object.entries(leaderboard)) {
      expect(typeof key).toBe("string");
      expect(typeof value).toBe("number");
      expect(value).toBeGreaterThan(0);
    }
  });

  it("should have at least one contributor", () => {
    expect(Object.keys(leaderboard).length).toBeGreaterThan(0);
  });

  it("should handle new contributor addition", () => {
    const testLeaderboard = { ...leaderboard };
    const newContributor = "test-user-123";
    testLeaderboard[newContributor] = 1;
    
    expect(testLeaderboard[newContributor]).toBe(1);
    expect(Object.keys(testLeaderboard).length).toBe(Object.keys(leaderboard).length + 1);
  });

  it("should handle existing contributor score update", () => {
    const testLeaderboard = { ...leaderboard };
    const existingContributor = Object.keys(testLeaderboard)[0];
    const originalScore = testLeaderboard[existingContributor];
    
    testLeaderboard[existingContributor] = originalScore + 1;
    
    expect(testLeaderboard[existingContributor]).toBe(originalScore + 1);
  });
});
