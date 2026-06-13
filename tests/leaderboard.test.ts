import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const LEADERBOARD_PATH = join(__dirname, "../../leaderboard.json");

describe("Leaderboard", () => {
  it("should be valid JSON", () => {
    const content = readFileSync(LEADERBOARD_PATH, "utf-8");
    const data = JSON.parse(content);
    expect(data).toBeDefined();
    expect(typeof data).toBe("object");
  });

  it("should have string keys (usernames) and number values (PR counts)", () => {
    const content = readFileSync(LEADERBOARD_PATH, "utf-8");
    const data = JSON.parse(content);

    for (const [username, count] of Object.entries(data)) {
      expect(typeof username).toBe("string");
      expect(username.length).toBeGreaterThan(0);
      expect(typeof count).toBe("number");
      expect(count).toBeGreaterThan(0);
      expect(Number.isInteger(count)).toBe(true);
    }
  });

  it("should have reasonable PR counts (1-100)", () => {
    const content = readFileSync(LEADERBOARD_PATH, "utf-8");
    const data = JSON.parse(content);

    for (const [username, count] of Object.entries(data)) {
      expect(count as number).toBeGreaterThanOrEqual(1);
      expect(count as number).toBeLessThanOrEqual(100);
    }
  });

  it("should have at least one contributor", () => {
    const content = readFileSync(LEADERBOARD_PATH, "utf-8");
    const data = JSON.parse(content);
    const contributors = Object.keys(data);
    expect(contributors.length).toBeGreaterThan(0);
  });
});
