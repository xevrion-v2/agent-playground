import { describe, it, expect, beforeEach } from "vitest";
import { Leaderboard, addContribution } from "../leaderboard";

describe("leaderboard updates", () => {
  let board: Leaderboard;

  beforeEach(() => {
    board = {
      "alice": 5,
      "bob": 3,
      "charlie": 10,
    };
  });

  it("increments an existing contributor", () => {
    const updated = addContribution(board, "alice", 1);
    expect(updated["alice"]).toBe(6);
  });

  it("adds a new contributor", () => {
    const updated = addContribution(board, "dave", 1);
    expect(updated["dave"]).toBe(1);
  });

  it("defaults count to 1 when not specified", () => {
    const updated = addContribution(board, "bob");
    expect(updated["bob"]).toBe(4);
  });

  it("does not mutate the original board", () => {
    addContribution(board, "alice", 10);
    expect(board["alice"]).toBe(5);
  });

  it("handles adding multiple contributions at once", () => {
    const updated = addContribution(board, "charlie", 5);
    expect(updated["charlie"]).toBe(15);
  });

  it("handles an empty leaderboard", () => {
    const empty: Leaderboard = {};
    const updated = addContribution(empty, "newuser", 1);
    expect(updated["newuser"]).toBe(1);
  });
});
