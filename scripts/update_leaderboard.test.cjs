const { describe, it, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const os = require("os");

const {
  readLeaderboard,
  incrementContributor,
  writeLeaderboard,
  updateLeaderboard,
} = require("./update_leaderboard.cjs");

// Helper: create a temporary leaderboard file for isolation
function tmpFile(data) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "lb-test-"));
  const file = path.join(dir, "leaderboard.json");
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  return { dir, file };
}

function cleanup(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

// ── readLeaderboard ──────────────────────────────────────────────────

describe("readLeaderboard", () => {
  it("reads and parses an existing leaderboard file", () => {
    const { dir, file } = tmpFile({ alice: 5, bob: 3 });
    try {
      const board = readLeaderboard(file);
      assert.deepStrictEqual(board, { alice: 5, bob: 3 });
    } finally {
      cleanup(dir);
    }
  });

  it("returns empty object for empty leaderboard", () => {
    const { dir, file } = tmpFile({});
    try {
      const board = readLeaderboard(file);
      assert.deepStrictEqual(board, {});
    } finally {
      cleanup(dir);
    }
  });
});

// ── incrementContributor ─────────────────────────────────────────────

describe("incrementContributor", () => {
  it("creates a new entry for a contributor not yet on the board", () => {
    const board = { alice: 5 };
    incrementContributor(board, "newuser");
    assert.strictEqual(board["newuser"], 1);
    assert.strictEqual(board["alice"], 5); // unchanged
  });

  it("increments an existing contributor by 1 (default)", () => {
    const board = { alice: 5 };
    incrementContributor(board, "alice");
    assert.strictEqual(board["alice"], 6);
  });

  it("increments by a custom amount", () => {
    const board = { bob: 2 };
    incrementContributor(board, "bob", 4);
    assert.strictEqual(board["bob"], 6);
  });

  it("throws on empty username", () => {
    assert.throws(() => incrementContributor({}, ""), /non-empty string/);
  });

  it("throws on zero increment", () => {
    assert.throws(() => incrementContributor({}, "x", 0), /positive number/);
  });

  it("throws on negative increment", () => {
    assert.throws(() => incrementContributor({}, "x", -1), /positive number/);
  });
});

// ── writeLeaderboard ─────────────────────────────────────────────────

describe("writeLeaderboard", () => {
  it("writes the board to disk and it can be read back", () => {
    const { dir, file } = tmpFile({});
    try {
      writeLeaderboard({ foo: 10 }, file);
      const roundtrip = readLeaderboard(file);
      assert.deepStrictEqual(roundtrip, { foo: 10 });
    } finally {
      cleanup(dir);
    }
  });
});

// ── updateLeaderboard (integration) ──────────────────────────────────

describe("updateLeaderboard", () => {
  it("handles a new contributor end-to-end", () => {
    const { dir, file } = tmpFile({ existing: 3 });
    try {
      const result = updateLeaderboard("brandnew", 1, file);
      assert.strictEqual(result["brandnew"], 1);
      assert.strictEqual(result["existing"], 3);
      // verify file on disk
      const fromDisk = readLeaderboard(file);
      assert.deepStrictEqual(fromDisk, result);
    } finally {
      cleanup(dir);
    }
  });

  it("handles an existing contributor end-to-end", () => {
    const { dir, file } = tmpFile({ existing: 3 });
    try {
      updateLeaderboard("existing", 2, file);
      const fromDisk = readLeaderboard(file);
      assert.strictEqual(fromDisk["existing"], 5);
    } finally {
      cleanup(dir);
    }
  });

  it("does not corrupt other entries", () => {
    const { dir, file } = tmpFile({ a: 1, b: 2, c: 3 });
    try {
      updateLeaderboard("b", 10, file);
      const board = readLeaderboard(file);
      assert.strictEqual(board["a"], 1);
      assert.strictEqual(board["b"], 12);
      assert.strictEqual(board["c"], 3);
    } finally {
      cleanup(dir);
    }
  });
});
