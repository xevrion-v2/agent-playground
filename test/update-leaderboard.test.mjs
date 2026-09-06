import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  loadLeaderboard,
  saveLeaderboard,
  updateLeaderboardEntry
} from "../scripts/update-leaderboard.mjs";

test("updateLeaderboardEntry adds a new contributor with a count of one", () => {
  const updated = updateLeaderboardEntry({ awyoo: 6 }, "new-contributor");

  assert.deepEqual(updated, {
    awyoo: 6,
    "new-contributor": 1
  });
});

test("updateLeaderboardEntry increments an existing contributor count", () => {
  const updated = updateLeaderboardEntry({ awyoo: 6, helper: 2 }, "awyoo");

  assert.deepEqual(updated, {
    awyoo: 7,
    helper: 2
  });
});

test("saveLeaderboard persists the updated JSON payload", async () => {
  const tempDir = await mkdtemp(path.join(tmpdir(), "leaderboard-test-"));
  const leaderboardPath = path.join(tempDir, "leaderboard.json");
  const updated = updateLeaderboardEntry({}, "awyoo");

  await saveLeaderboard(leaderboardPath, updated);

  const reloaded = await loadLeaderboard(leaderboardPath);
  const contents = await readFile(leaderboardPath, "utf8");

  assert.deepEqual(reloaded, { awyoo: 1 });
  assert.match(contents, /"awyoo": 1/);
});
