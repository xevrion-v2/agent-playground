import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test, describe } from "node:test";

import {
  incrementLeaderboard,
  updateLeaderboardFile,
} from "./update-leaderboard.mjs";

describe("incrementLeaderboard", () => {
  test("adds a new contributor with count 1", () => {
    const result = incrementLeaderboard({}, "new-contributor");
    assert.deepEqual(result, { "new-contributor": 1 });
  });

  test("does not mutate the original leaderboard (immutability)", () => {
    const original = { alice: 2 };
    const result = incrementLeaderboard(original, "alice");
    assert.deepEqual(original, { alice: 2 }); // unchanged
    assert.deepEqual(result, { alice: 3 });
  });

  test("increments an existing contributor by 1", () => {
    const leaderboard = { alice: 2, bob: 1 };
    const result = incrementLeaderboard(leaderboard, "alice");
    assert.deepEqual(result, { alice: 3, bob: 1 });
  });

  test("increments a contributor with zero count", () => {
    const leaderboard = { alice: 0 };
    const result = incrementLeaderboard(leaderboard, "alice");
    assert.deepEqual(result, { alice: 1 });
  });

  test("treats missing contributor as 0 and creates entry", () => {
    const leaderboard = { bob: 5 };
    const result = incrementLeaderboard(leaderboard, "carol");
    assert.deepEqual(result, { bob: 5, carol: 1 });
  });

  test("preserves other entries when incrementing", () => {
    const leaderboard = { alice: 1, bob: 2, charlie: 3 };
    const result = incrementLeaderboard(leaderboard, "bob");
    assert.deepEqual(result, { alice: 1, bob: 3, charlie: 3 });
  });

  test("throws for empty string contributor", () => {
    assert.throws(
      () => incrementLeaderboard({}, ""),
      /Contributor must be a non-empty string/,
    );
  });

  test("throws for non-string contributor", () => {
    assert.throws(
      () => incrementLeaderboard({}, 123),
      /Contributor must be a non-empty string/,
    );
  });

  test("throws for null contributor", () => {
    assert.throws(
      () => incrementLeaderboard({}, null),
      /Contributor must be a non-empty string/,
    );
  });
});

describe("updateLeaderboardFile", () => {
  test("creates a new leaderboard file with the contributor", async () => {
    const directory = await mkdtemp(join(tmpdir(), "leaderboard-"));
    const filePath = join(directory, "leaderboard.json");

    updateLeaderboardFile(filePath, "alice");

    const content = await readFile(filePath, "utf8");
    assert.equal(content, JSON.stringify({ alice: 1 }, null, 2) + "\n");
  });

  test("updates an existing leaderboard file", async () => {
    const directory = await mkdtemp(join(tmpdir(), "leaderboard-"));
    const filePath = join(directory, "leaderboard.json");

    // Write initial data
    const initial = { alice: 2, bob: 1 };
    await import("node:fs/promises").then((fs) =>
      fs.writeFile(filePath, JSON.stringify(initial, null, 2) + "\n"),
    );

    // Update
    updateLeaderboardFile(filePath, "alice");

    const content = await readFile(filePath, "utf8");
    assert.equal(content, JSON.stringify({ alice: 3, bob: 1 }, null, 2) + "\n");
  });
});
