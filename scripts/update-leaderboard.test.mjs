import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";

import { incrementLeaderboard, updateLeaderboardFile } from "./update-leaderboard.mjs";

describe("incrementLeaderboard", () => {
  it("adds a new contributor with a count of one", () => {
    assert.deepEqual(incrementLeaderboard({}, "new-user"), {
      "new-user": 1
    });
  });

  it("increments an existing contributor", () => {
    assert.deepEqual(incrementLeaderboard({ existing: 2 }, "existing"), {
      existing: 3
    });
  });
});

describe("updateLeaderboardFile", () => {
  it("creates a missing leaderboard file", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "leaderboard-"));
    const filePath = path.join(tempDir, "leaderboard.json");

    updateLeaderboardFile(filePath, "first");

    assert.deepEqual(JSON.parse(fs.readFileSync(filePath, "utf8")), {
      first: 1
    });
  });
});
