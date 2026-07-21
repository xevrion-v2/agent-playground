export function applyLeaderboardUpdate(leaderboard, contributor) {
  if (!contributor || typeof contributor !== "string") {
    throw new TypeError("contributor must be a non-empty string");
  }

  const name = contributor.trim();
  if (!name) {
    throw new TypeError("contributor must be a non-empty string");
  }

  const current = Number.isInteger(leaderboard[name]) ? leaderboard[name] : 0;
  return {
    ...leaderboard,
    [name]: current + 1,
  };
}
