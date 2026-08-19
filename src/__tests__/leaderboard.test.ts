import { describe, it, expect } from "vitest";
import { addContribution, getRanking, Leaderboard } from "../leaderboard";

describe("addContribution", () => {
  it("should add a new contributor with count 1", () => {
    const board: Leaderboard = {};
    const result = addContribution(board, "alice");
    expect(result).toEqual({ alice: 1 });
  });

  it("should increment an existing contributor's count", () => {
    const board: Leaderboard = { alice: 3 };
    const result = addContribution(board, "alice");
    expect(result).toEqual({ alice: 4 });
  });

  it("should not mutate the original board", () => {
    const board: Leaderboard = { alice: 1 };
    const result = addContribution(board, "alice");
    expect(board.alice).toBe(1);
    expect(result.alice).toBe(2);
  });

  it("should preserve other contributors", () => {
    const board: Leaderboard = { alice: 2, bob: 5 };
    const result = addContribution(board, "alice");
    expect(result).toEqual({ alice: 3, bob: 5 });
  });

  it("should handle multiple new contributors", () => {
    let board: Leaderboard = {};
    board = addContribution(board, "alice");
    board = addContribution(board, "bob");
    board = addContribution(board, "alice");
    expect(board).toEqual({ alice: 2, bob: 1 });
  });
});

describe("getRanking", () => {
  it("should return entries sorted by count descending", () => {
    const board: Leaderboard = { alice: 2, bob: 5, carol: 1 };
    const ranking = getRanking(board);
    expect(ranking).toEqual([
      ["bob", 5],
      ["alice", 2],
      ["carol", 1],
    ]);
  });

  it("should return an empty array for an empty board", () => {
    const ranking = getRanking({});
    expect(ranking).toEqual([]);
  });

  it("should handle a single contributor", () => {
    const ranking = getRanking({ alice: 10 });
    expect(ranking).toEqual([["alice", 10]]);
  });
});
