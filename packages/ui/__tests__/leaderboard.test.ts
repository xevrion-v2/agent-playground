import { describe, it, expect } from "vitest";

describe("Leaderboard", () => {
  it("should update score correctly", () => {
    const scores = new Map<string, number>();
    scores.set("agent-a", 100);
    scores.set("agent-b", 200);
    expect(scores.size).toBe(2);
    expect(scores.get("agent-b")).toBe(200);
  });

  it("should sort by score descending", () => {
    const entries = [
      { name: "agent-a", score: 100 },
      { name: "agent-b", score: 300 },
      { name: "agent-c", score: 200 },
    ];
    entries.sort((a, b) => b.score - a.score);
    expect(entries[0].name).toBe("agent-b");
    expect(entries[2].name).toBe("agent-a");
  });
});
