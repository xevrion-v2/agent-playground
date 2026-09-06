import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Unit tests for leaderboard update logic (no DB required).
// The leaderboard is a JSON map of handle -> score. We test the pure
// functions that add/update a contributor's score.

type Leaderboard = Record<string, number>;

function upsertScore(lb: Leaderboard, handle: string, delta: number): Leaderboard {
  const next = { ...lb };
  next[handle] = (next[handle] ?? 0) + delta;
  if (next[handle] <= 0) delete next[handle];
  return next;
}

function topContributors(lb: Leaderboard, n = 3): [string, number][] {
  return Object.entries(lb)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

const sample: Leaderboard = { alice: 5, bob: 3, carol: 10 };

test("adds a new contributor", () => {
  const r = upsertScore(sample, "dave", 2);
  assert.equal(r.dave, 2);
});

test("increments an existing contributor", () => {
  const r = upsertScore(sample, "alice", 1);
  assert.equal(r.alice, 6);
});

test("removes contributor when score drops to zero or below", () => {
  const r = upsertScore({ alice: 1 }, "alice", -1);
  assert.equal("alice" in r, false);
});

test("returns top contributors sorted descending", () => {
  const top = topContributors(sample, 2);
  assert.deepEqual(top, [["carol", 10], ["alice", 5]]);
});

test("leaderboard.json on disk is valid JSON with numeric scores", () => {
  const p = path.join(process.cwd(), "leaderboard.json");
  if (fs.existsSync(p)) {
    const lb = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const [h, s] of Object.entries(lb)) {
      assert.equal(typeof h, "string");
      assert.equal(typeof s, "number");
    }
  }
});
