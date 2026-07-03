import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import { writeFileSync, unlinkSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  updateLeaderboard,
  loadLeaderboard,
  saveLeaderboard,
  runSync,
} from "../scripts/leaderboard-sync.js";

const FIXTURES = join(tmpdir(), "lb-test-fixtures");

function fixturePath(name: string): string {
  if (!existsSync(FIXTURES)) mkdirSync(FIXTURES, { recursive: true });
  return join(FIXTURES, name);
}

function cleanup(...files: string[]): void {
  for (const f of files) {
    try { unlinkSync(f); } catch { /* ok */ }
  }
}

function makeAgents(...usernames: string[]): any {
  return {
    agents: usernames.map((u, i) => ({
      github_username: u,
      model: "test-model",
      pr_number: i + 1,
      issue_number: i + 1,
    })),
    last_updated: "",
    total_contributions: 0,
  };
}

// ── updateLeaderboard ──────────────────────────────────────

describe("updateLeaderboard", () => {
  it("adds new contributors to empty leaderboard", () => {
    const result = updateLeaderboard({}, makeAgents("alice", "bob"));
    assert.deepEqual(result, { alice: 1, bob: 1 } as any);
  });

  it("increments count for existing contributors", () => {
    const lb: any = { alice: 3, bob: 1 };
    const result = updateLeaderboard(lb, makeAgents("alice"));
    assert.equal(result.alice, 4);
    assert.equal(result.bob, 1);
  });

  it("handles mix of new and existing", () => {
    const lb: any = { alice: 2 };
    const result = updateLeaderboard(lb, makeAgents("alice", "bob", "carol"));
    assert.equal(result.alice, 3);
    assert.equal(result.bob, 1);
    assert.equal(result.carol, 1);
  });

  it("does not mutate original leaderboard", () => {
    const original: any = { alice: 5 };
    const result = updateLeaderboard(original, makeAgents("bob"));
    assert.equal(original.bob, undefined);
    assert.equal(result.bob, 1);
  });

  it("handles empty agents list", () => {
    const lb: any = { alice: 1 };
    const result = updateLeaderboard(lb, { agents: [], last_updated: "", total_contributions: 0 });
    assert.deepEqual(result, lb);
  });
});

// ── file I/O ────────────────────────────────────────────────

describe("loadLeaderboard", () => {
  it("returns empty object when file missing", () => {
    assert.deepEqual(loadLeaderboard("/tmp/does-not-exist-abc123.json"), {});
  });

  it("reads and parses valid file", () => {
    const p = fixturePath("test-lb.json");
    writeFileSync(p, JSON.stringify({ alice: 2, bob: 3 }));
    try {
      assert.deepEqual(loadLeaderboard(p), { alice: 2, bob: 3 } as any);
    } finally { cleanup(p); }
  });
});

describe("saveLeaderboard roundtrip", () => {
  it("writes then reads back correctly", () => {
    const p = fixturePath("rt.json");
    const data: any = { alice: 10, bob: 20 };
    saveLeaderboard(data, p);
    try {
      assert.deepEqual(loadLeaderboard(p), data);
    } finally { cleanup(p); }
  });
});

// ── runSync integration ────────────────────────────────────

describe("runSync", () => {
  it("builds leaderboard from scratch", () => {
    const lb = fixturePath("new-lb.json");
    const ag = fixturePath("ag1.json");
    writeFileSync(lb, JSON.stringify({}));
    writeFileSync(ag, JSON.stringify(makeAgents("alice", "alice")));
    try {
      const r = runSync({ leaderboardPath: lb, agentsPath: ag });
      assert.equal(r.added, 1);
      assert.equal((loadLeaderboard(lb) as any).alice, 2);
    } finally { cleanup(lb, ag); }
  });

  it("updates existing leaderboard with new and existing users", () => {
    const lb = fixturePath("ex-lb.json");
    const ag = fixturePath("ag2.json");
    writeFileSync(lb, JSON.stringify({ alice: 5, bob: 2 }));
    writeFileSync(ag, JSON.stringify(makeAgents("alice", "carol")));
    try {
      const r = runSync({ leaderboardPath: lb, agentsPath: ag });
      assert.equal(r.added, 1);
      assert.equal(r.updated, 1);
      const loaded: any = loadLeaderboard(lb);
      assert.equal(loaded.alice, 6);
      assert.equal(loaded.bob, 2);
      assert.equal(loaded.carol, 1);
    } finally { cleanup(lb, ag); }
  });
});
