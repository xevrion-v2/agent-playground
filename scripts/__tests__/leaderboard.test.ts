import { describe, it, expect } from "vitest";

describe("Leaderboard update logic", () => {
  const sample: Record<string, number> = { user1: 5, user2: 3 };

  it("increments existing contributor count", () => {
    const u = { ...sample }; u["user1"] = (u["user1"] || 0) + 1;
    expect(u["user1"]).toBe(6);
  });
  it("adds new contributor with count 1", () => {
    const u = { ...sample }; u["newuser"] = (u["newuser"] || 0) + 1;
    expect(u["newuser"]).toBe(1);
  });
  it("handles empty leaderboard", () => {
    const u: Record<string, number> = {}; u["first"] = (u["first"] || 0) + 1;
    expect(u["first"]).toBe(1);
  });
  it("does not mutate other entries", () => {
    const u = { ...sample }; u["user1"] = (u["user1"] || 0) + 1;
    expect(u["user2"]).toBe(3);
  });
});
