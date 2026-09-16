import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
import {
  loadLeaderboard,
  saveLeaderboard,
  incrementContributor,
  getTopContributors,
} from "../leaderboard";

const TEST_PATH = resolve(tmpdir(), "leaderboard-test.json");
const ORIGINAL_PATH = resolve(import.meta.dirname, "../../leaderboard.json");

let original: string;

beforeEach(() => {
  if (existsSync(ORIGINAL_PATH)) {
    original = readFileSync(ORIGINAL_PATH, "utf-8");
  }
});

afterEach(() => {
  writeFileSync(ORIGINAL_PATH, original, "utf-8");
});

describe("incrementContributor", () => {
  it("adds a new contributor with correct count", () => {
    const result = incrementContributor("test-user-123", 1);
    expect(result["test-user-123"]).toBe(1);
  });

  it("increments an existing contributor", () => {
    incrementContributor("test-user-123", 1);
    const result = incrementContributor("test-user-123", 3);
    expect(result["test-user-123"]).toBe(4);
  });

  it("throws on empty username", () => {
    expect(() => incrementContributor("", 1)).toThrow();
  });

  it("throws on zero amount", () => {
    expect(() => incrementContributor("user", 0)).toThrow();
  });

  it("throws on negative amount", () => {
    expect(() => incrementContributor("user", -1)).toThrow();
  });
});

describe("getTopContributors", () => {
  it("returns sorted list by points descending", () => {
    incrementContributor("alpha", 5);
    incrementContributor("beta", 3);
    incrementContributor("gamma", 8);
    const top = getTopContributors(3);
    expect(top).toHaveLength(3);
    expect(top[0].username).toBe("gamma");
    expect(top[0].points).toBe(8);
    expect(top[2].points).toBe(3);
  });

  it("returns empty array when leaderboard is empty", () => {
    writeFileSync(ORIGINAL_PATH, "{}", "utf-8");
    const top = getTopContributors(5);
    expect(top).toHaveLength(0);
  });
});
