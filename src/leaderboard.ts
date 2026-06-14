/**
 * Leaderboard update utility for the TaskFlow bug bounty program.
 *
 * The leaderboard tracks the number of accepted contributions
 * per contributor as a simple { username: count } JSON object.
 */

export interface Leaderboard {
  [username: string]: number;
}

/**
 * Adds a contribution to a user's leaderboard count.
 * If the user is new, initialises their count to 1.
 * If the user already exists, increments their count.
 *
 * @param board - The current leaderboard object
 * @param username - The contributor's GitHub username
 * @returns A new leaderboard object with the updated count
 */
export function addContribution(
  board: Leaderboard,
  username: string
): Leaderboard {
  return {
    ...board,
    [username]: (board[username] ?? 0) + 1,
  };
}

/**
 * Returns the sorted leaderboard entries from highest to lowest score.
 *
 * @param board - The current leaderboard object
 * @returns Array of [username, count] tuples sorted descending by count
 */
export function getRanking(
  board: Leaderboard
): [string, number][] {
  return Object.entries(board).sort(([, a], [, b]) => b - a);
}
