import { describe, it, expect } from "vitest";

interface LeaderboardEntry {
  username: string;
  prCount: number;
}

function updateLeaderboard(entries: LeaderboardEntry[], username: string): LeaderboardEntry[] {
  const existing = entries.find((e) => e.username === username);
  if (existing) {
    return entries.map((e) =>
      e.username === username ? { ...e, prCount: e.prCount + 1 } : e
    );
  }
  return [...entries, { username, prCount: 1 }];
}

describe("updateLeaderboard", () => {
  it("increments an existing user PR count", () => {
    const entries: LeaderboardEntry[] = [{ username: "alice", prCount: 5 }];
    const updated = updateLeaderboard(entries, "alice");
    expect(updated[0].prCount).toBe(6);
  });

  it("adds a new user with prCount 1", () => {
    const entries: LeaderboardEntry[] = [];
    const updated = updateLeaderboard(entries, "bob");
    expect(updated[0]).toEqual({ username: "bob", prCount: 1 });
  });

  it("does not affect other entries", () => {
    const entries: LeaderboardEntry[] = [
      { username: "alice", prCount: 5 },
      { username: "bob", prCount: 3 },
    ];
    const updated = updateLeaderboard(entries, "alice");
    expect(updated[1].prCount).toBe(3);
  });
});
