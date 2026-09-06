/**
 * Unit tests for leaderboard update workflow logic.
 * 
 * Since the leaderboard update is implemented as a GitHub Actions workflow
 * (.github/workflows/auto-process.yml) using shell/jq, these tests validate
 * the core transformation logic by simulating the jq operations and
 * edge cases that the workflow handles.
 * 
 * Bounty: #11 - Write unit tests for leaderboard updates
 */

import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Helper to simulate the jq leaderboard update operation.
 * Mirrors: jq --arg user "${PR_USER}" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json
 */
function simulateLeaderboardUpdate(
  existingJson: string,
  username: string
): Record<string, number> {
  const tmpDir = mkdtempSync(join(tmpdir(), "lb-test-"));
  const inputFile = join(tmpDir, "leaderboard.json");
  const outputFile = join(tmpDir, "leaderboard-out.json");

  try {
    writeFileSync(inputFile, existingJson);
    execSync(
      `jq --arg user "${username}" '.[$user] = ((.[$user] // 0) + 1)' "${inputFile}" > "${outputFile}"`,
      { stdio: "pipe" }
    );
    return JSON.parse(readFileSync(outputFile, "utf-8"));
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

describe("Leaderboard Update Logic", () => {
  describe("new contributor", () => {
    it("should add a new user with count 1 to an empty leaderboard", () => {
      const result = simulateLeaderboardUpdate("{}", "alice");
      expect(result).toEqual({ alice: 1 });
    });

    it("should add a new user with count 1 to an existing leaderboard", () => {
      const existing = JSON.stringify({ bob: 5, charlie: 3 });
      const result = simulateLeaderboardUpdate(existing, "alice");
      expect(result).toEqual({ bob: 5, charlie: 3, alice: 1 });
    });
  });

  describe("existing contributor", () => {
    it("should increment count for an existing user", () => {
      const existing = JSON.stringify({ alice: 1 });
      const result = simulateLeaderboardUpdate(existing, "alice");
      expect(result).toEqual({ alice: 2 });
    });

    it("should correctly increment when user has many contributions", () => {
      const existing = JSON.stringify({ alice: 99 });
      const result = simulateLeaderboardUpdate(existing, "alice");
      expect(result).toEqual({ alice: 100 });
    });

    it("should not modify other users when incrementing one", () => {
      const existing = JSON.stringify({ alice: 5, bob: 10, charlie: 1 });
      const result = simulateLeaderboardUpdate(existing, "bob");
      expect(result).toEqual({ alice: 5, bob: 11, charlie: 1 });
    });
  });

  describe("edge cases", () => {
    it("should handle usernames with hyphens and numbers", () => {
      const result = simulateLeaderboardUpdate("{}", "user-123-test");
      expect(result).toEqual({ "user-123-test": 1 });
    });

    it("should handle usernames with underscores", () => {
      const existing = JSON.stringify({ some_user: 3 });
      const result = simulateLeaderboardUpdate(existing, "some_user");
      expect(result).toEqual({ some_user: 4 });
    });

    it("should preserve large existing counts while adding new user", () => {
      const existing = JSON.stringify({ top_contributor: 191, another: 50 });
      const result = simulateLeaderboardUpdate(existing, "newbie");
      expect(result).toEqual({ top_contributor: 191, another: 50, newbie: 1 });
    });
  });
});
