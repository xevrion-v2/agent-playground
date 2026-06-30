import { describe, it, expect } from "vitest";

describe("leaderboard", () => {
  it("adds new contributor", () => {
    const lb: Record<string, number> = {};
    lb["new-user"] = (lb["new-user"] || 0) + 1;
    expect(lb["new-user"]).toBe(1);
  });
  it("increments existing contributor", () => {
    const lb: Record<string, number> = { "existing-user": 5 };
    lb["existing-user"]++;
    expect(lb["existing-user"]).toBe(6);
  });
  it("sorts by score descending", () => {
    const lb = { a: 3, b: 5, c: 1 };
    const sorted = Object.entries(lb).sort(([,a],[,b]) => b - a);
    expect(sorted[0][0]).toBe("b");
    expect(sorted[0][1]).toBe(5);
  });
});
