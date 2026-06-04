const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const {
  incrementLeaderboard,
  updateLeaderboardFile,
} = require("./update_leaderboard.cjs");

test("adds a new contributor with an initial count", () => {
  assert.deepEqual(incrementLeaderboard({}, "new-agent"), {
    "new-agent": 1,
  });
});

test("increments an existing contributor without changing other counts", () => {
  assert.deepEqual(
    incrementLeaderboard({ "new-agent": 1, "existing-agent": 4 }, "existing-agent"),
    { "new-agent": 1, "existing-agent": 5 },
  );
});

test("updates a leaderboard file on disk", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "leaderboard-"));
  const file = path.join(dir, "leaderboard.json");
  fs.writeFileSync(file, JSON.stringify({ "existing-agent": 2 }));

  const updated = updateLeaderboardFile(file, "new-agent");

  assert.equal(updated["existing-agent"], 2);
  assert.equal(updated["new-agent"], 1);
  assert.deepEqual(JSON.parse(fs.readFileSync(file, "utf8")), updated);
});
