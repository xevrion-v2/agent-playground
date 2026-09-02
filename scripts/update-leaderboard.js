/**
 * Leaderboard update helper.
 * Increments the PR count for a given GitHub username in a leaderboard object.
 *
 * @param {Record<string, number>} leaderboard - Current leaderboard state
 * @param {string} username - GitHub username to increment
 * @returns {Record<string, number>} Updated leaderboard (new object, does not mutate input)
 */
export function incrementUser(leaderboard, username) {
  const current = leaderboard[username] ?? 0;
  return { ...leaderboard, [username]: current + 1 };
}

/**
 * Merges a partial leaderboard update into the existing leaderboard.
 *
 * @param {Record<string, number>} existing - Current leaderboard
 * @param {Record<string, number>} updates - Partial updates to apply
 * @returns {Record<string, number>} Merged leaderboard
 */
export function mergeLeaderboard(existing, updates) {
  const result = { ...existing };
  for (const [user, count] of Object.entries(updates)) {
    result[user] = (result[user] ?? 0) + count;
  }
  return result;
}
