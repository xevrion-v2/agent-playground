import { describe, it, expect, beforeEach } from "vitest";

// Inline the functions so we don't need module resolution setup
interface Leaderboard {
  [user: string]: number;
}

function incrementUser(board: Leaderboard, user: string): Leaderboard {
  board[user] = (board[user] ?? 0) + 1;
  return board;
}

function isAlreadyCounted(
  prNumber: number,
  recentCommits: string[] = []
): boolean {
  const pattern = `^chore: update leaderboard for PR #${prNumber}$`;
  return recentCommits.some((msg) => new RegExp(pattern).test(msg));
}

// ── Tests for incrementUser ─────────────────────────────────────

describe("incrementUser", () => {
  it("should add a new user with count 1", () => {
    const board: Leaderboard = {};
    incrementUser(board, "alice");
    expect(board).toEqual({ alice: 1 });
  });

  it("should increment an existing user's count", () => {
    const board: Leaderboard = { alice: 5 };
    incrementUser(board, "alice");
    expect(board).toEqual({ alice: 6 });
  });

  it("should not affect other users when incrementing", () => {
    const board: Leaderboard = { alice: 1, bob: 2 };
    incrementUser(board, "alice");
    expect(board).toEqual({ alice: 2, bob: 2 });
  });

  it("should handle multiple increments", () => {
    const board: Leaderboard = {};
    incrementUser(board, "user1");
    incrementUser(board, "user1");
    incrementUser(board, "user1");
    expect(board).toEqual({ user1: 3 });
  });
});

// ── Tests for isAlreadyCounted ───────────────────────────────────

describe("isAlreadyCounted", () => {
  it("should return true when commit message matches", () => {
    const commits = [
      "feat: add user route",
      "chore: update leaderboard for PR #42",
      "fix: resolve edge case",
    ];
    expect(isAlreadyCounted(42, commits)).toBe(true);
  });

  it("should return false when no commit message matches", () => {
    const commits = [
      "feat: add user route",
      "fix: resolve edge case",
    ];
    expect(isAlreadyCounted(99, commits)).toBe(false);
  });

  it("should return false for empty commits list", () => {
    expect(isAlreadyCounted(1, [])).toBe(false);
  });

  it("should not match a different PR number", () => {
    const commits = [
      "chore: update leaderboard for PR #42",
    ];
    expect(isAlreadyCounted(43, commits)).toBe(false);
  });

  it("should not match similar but non-matching messages", () => {
    const commits = [
      "chore: update leaderboard for PR #42 (manual)",
    ];
    expect(isAlreadyCounted(42, commits)).toBe(false);
  });
});
