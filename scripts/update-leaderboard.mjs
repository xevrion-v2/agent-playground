export function applyLeaderboardUpdate(leaderboard, contributor) {
  const current = leaderboard[contributor] ?? 0;

  return {
    ...leaderboard,
    [contributor]: current + 1
  };
}
