import { describe, it, expect } from "vitest";
import { incrementUser, mergeLeaderboard } from "../update-leaderboard.js";

describe("incrementUser", () => {
  it("increments an existing contributor's count", () => {
    const board = { alice: 3, bob: 1 };
    const result = incrementUser(board, "alice");
    expect(result.alice).toBe(4);
  });

  it("starts a new contributor at 1", () => {
    const board = { alice: 3 };
    const result = incrementUser(board, "carol");
    expect(result.carol).toBe(1);
  });

  it("does not mutate the original leaderboard", () => {
    const board = { alice: 2 };
    incrementUser(board, "alice");
    expect(board.alice).toBe(2);
  });

  it("preserves other contributors unchanged", () => {
    const board = { alice: 5, bob: 2 };
    const result = incrementUser(board, "alice");
    expect(result.bob).toBe(2);
  });

  it("handles an empty leaderboard", () => {
    const result = incrementUser({}, "dave");
    expect(result.dave).toBe(1);
  });
});

describe("mergeLeaderboard", () => {
  it("merges counts for existing users", () => {
    const existing = { alice: 3, bob: 2 };
    const updates = { alice: 2 };
    expect(mergeLeaderboard(existing, updates).alice).toBe(5);
  });

  it("adds new users from updates", () => {
    const existing = { alice: 3 };
    const updates = { carol: 4 };
    const result = mergeLeaderboard(existing, updates);
    expect(result.carol).toBe(4);
    expect(result.alice).toBe(3);
  });

  it("does not mutate the existing leaderboard", () => {
    const existing = { alice: 1 };
    mergeLeaderboard(existing, { alice: 5 });
    expect(existing.alice).toBe(1);
  });
});
