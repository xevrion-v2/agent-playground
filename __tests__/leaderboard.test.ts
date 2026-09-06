import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { existsSync, unlinkSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import {
  loadLeaderboard,
  incrementContributor,
  saveLeaderboard,
} from "../scripts/leaderboard";

const TEST_FILE = join(__dirname, "..", "test-leaderboard.json");

describe("Leaderboard update logic", () => {
  beforeEach(() => {
    if (existsSync(TEST_FILE)) {
      unlinkSync(TEST_FILE);
    }
  });

  afterEach(() => {
    if (existsSync(TEST_FILE)) {
      unlinkSync(TEST_FILE);
    }
  });

  describe("loadLeaderboard", () => {
    it("returns an empty object when the file does not exist", () => {
      const data = loadLeaderboard("/nonexistent/file.json");
      expect(data).toEqual({});
    });

    it("loads existing leaderboard data", () => {
      writeFileSync(TEST_FILE, JSON.stringify({ alice: 5, bob: 3 }));
      const data = loadLeaderboard(TEST_FILE);
      expect(data).toEqual({ alice: 5, bob: 3 });
    });
  });

  describe("incrementContributor", () => {
    it("increments an existing contributor by 1", () => {
      const board = { alice: 5 };
      const updated = incrementContributor(board, "alice");
      expect(updated.alice).toBe(6);
    });

    it("adds a new contributor with count 1", () => {
      const board = { alice: 5 };
      const updated = incrementContributor(board, "bob");
      expect(updated.bob).toBe(1);
      expect(updated.alice).toBe(5); // existing unchanged
    });

    it("does not mutate the original object", () => {
      const board = { alice: 5 };
      const updated = incrementContributor(board, "alice");
      expect(board.alice).toBe(5);
      expect(updated).not.toBe(board);
    });

    it("handles an empty leaderboard", () => {
      const board = {};
      const updated = incrementContributor(board, "charlie");
      expect(updated).toEqual({ charlie: 1 });
    });
  });

  describe("saveLeaderboard", () => {
    it("writes leaderboard data to a JSON file", () => {
      const data = { alice: 7, bob: 2 };
      saveLeaderboard(TEST_FILE, data);
      const raw = readFileSync(TEST_FILE, "utf-8");
      expect(JSON.parse(raw)).toEqual(data);
    });
  });
});
