import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("leaderboard.json", () => {
  const leaderboardPath = resolve(__dirname, "..", "leaderboard.json");
  const data = JSON.parse(readFileSync(leaderboardPath, "utf-8"));

  it("should be a non-empty object", () => {
    expect(typeof data).toBe("object");
    expect(data).not.toBeNull();
    expect(Object.keys(data).length).toBeGreaterThan(0);
  });

  it("should have string keys (contributor usernames)", () => {
    for (const key of Object.keys(data)) {
      expect(typeof key).toBe("string");
      expect(key.length).toBeGreaterThan(0);
    }
  });

  it("should have positive integer values (PR counts)", () => {
    for (const [key, value] of Object.entries(data)) {
      expect(typeof value).toBe("number");
      expect(value as number).toBeGreaterThan(0);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  it("should include known contributors", () => {
    const contributors = Object.keys(data);
    // At least some contributors should be present
    expect(contributors.length).toBeGreaterThan(5);
  });

  it("should have consistent data types for all entries", () => {
    for (const value of Object.values(data)) {
      expect(typeof value).toBe("number");
    }
  });
});
