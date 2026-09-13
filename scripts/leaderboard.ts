export interface Leaderboard {
  [username: string]: number;
}

export interface CountedPrs {
  [prId: string]: boolean;
}

export function incrementContributor(
  leaderboard: Leaderboard,
  username: string
): Leaderboard {
  return {
    ...leaderboard,
    [username]: (leaderboard[username] ?? 0) + 1,
  };
}

export function isPrAlreadyCounted(
  countedPrs: string[],
  prId: string
): boolean {
  return countedPrs.includes(prId);
}

export function serializeLeaderboard(
  leaderboard: Leaderboard
): string {
  const sorted: Leaderboard = {};
  for (const key of Object.keys(leaderboard).sort()) {
    sorted[key] = leaderboard[key];
  }
  return JSON.stringify(sorted);
}
