/**
 * Leaderboard update logic — mirrors the auto-process.yml workflow.
 */

export type Leaderboard = Record<string, number>;

/**
 * Increments a contributor's PR count in the leaderboard.
 * If the contributor does not exist, initializes with count 1.
 *
 * @param leaderboard - Current leaderboard state
 * @param user - GitHub username to increment
 * @returns New leaderboard state (shallow copy)
 */
export function incrementContributor(
  leaderboard: Leaderboard,
  user: string
): Leaderboard {
  return {
    ...leaderboard,
    [user]: (leaderboard[user] || 0) + 1,
  };
}

/**
 * Checks whether a PR has already been counted by searching
 * for a matching commit message.
 *
 * @param commitMessages - Array of recent commit messages
 * @param prNumber - PR number to check
 * @returns true if the PR has already been counted
 */
export function isPrAlreadyCounted(
  commitMessages: string[],
  prNumber: number
): boolean {
  const pattern = `chore: update leaderboard for PR #${prNumber}`;
  return commitMessages.some((msg) => msg.includes(pattern));
}

/**
 * Serializes a leaderboard object to a formatted JSON string.
 *
 * @param leaderboard - Leaderboard state
 * @returns Pretty-printed JSON string with trailing newline
 */
export function serializeLeaderboard(leaderboard: Leaderboard): string {
  const sorted = Object.keys(leaderboard)
    .sort()
    .reduce<Leaderboard>((acc, key) => {
      acc[key] = leaderboard[key];
      return acc;
    }, {});

  return JSON.stringify(sorted, null, 2) + "\n";
}
