import { describe, it, expect, beforeEach } from "vitest";
import {
  Leaderboard,
  loadLeaderboard,
  saveLeaderboard,
  incrementUser,
  isAlreadyCounted,
  getContributor,
} from "./update-leaderboard";
import { writeFileSync, unlinkSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

describe("Leaderboard Unit Tests", () => {
  let board: Leaderboard;
  const TEST_PATH = join(tmpdir(), "test-leaderboard.json");

  beforeEach(() => {
    board = {};
    // Clean up test file if it exists
    if (existsSync(TEST_PATH)) {
      try {
        unlinkSync(TEST_PATH);
      } catch {
        // ignore
      }
    }
  });

  describe("incrementUser()", () => {
    it("should increment an existing contributor", () => {
      board["alice"] = 5;
      incrementUser(board, "alice");
      expect(board["alice"]).toBe(6);
    });

    it("should add a new contributor with count 1", () => {
      incrementUser(board, "bob");
      expect(board["bob"]).toBe(1);
    });

    it("should handle empty username gracefully", () => {
      incrementUser(board, "");
      expect(board[""]).toBeUndefined();
    });

    it("should handle multiple increments correctly", () => {
      incrementUser(board, "carol");
      incrementUser(board, "carol");
      incrementUser(board, "carol");
      expect(board["carol"]).toBe(3);
    });

    it("should be case-sensitive with usernames", () => {
      incrementUser(board, "Alice");
      incrementUser(board, "alice");
      expect(board["Alice"]).toBe(1);
      expect(board["alice"]).toBe(1);
    });
  });

  describe("isAlreadyCounted()", () => {
    it("should return true when PR is already counted", () => {
      const commits = [
        "chore: update leaderboard for PR #42",
        "fix: resolve sorting issue",
      ];
      expect(isAlreadyCounted(42, commits)).toBe(true);
    });

    it("should return false when PR is not counted", () => {
      const commits = [
        "fix: resolve sorting issue",
        "feat: add new feature",
      ];
      expect(isAlreadyCounted(99, commits)).toBe(false);
    });

    it("should return false with empty commits list", () => {
      expect(isAlreadyCounted(1, [])).toBe(false);
    });

    it("should not match partial commit messages", () => {
      const commits = ["chore: update leaderboard for PR #123 (second attempt)"];
      expect(isAlreadyCounted(123, commits)).toBe(false);
    });
  });

  describe("getContributor()", () => {
    it("should lowercase and trim the username", () => {
      expect(getContributor("  Alice  ")).toBe("alice");
    });

    it("should handle already clean usernames", () => {
      expect(getContributor("bob")).toBe("bob");
    });

    it("should return 'unknown' for empty input", () => {
      expect(getContributor("")).toBe("unknown");
    });
  });

  describe("loadLeaderboard()", () => {
    it("should return empty object when file does not exist", () => {
      const result = loadLeaderboard("/nonexistent/path.json");
      expect(result).toEqual({});
    });

    it("should load and parse existing leaderboard", () => {
      writeFileSync(TEST_PATH, JSON.stringify({ alice: 3, bob: 7 }), "utf-8");
      const result = loadLeaderboard(TEST_PATH);
      expect(result).toEqual({ alice: 3, bob: 7 });
    });

    it("should return empty object on corrupt JSON", () => {
      writeFileSync(TEST_PATH, "not valid json", "utf-8");
      const result = loadLeaderboard(TEST_PATH);
      expect(result).toEqual({});
    });
  });

  describe("saveLeaderboard()", () => {
    it("should save leaderboard to file", () => {
      const data = { alice: 1, bob: 2 };
      saveLeaderboard(data, TEST_PATH);
      const saved = JSON.parse(
        require("fs").readFileSync(TEST_PATH, "utf-8")
      );
      expect(saved).toEqual(data);
    });

    it("should handle empty leaderboard", () => {
      saveLeaderboard({}, TEST_PATH);
      const saved = JSON.parse(
        require("fs").readFileSync(TEST_PATH, "utf-8")
      );
      expect(saved).toEqual({});
    });
  });
});
