
import { describe, it, expect, beforeEach } from "vitest";

// Leaderboard update types
interface Contributor {
  login: string;
  score: number;
  merged_prs: number;
}

// Leaderboard update logic (mirrors the actual script)
function updateLeaderboard(
  current: Contributor[],
  newEntry: { login: string; score: number; merged_prs: number }
): Contributor[] {
  const existing = current.find((c) => c.login === newEntry.login);
  if (existing) {
    return current.map((c) =>
      c.login === newEntry.login
        ? { ...c, score: c.score + newEntry.score, merged_prs: c.merged_prs + newEntry.merged_prs }
        : c
    );
  }
  return [...current, { ...newEntry }];
}

function sortLeaderboard(board: Contributor[]): Contributor[] {
  return [...board].sort((a, b) => b.score - a.score || b.merged_prs - a.merged_prs);
}

describe("Leaderboard Updates", () => {
  let board: Contributor[];

  beforeEach(() => {
    board = [
      { login: "alice", score: 100, merged_prs: 5 },
      { login: "bob",   score: 80,  merged_prs: 4 },
    ];
  });

  it("adds a new contributor who does not exist yet", () => {
    const updated = updateLeaderboard(board, { login: "charlie", score: 50, merged_prs: 2 });
    expect(updated).toHaveLength(3);
    expect(updated.find((c) => c.login === "charlie")).toBeDefined();
  });

  it("increments score for an existing contributor", () => {
    const updated = updateLeaderboard(board, { login: "alice", score: 20, merged_prs: 1 });
    const alice = updated.find((c) => c.login === "alice")!;
    expect(alice.score).toBe(120);
    expect(alice.merged_prs).toBe(6);
  });

  it("does not modify other contributors when updating one", () => {
    const updated = updateLeaderboard(board, { login: "alice", score: 10, merged_prs: 1 });
    const bob = updated.find((c) => c.login === "bob")!;
    expect(bob.score).toBe(80);
  });

  it("sorts by score descending", () => {
    const withNew = updateLeaderboard(board, { login: "charlie", score: 150, merged_prs: 7 });
    const sorted = sortLeaderboard(withNew);
    expect(sorted[0].login).toBe("charlie");
    expect(sorted[1].login).toBe("alice");
  });

  it("breaks score ties by merged_prs descending", () => {
    const tieBoard: Contributor[] = [
      { login: "x", score: 100, merged_prs: 3 },
      { login: "y", score: 100, merged_prs: 7 },
    ];
    const sorted = sortLeaderboard(tieBoard);
    expect(sorted[0].login).toBe("y");
  });

  it("handles empty leaderboard by adding first contributor", () => {
    const updated = updateLeaderboard([], { login: "first", score: 10, merged_prs: 1 });
    expect(updated).toHaveLength(1);
    expect(updated[0].login).toBe("first");
  });
});
