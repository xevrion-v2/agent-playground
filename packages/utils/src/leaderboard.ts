export interface Leaderboard {
  [username: string]: number;
}

export function incrementContributor(
  board: Leaderboard,
  username: string,
): Leaderboard {
  return {
    ...board,
    [username]: (board[username] ?? 0) + 1,
  };
}

export function mergeLeaderboards(
  ...boards: Leaderboard[]
): Leaderboard {
  const result: Leaderboard = {};
  for (const board of boards) {
    for (const [user, count] of Object.entries(board)) {
      result[user] = (result[user] ?? 0) + count;
    }
  }
  return result;
}

export function topContributors(
  board: Leaderboard,
  n: number = 10,
): Array<{ username: string; count: number }> {
  return Object.entries(board)
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

export function totalPRs(board: Leaderboard): number {
  return Object.values(board).reduce((sum, count) => sum + count, 0);
}
