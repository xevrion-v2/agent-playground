import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import {
  incrementLeaderboard,
  updateLeaderboardFile,
} from "./update-leaderboard.mjs";

test("adds a new contributor to the leaderboard", () => {
  assert.deepEqual(incrementLeaderboard({}, "alice"), { alice: 1 });
});

test("increments an existing contributor without changing others", () => {
  assert.deepEqual(incrementLeaderboard({ alice: 2, bob: 1 }, "alice"), {
    alice: 3,
    bob: 1,
  });
});

test("creates a missing leaderboard file when updating", async () => {
  const directory = await mkdtemp(join(tmpdir(), "leaderboard-"));
  const leaderboardPath = join(directory, "leaderboard.json");

  updateLeaderboardFile(leaderboardPath, "carol");

  assert.equal(
    await readFile(leaderboardPath, "utf8"),
    `${JSON.stringify({ carol: 1 }, null, 2)}\n`,
  );
});
