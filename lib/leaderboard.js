/**
 * Immutable leaderboard contributor update helper.
 *
 * @param {Record<string, number>} leaderboard - current leaderboard state
 * @param {string} contributor - contributor name (will be trimmed)
 * @param {number} [incrementBy=1] - amount to add
 * @returns {Record<string, number>} new leaderboard with the contributor updated
 */
export function applyLeaderboardUpdate(leaderboard, contributor, incrementBy = 1) {
  const name = contributor.trim();
  if (!name) {
    throw new Error('Contributor name must not be empty');
  }
  return { ...leaderboard, [name]: (leaderboard[name] || 0) + incrementBy };
}
