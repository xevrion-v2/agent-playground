/**
 * Pure helper for the leaderboard increment used by
 * `.github/workflows/auto-process.yml`:
 *   .[$user] = ((.[$user] // 0) + 1)
 *
 * @param {Record<string, number>} leaderboard
 * @param {string} username
 * @returns {Record<string, number>}
 */
export function applyLeaderboardUpdate(leaderboard, username) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new TypeError("username must be a non-empty string");
  }

  const name = username.trim();
  const current = Number.isFinite(leaderboard[name]) ? leaderboard[name] : 0;

  return {
    ...leaderboard,
    [name]: current + 1,
  };
}
