import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { incrementLeaderboard, updateLeaderboardFile } from "./update-leaderboard.mjs";

test("increments an existing contributor", () => {
  assert.deepEqual(incrementLeaderboard({ alice: 2 }, "alice"), { alice: 3 });
});

test("adds a new contributor with one contribution", () => {
  assert.deepEqual(incrementLeaderboard({ alice: 2 }, "bob"), { alice: 2, bob: 1 });
});

test("updates a leaderboard file in place", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "leaderboard-"));
  const filePath = path.join(directory, "leaderboard.json");

  fs.writeFileSync(filePath, `${JSON.stringify({ alice: 1 }, null, 2)}\n`);

  const updated = updateLeaderboardFile(filePath, "bob");

  assert.deepEqual(updated, { alice: 1, bob: 1 });
  assert.deepEqual(JSON.parse(fs.readFileSync(filePath, "utf8")), updated);
});
