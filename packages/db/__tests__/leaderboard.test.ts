import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { readLeaderboard, writeLeaderboard, updateLeaderboard } from "../src/leaderboard";

const TEST_PATH = path.resolve(__dirname, "../../../leaderboard.test.json");
const REAL_PATH = path.resolve(__dirname, "../../../leaderboard.json");

// Patch the module to use a temporary file during tests
(globalThis as any).__LEADERBOARD_PATH__ = TEST_PATH;

describe("leaderboard", () => {
  beforeEach(() => {
    // Start each test with a clean board
    writeLeaderboard({});
  });

  afterEach(() => {
    try { fs.unlinkSync(TEST_PATH); } catch { /* ok */ }
  });

  describe("readLeaderboard", () => {
    it("returns an empty object when no file exists", () => {
      const board = readLeaderboard();
      expect(board).toEqual({});
    });

    it("returns existing entries", () => {
      writeLeaderboard({ alice: 3, bob: 1 });
      const board = readLeaderboard();
      expect(board).toEqual({ alice: 3, bob: 1 });
    });
  });

  describe("updateLeaderboard", () => {
    it("creates a new contributor entry with count 1", () => {
      const count = updateLeaderboard("newbie");
      expect(count).toBe(1);
      expect(readLeaderboard()).toEqual({ newbie: 1 });
    });

    it("increments an existing contributor's count", () => {
      writeLeaderboard({ alice: 3 });
      const count = updateLeaderboard("alice");
      expect(count).toBe(4);
      expect(readLeaderboard()).toEqual({ alice: 4 });
    });

    it("handles multiple contributors independently", () => {
      updateLeaderboard("alice");
      updateLeaderboard("bob");
      updateLeaderboard("alice");
      const board = readLeaderboard();
      expect(board["alice"]).toBe(2);
      expect(board["bob"]).toBe(1);
    });
  });
});
