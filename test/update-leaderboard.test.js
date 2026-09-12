const assert = require("node:assert/strict");
const test = require("node:test");

const {
  updateLeaderboard
} = require("../scripts/update-leaderboard.js");

test("adds a new contributor with one pull request", () => {
  const original = { existingContributor: 3 };

  const updated = updateLeaderboard(original, "newContributor");

  assert.deepEqual(updated, {
    existingContributor: 3,
    newContributor: 1
  });
  assert.deepEqual(original, { existingContributor: 3 });
});

test("increments the count for an existing contributor", () => {
  const original = {
    existingContributor: 3,
    anotherContributor: 1
  };

  const updated = updateLeaderboard(original, "existingContributor");

  assert.deepEqual(updated, {
    existingContributor: 4,
    anotherContributor: 1
  });
  assert.deepEqual(original, {
    existingContributor: 3,
    anotherContributor: 1
  });
});
