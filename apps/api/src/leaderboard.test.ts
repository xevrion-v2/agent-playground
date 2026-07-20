/**
 * Leaderboard Utilities Tests
 * Tests for leaderboard update and query operations
 */

interface LeaderboardEntry {
  username: string;
  count: number;
}

/**
 * Updates a leaderboard by incrementing a user's count
 */
export function updateLeaderboard(
  leaderboard: Record<string, number>,
  username: string
): Record<string, number> {
  const newLeaderboard = { ...leaderboard };
  newLeaderboard[username] = (newLeaderboard[username] || 0) + 1;
  return newLeaderboard;
}

/**
 * Gets the top N contributors from the leaderboard
 */
export function getTopContributors(
  leaderboard: Record<string, number>,
  count: number
): LeaderboardEntry[] {
  return Object.entries(leaderboard)
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, count);
}

/**
 * Gets a user's rank in the leaderboard
 */
export function getUserRank(
  leaderboard: Record<string, number>,
  username: string
): number | null {
  const sorted = getTopContributors(leaderboard, Object.keys(leaderboard).length);
  const index = sorted.findIndex((entry) => entry.username === username);
  return index === -1 ? null : index + 1;
}

/**
 * Checks if a user is a new contributor
 */
export function isNewContributor(
  leaderboard: Record<string, number>,
  username: string
): boolean {
  return !leaderboard.hasOwnProperty(username);
}

// Test assertions
function assertEquals<T>(actual: T, expected: T, testName: string): void {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${passed ? "PASS" : "FAIL"}: ${testName}`);
  if (!passed) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Actual: ${JSON.stringify(actual)}`);
  }
}

// Run tests
console.log("Running Leaderboard Utility Tests...\n");

// Test 1: New contributor check on empty leaderboard
assertEquals(isNewContributor({}, "alice"), true, "New contributor check on empty leaderboard");

// Test 2: Existing contributor check
assertEquals(isNewContributor({ bob: 5, charlie: 3 }, "bob"), false, "Existing contributor check");

// Test 3: Update leaderboard for new user
assertEquals(updateLeaderboard({}, "dave"), { dave: 1 }, "Update leaderboard for new user");

// Test 4: Update leaderboard for existing user
assertEquals(updateLeaderboard({ alice: 3 }, "alice"), { alice: 4 }, "Update leaderboard for existing user");

// Test 5: Get top contributors
const top3 = getTopContributors({ alice: 10, bob: 5, charlie: 15, dave: 3 }, 3);
assertEquals(top3[0]?.username, "charlie", "Top contributor is charlie");
assertEquals(top3[1]?.username, "alice", "Second contributor is alice");
assertEquals(top3[2]?.username, "bob", "Third contributor is bob");

// Test 6: Get user rank
assertEquals(getUserRank({ alice: 10, bob: 5, charlie: 15 }, "charlie"), 1, "Charlie is rank 1");
assertEquals(getUserRank({ alice: 10, bob: 5, charlie: 15 }, "alice"), 2, "Alice is rank 2");
assertEquals(getUserRank({ alice: 10, bob: 5, charlie: 15 }, "unknown"), null, "Unknown user has no rank");

console.log("\nTests completed!");
