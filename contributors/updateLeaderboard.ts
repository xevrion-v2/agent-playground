/**
 * updateLeaderboard.ts
 *
 * Utility functions for updating the contributors/leaderboard.json file.
 * A leaderboard is a plain object mapping GitHub usernames to contribution counts.
 */

export type Leaderboard = Record<string, number>;

/**
 * Increment a contributor's count by 1.
 * If the contributor doesn't exist yet, they are added with a count of 1.
 *
 * @param leaderboard - Current leaderboard state (mutated in place)
 * @param username    - GitHub username to increment
 * @returns The updated leaderboard
 */
export function addContribution(
  leaderboard: Leaderboard,
  username: string
): Leaderboard {
  if (!username || typeof username !== "string") {
    throw new Error("username must be a non-empty string");
  }
  leaderboard[username] = (leaderboard[username] ?? 0) + 1;
  return leaderboard;
}

/**
 * Return the top N contributors sorted by count descending.
 *
 * @param leaderboard - Current leaderboard state
 * @param n           - Number of top contributors to return (default: 10)
 * @returns Array of [username, count] pairs sorted descending
 */
export function getTopN(
  leaderboard: Leaderboard,
  n = 10
): Array<[string, number]> {
  return Object.entries(leaderboard)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n);
}

/**
 * Merge a second leaderboard into the first, summing counts.
 *
 * @param base  - Leaderboard to merge into (mutated in place)
 * @param patch - Leaderboard whose counts are added to base
 * @returns The merged leaderboard
 */
export function mergeLeaderboards(
  base: Leaderboard,
  patch: Leaderboard
): Leaderboard {
  for (const [username, count] of Object.entries(patch)) {
    base[username] = (base[username] ?? 0) + count;
  }
  return base;
}
