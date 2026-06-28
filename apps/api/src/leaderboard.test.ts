import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { writeFileSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";
import {
  loadLeaderboard,
  saveLeaderboard,
  addContribution,
  removeContributor,
  getSortedLeaderboard,
  type Leaderboard,
} from "./leaderboard.js";

const TEST_FILE = resolve(__dirname, "../test-leaderboard.json");

afterEach(() => {
  if (existsSync(TEST_FILE)) unlinkSync(TEST_FILE);
});

// ── loadLeaderboard ──────────────────────────────────────────────────────────

describe("loadLeaderboard", () => {
  it("returns an empty object when the file does not exist", () => {
    expect(loadLeaderboard("/tmp/nonexistent-board.json")).toEqual({});
  });

  it("returns the parsed contents of an existing file", () => {
    writeFileSync(TEST_FILE, JSON.stringify({ alice: 5, bob: 3 }));
    expect(loadLeaderboard(TEST_FILE)).toEqual({ alice: 5, bob: 3 });
  });

  it("returns an empty object when the file contains invalid JSON", () => {
    writeFileSync(TEST_FILE, "not-json");
    expect(loadLeaderboard(TEST_FILE)).toEqual({});
  });
});

// ── saveLeaderboard ──────────────────────────────────────────────────────────

describe("saveLeaderboard", () => {
  it("writes the board to disk and round-trips through loadLeaderboard", () => {
    const board: Leaderboard = { carol: 10, dave: 7 };
    saveLeaderboard(TEST_FILE, board);
    expect(loadLeaderboard(TEST_FILE)).toEqual(board);
  });

  it("overwrites an existing file", () => {
    saveLeaderboard(TEST_FILE, { old: 1 });
    saveLeaderboard(TEST_FILE, { fresh: 42 });
    expect(loadLeaderboard(TEST_FILE)).toEqual({ fresh: 42 });
  });
});

// ── addContribution ──────────────────────────────────────────────────────────

describe("addContribution", () => {
  it("adds a new contributor with the given points", () => {
    const result = addContribution({}, "alice", 5);
    expect(result).toEqual({ alice: 5 });
  });

  it("increments an existing contributor's score", () => {
    const result = addContribution({ alice: 3 }, "alice", 2);
    expect(result).toEqual({ alice: 5 });
  });

  it("defaults to 1 point when points is omitted", () => {
    const result = addContribution({}, "bob");
    expect(result).toEqual({ bob: 1 });
  });

  it("does not mutate the input board", () => {
    const original: Leaderboard = { alice: 3 };
    addContribution(original, "alice", 2);
    expect(original).toEqual({ alice: 3 });
  });

  it("keeps other contributors unchanged", () => {
    const result = addContribution({ alice: 5, bob: 2 }, "carol", 4);
    expect(result).toEqual({ alice: 5, bob: 2, carol: 4 });
  });

  it("throws when contributor name is empty", () => {
    expect(() => addContribution({}, "", 1)).toThrow(
      "Contributor name must be a non-empty string"
    );
  });

  it("throws when points is negative", () => {
    expect(() => addContribution({}, "alice", -1)).toThrow(
      "Points must be a non-negative number"
    );
  });
});

// ── removeContributor ────────────────────────────────────────────────────────

describe("removeContributor", () => {
  it("removes an existing contributor", () => {
    const result = removeContributor({ alice: 5, bob: 3 }, "alice");
    expect(result).toEqual({ bob: 3 });
  });

  it("returns the same shape when contributor does not exist", () => {
    const result = removeContributor({ alice: 5 }, "unknown");
    expect(result).toEqual({ alice: 5 });
  });

  it("does not mutate the input board", () => {
    const original: Leaderboard = { alice: 5 };
    removeContributor(original, "alice");
    expect(original).toEqual({ alice: 5 });
  });
});

// ── getSortedLeaderboard ─────────────────────────────────────────────────────

describe("getSortedLeaderboard", () => {
  it("returns entries sorted by score descending", () => {
    const board: Leaderboard = { alice: 3, bob: 10, carol: 7 };
    const sorted = getSortedLeaderboard(board);
    expect(sorted).toEqual([
      { contributor: "bob", score: 10 },
      { contributor: "carol", score: 7 },
      { contributor: "alice", score: 3 },
    ]);
  });

  it("returns an empty array for an empty board", () => {
    expect(getSortedLeaderboard([] as unknown as Leaderboard)).toEqual([]);
  });

  it("handles a single contributor", () => {
    expect(getSortedLeaderboard({ alice: 1 })).toEqual([
      { contributor: "alice", score: 1 },
    ]);
  });
});

// ── integration: full update flow ────────────────────────────────────────────

describe("full leaderboard update flow", () => {
  it("loads, updates, saves, and re-loads correctly", () => {
    // Start empty
    saveLeaderboard(TEST_FILE, {});
    let board = loadLeaderboard(TEST_FILE);

    // Add contributions
    board = addContribution(board, "alice", 5);
    board = addContribution(board, "bob", 3);
    board = addContribution(board, "alice", 2);
    saveLeaderboard(TEST_FILE, board);

    // Reload and verify
    board = loadLeaderboard(TEST_FILE);
    expect(board).toEqual({ alice: 7, bob: 3 });

    // Remove and re-add
    board = removeContributor(board, "bob");
    board = addContribution(board, "carol", 10);
    saveLeaderboard(TEST_FILE, board);

    // Final state
    const final = loadLeaderboard(TEST_FILE);
    expect(final).toEqual({ alice: 7, carol: 10 });

    // Sorted order
    expect(getSortedLeaderboard(final)).toEqual([
      { contributor: "carol", score: 10 },
      { contributor: "alice", score: 7 },
    ]);
  });
});
