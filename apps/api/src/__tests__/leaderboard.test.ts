import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "fs";
import { join } from "path";

const TEST_LB = join(import.meta.dirname, "../../leaderboard.test.json");
const REAL_LB = join(import.meta.dirname, "../../leaderboard.json");

describe("Leaderboard updates", () => {
  beforeEach(() => {
    if (existsSync(TEST_LB)) unlinkSync(TEST_LB);
    writeFileSync(TEST_LB, JSON.stringify({
      contributors: [
        { name: "alice", points: 100 },
        { name: "bob", points: 50 }
      ],
      lastUpdated: "2026-01-01T00:00:00.000Z"
    }));
  });

  it("reads existing leaderboard", () => {
    const lb = JSON.parse(readFileSync(REAL_LB, "utf-8"));
    assert.ok(lb.contributors || Array.isArray(lb));
  });

  it("adds new contributor", () => {
    const lb = JSON.parse(readFileSync(TEST_LB, "utf-8"));
    lb.contributors.push({ name: "charlie", points: 25 });
    lb.lastUpdated = new Date().toISOString();
    writeFileSync(TEST_LB, JSON.stringify(lb, null, 2));
    const updated = JSON.parse(readFileSync(TEST_LB, "utf-8"));
    assert.equal(updated.contributors.length, 3);
  });

  it("updates existing contributor points", () => {
    const lb = JSON.parse(readFileSync(TEST_LB, "utf-8"));
    const bob = lb.contributors.find(c => c.name === "bob");
    bob.points += 10;
    writeFileSync(TEST_LB, JSON.stringify(lb, null, 2));
    const updated = JSON.parse(readFileSync(TEST_LB, "utf-8"));
    const updatedBob = updated.contributors.find(c => c.name === "bob");
    assert.equal(updatedBob.points, 60);
  });

  it("handles empty leaderboard", () => {
    writeFileSync(TEST_LB, JSON.stringify({
      contributors: [],
      lastUpdated: new Date().toISOString()
    }));
    const lb = JSON.parse(readFileSync(TEST_LB, "utf-8"));
    assert.equal(lb.contributors.length, 0);
  });

  it("preserves ordering by points", () => {
    const lb = JSON.parse(readFileSync(TEST_LB, "utf-8"));
    const sorted = [...lb.contributors].sort((a, b) => b.points - a.points);
    assert.equal(sorted[0].name, "alice");
    assert.equal(sorted[1].name, "bob");
  });
});
