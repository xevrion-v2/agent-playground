import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { readLeaderboard, updateLeaderboard, getTopContributors, userExists, getUserContributions } from "../leaderboard";

const TEST_LB = { "user1": 5, "user2": 3, "user3": 10 };
const LB_PATH = path.resolve(__dirname, "../../leaderboard.json");

describe("Leaderboard", () => {
  let orig: string;
  beforeEach(() => { orig = fs.readFileSync(LB_PATH, "utf-8"); fs.writeFileSync(LB_PATH, JSON.stringify(TEST_LB)); });
  afterEach(() => { fs.writeFileSync(LB_PATH, orig); });

  it("reads leaderboard", () => { expect(readLeaderboard()).toEqual(TEST_LB); });
  it("updates existing user", () => { expect(updateLeaderboard("user1", 3)["user1"]).toBe(8); });
  it("adds new user", () => { expect(updateLeaderboard("newuser", 5)["newuser"]).toBe(5); });
  it("defaults to 1 contribution", () => { expect(updateLeaderboard("x")["x"]).toBe(1); });
  it("persists to disk", () => { updateLeaderboard("user1", 5); expect(JSON.parse(fs.readFileSync(LB_PATH, "utf-8"))["user1"]).toBe(10); });
  it("gets top contributors sorted", () => { const top = getTopContributors(2); expect(top[0][0]).toBe("user3"); expect(top[1][0]).toBe("user1"); });
  it("returns empty for empty leaderboard", () => { fs.writeFileSync(LB_PATH, "{}"); expect(getTopContributors(10)).toEqual([]); });
  it("userExists returns correct values", () => { expect(userExists("user1")).toBe(true); expect(userExists("nope")).toBe(false); });
  it("getUserContributions returns correct count", () => { expect(getUserContributions("user1")).toBe(5); expect(getUserContributions("nope")).toBe(0); });
  it("handles special characters in username", () => { expect(updateLeaderboard("user_special-1")["user_special-1"]).toBe(1); });
});
