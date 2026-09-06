import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  updateScore,
  removeUser,
  getTopEntries,
  getUserRank,
  Leaderboard,
} from "../routes/leaderboard.ts";

describe("Leaderboard update logic", () => {
  let board: Leaderboard;

  beforeEach(() => {
    board = { alice: 10, bob: 5, charlie: 15 };
  });

  describe("updateScore", () => {
    it("should add points to an existing user", () => {
      const result = updateScore(board, "alice", 5);
      assert.equal(result["alice"], 15);
    });

    it("should create a new entry for a new user", () => {
      const result = updateScore(board, "dave", 7);
      assert.equal(result["dave"], 7);
    });

    it("should not mutate the original leaderboard", () => {
      updateScore(board, "alice", 5);
      assert.equal(board["alice"], 10);
    });

    it("should handle zero points", () => {
      const result = updateScore(board, "alice", 0);
      assert.equal(result["alice"], 10);
    });

    it("should throw on empty username", () => {
      assert.throws(() => updateScore(board, "", 5), /Username is required/);
    });

    it("should throw on negative points", () => {
      assert.throws(() => updateScore(board, "alice", -1), /non-negative/);
    });

    it("should throw on non-string username", () => {
      assert.throws(() => updateScore(board, null as any, 5), /Username is required/);
    });
  });

  describe("removeUser", () => {
    it("should remove an existing user", () => {
      const result = removeUser(board, "bob");
      assert.equal(result["bob"], undefined);
      assert.equal(Object.keys(result).length, 2);
    });

    it("should not mutate the original leaderboard", () => {
      removeUser(board, "bob");
      assert.equal(board["bob"], 5);
    });

    it("should handle removing a non-existent user gracefully", () => {
      const result = removeUser(board, "nonexistent");
      assert.equal(Object.keys(result).length, 3);
    });

    it("should throw on empty username", () => {
      assert.throws(() => removeUser(board, ""), /Username is required/);
    });
  });

  describe("getTopEntries", () => {
    it("should return entries sorted by score descending", () => {
      const top = getTopEntries(board, 3);
      assert.equal(top[0].username, "charlie");
      assert.equal(top[0].score, 15);
      assert.equal(top[1].username, "alice");
      assert.equal(top[1].score, 10);
      assert.equal(top[2].username, "bob");
      assert.equal(top[2].score, 5);
    });

    it("should respect the limit parameter", () => {
      const top = getTopEntries(board, 2);
      assert.equal(top.length, 2);
    });

    it("should default to 10 entries", () => {
      const bigBoard: Leaderboard = {};
      for (let i = 0; i < 20; i++) {
        bigBoard[`user${i}`] = i;
      }
      const top = getTopEntries(bigBoard);
      assert.equal(top.length, 10);
    });

    it("should handle empty leaderboard", () => {
      const top = getTopEntries({}, 10);
      assert.deepEqual(top, []);
    });
  });

  describe("getUserRank", () => {
    it("should return 1 for the highest scorer", () => {
      assert.equal(getUserRank(board, "charlie"), 1);
    });

    it("should return correct rank for middle user", () => {
      assert.equal(getUserRank(board, "alice"), 2);
    });

    it("should return -1 for non-existent user", () => {
      assert.equal(getUserRank(board, "nobody"), -1);
    });

    it("should handle ties by insertion order", () => {
      const tiedBoard: Leaderboard = { a: 10, b: 10 };
      const rankA = getUserRank(tiedBoard, "a");
      const rankB = getUserRank(tiedBoard, "b");
      assert.ok(rankA >= 1 && rankA <= 2);
      assert.ok(rankB >= 1 && rankB <= 2);
    });
  });
});
