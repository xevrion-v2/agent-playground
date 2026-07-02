/**
 * updateLeaderboard.test.ts
 *
 * Unit tests for contributors/updateLeaderboard.ts
 * Uses Node.js built-in test runner (node:test) — no extra deps required.
 *
 * Run: node --loader tsx --test contributors/updateLeaderboard.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  addContribution,
  getTopN,
  mergeLeaderboards,
  type Leaderboard,
} from "./updateLeaderboard.js";

// ---------------------------------------------------------------------------
// addContribution
// ---------------------------------------------------------------------------
describe("addContribution", () => {
  it("adds a new contributor with count 1", () => {
    const lb: Leaderboard = {};
    addContribution(lb, "alice");
    assert.equal(lb["alice"], 1);
  });

  it("increments an existing contributor by 1", () => {
    const lb: Leaderboard = { alice: 5 };
    addContribution(lb, "alice");
    assert.equal(lb["alice"], 6);
  });

  it("does not affect other contributors", () => {
    const lb: Leaderboard = { alice: 3, bob: 7 };
    addContribution(lb, "alice");
    assert.equal(lb["bob"], 7);
  });

  it("mutates the leaderboard in place and returns it", () => {
    const lb: Leaderboard = {};
    const result = addContribution(lb, "carol");
    assert.strictEqual(result, lb);
  });

  it("throws when username is empty", () => {
    assert.throws(() => addContribution({}, ""), /non-empty string/);
  });

  it("throws when username is not a string", () => {
    // @ts-expect-error intentional bad input
    assert.throws(() => addContribution({}, 42), /non-empty string/);
  });
});

// ---------------------------------------------------------------------------
// getTopN
// ---------------------------------------------------------------------------
describe("getTopN", () => {
  it("returns entries sorted descending by count", () => {
    const lb: Leaderboard = { alice: 3, bob: 10, carol: 1 };
    const top = getTopN(lb, 3);
    assert.deepEqual(top, [["bob", 10], ["alice", 3], ["carol", 1]]);
  });

  it("limits the result to n entries", () => {
    const lb: Leaderboard = { a: 5, b: 4, c: 3, d: 2, e: 1 };
    assert.equal(getTopN(lb, 2).length, 2);
  });

  it("returns all entries when n >= length", () => {
    const lb: Leaderboard = { x: 1, y: 2 };
    assert.equal(getTopN(lb, 100).length, 2);
  });

  it("returns empty array for empty leaderboard", () => {
    assert.deepEqual(getTopN({}), []);
  });

  it("defaults to top 10 when n is not provided", () => {
    const lb: Leaderboard = {};
    for (let i = 0; i < 15; i++) lb[`user${i}`] = i;
    assert.equal(getTopN(lb).length, 10);
  });
});

// ---------------------------------------------------------------------------
// mergeLeaderboards
// ---------------------------------------------------------------------------
describe("mergeLeaderboards", () => {
  it("adds patch counts to base for existing users", () => {
    const base: Leaderboard = { alice: 5, bob: 3 };
    const patch: Leaderboard = { alice: 2 };
    mergeLeaderboards(base, patch);
    assert.equal(base["alice"], 7);
    assert.equal(base["bob"], 3);
  });

  it("introduces new users from patch into base", () => {
    const base: Leaderboard = { alice: 5 };
    const patch: Leaderboard = { carol: 4 };
    mergeLeaderboards(base, patch);
    assert.equal(base["carol"], 4);
  });

  it("handles empty patch without error", () => {
    const base: Leaderboard = { alice: 5 };
    mergeLeaderboards(base, {});
    assert.equal(base["alice"], 5);
  });

  it("handles empty base with patch entries", () => {
    const base: Leaderboard = {};
    mergeLeaderboards(base, { bob: 9 });
    assert.equal(base["bob"], 9);
  });

  it("mutates base and returns it", () => {
    const base: Leaderboard = {};
    const result = mergeLeaderboards(base, { dave: 1 });
    assert.strictEqual(result, base);
  });
});
