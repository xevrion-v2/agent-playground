/**
 * Unit tests for the leaderboard update utility.
 *
 * Covers:
 * - Adding a new contributor
 * - Updating an existing contributor
 * - Batch adding multiple contributors
 * - Edge cases and validation
 * - Helper functions (top contributors, total contributions)
 */

import assert from "node:assert/strict";
import {
  addContribution,
  addContributions,
  getTopContributors,
  getTotalContributions,
  type Leaderboard
} from "./updateLeaderboard";

// Test 1: Add a new contributor to empty leaderboard
{
  const leaderboard: Leaderboard = {};
  const result = addContribution(leaderboard, "newuser");
  assert.equal(result.newuser, 1, "New contributor should have count 1");
  assert.equal(Object.keys(result).length, 1, "Should have 1 contributor");
}

// Test 2: Add a new contributor to non-empty leaderboard
{
  const leaderboard: Leaderboard = { existing: 5 };
  const result = addContribution(leaderboard, "newuser");
  assert.equal(result.newuser, 1, "New contributor should have count 1");
  assert.equal(result.existing, 5, "Existing contributor should be unchanged");
  assert.equal(Object.keys(result).length, 2, "Should have 2 contributors");
}

// Test 3: Increment an existing contributor
{
  const leaderboard: Leaderboard = { existing: 3 };
  const result = addContribution(leaderboard, "existing");
  assert.equal(result.existing, 4, "Existing contributor count should increment to 4");
}

// Test 4: Increment an existing contributor multiple times
{
  let leaderboard: Leaderboard = { user: 1 };
  leaderboard = addContribution(leaderboard, "user");
  leaderboard = addContribution(leaderboard, "user");
  leaderboard = addContribution(leaderboard, "user");
  assert.equal(leaderboard.user, 4, "Should increment to 4 after 3 additions");
}

// Test 5: Add contribution with custom increment
{
  const leaderboard: Leaderboard = { user: 2 };
  const result = addContribution(leaderboard, "user", 5);
  assert.equal(result.user, 7, "Should increment by 5 (2 + 5 = 7)");
}

// Test 6: New contributor with custom increment
{
  const leaderboard: Leaderboard = {};
  const result = addContribution(leaderboard, "newuser", 3);
  assert.equal(result.newuser, 3, "New contributor should start at 3");
}

// Test 7: Original leaderboard is not mutated
{
  const leaderboard: Leaderboard = { user: 1 };
  const originalSnapshot = JSON.stringify(leaderboard);
  addContribution(leaderboard, "user");
  addContribution(leaderboard, "newuser");
  assert.equal(
    JSON.stringify(leaderboard),
    originalSnapshot,
    "Original leaderboard should not be mutated"
  );
}

// Test 8: Batch add multiple new contributors
{
  const leaderboard: Leaderboard = {};
  const result = addContributions(leaderboard, ["alice", "bob", "charlie"]);
  assert.equal(result.alice, 1, "alice should have count 1");
  assert.equal(result.bob, 1, "bob should have count 1");
  assert.equal(result.charlie, 1, "charlie should have count 1");
  assert.equal(Object.keys(result).length, 3, "Should have 3 contributors");
}

// Test 9: Batch add mix of new and existing contributors
{
  const leaderboard: Leaderboard = { alice: 2, bob: 1 };
  const result = addContributions(leaderboard, ["alice", "charlie", "bob", "dave"]);
  assert.equal(result.alice, 3, "alice should increment to 3");
  assert.equal(result.bob, 2, "bob should increment to 2");
  assert.equal(result.charlie, 1, "charlie should be new with count 1");
  assert.equal(result.dave, 1, "dave should be new with count 1");
}

// Test 10: Batch add duplicate usernames in same call
{
  const leaderboard: Leaderboard = {};
  const result = addContributions(leaderboard, ["user", "user", "user"]);
  assert.equal(result.user, 3, "Duplicate username should increment 3 times");
}

// Test 11: Reject empty username
{
  const leaderboard: Leaderboard = {};
  assert.throws(
    () => addContribution(leaderboard, ""),
    /non-empty string/,
    "Empty username should throw"
  );
}

// Test 12: Reject negative increment
{
  const leaderboard: Leaderboard = { user: 1 };
  assert.throws(
    () => addContribution(leaderboard, "user", -1),
    /non-negative integer/,
    "Negative increment should throw"
  );
}

// Test 13: Reject non-integer increment
{
  const leaderboard: Leaderboard = { user: 1 };
  assert.throws(
    () => addContribution(leaderboard, "user", 1.5),
    /non-negative integer/,
    "Non-integer increment should throw"
  );
}

// Test 14: getTopContributors returns correct order
{
  const leaderboard: Leaderboard = {
    first: 10,
    second: 5,
    third: 8,
    fourth: 3
  };
  const top3 = getTopContributors(leaderboard, 3);
  assert.equal(top3.length, 3, "Should return 3 contributors");
  assert.equal(top3[0][0], "first", "Top should be 'first' with 10");
  assert.equal(top3[0][1], 10, "Top count should be 10");
  assert.equal(top3[1][0], "third", "Second should be 'third' with 8");
  assert.equal(top3[2][0], "second", "Third should be 'second' with 5");
}

// Test 15: getTotalContributions sums correctly
{
  const leaderboard: Leaderboard = {
    alice: 3,
    bob: 5,
    charlie: 2
  };
  assert.equal(getTotalContributions(leaderboard), 10, "Total should be 3 + 5 + 2 = 10");
}

// Test 16: Empty leaderboard total is 0
{
  const leaderboard: Leaderboard = {};
  assert.equal(getTotalContributions(leaderboard), 0, "Empty leaderboard total should be 0");
}

// Test 17: Zero increment does not change count
{
  const leaderboard: Leaderboard = { user: 5 };
  const result = addContribution(leaderboard, "user", 0);
  assert.equal(result.user, 5, "Zero increment should keep count at 5");
}

// Test 18: Username with special characters works
{
  const leaderboard: Leaderboard = {};
  const result = addContribution(leaderboard, "user-name_123");
  assert.equal(result["user-name_123"], 1, "Username with special chars should work");
}

console.log("All 18 leaderboard tests passed!");
