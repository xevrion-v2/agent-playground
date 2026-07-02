import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Leaderboard (leaderboard.json)", () => {
  const raw = readFileSync(resolve(__dirname, "../leaderboard.json"), "utf-8");
  const data: Record<string, number> = JSON.parse(raw);

  it("is valid JSON", () => {
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  it("contains at least one contributor", () => {
    const keys = Object.keys(data);
    expect(keys.length).toBeGreaterThan(0);
  });

  it("has all positive scores", () => {
    for (const [user, score] of Object.entries(data)) {
      expect(score).toBeGreaterThanOrEqual(0);
    }
  });

  it("has unique contributor names", () => {
    const keys = Object.keys(data);
    const unique = new Set(keys);
    expect(unique.size).toBe(keys.length);
  });

  it("lists scores as integers", () => {
    for (const score of Object.values(data)) {
      expect(Number.isInteger(score)).toBe(true);
    }
  });
});
