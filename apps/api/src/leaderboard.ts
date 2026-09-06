import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

export type Leaderboard = Record<string, number>;

/**
 * Load the leaderboard from a JSON file on disk.
 * Returns an empty object when the file does not exist or is empty.
 */
export function loadLeaderboard(filePath: string): Leaderboard {
  try {
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Leaderboard;
  } catch {
    return {};
  }
}

/**
 * Persist the leaderboard object to a JSON file.
 */
export function saveLeaderboard(filePath: string, board: Leaderboard): void {
  writeFileSync(filePath, JSON.stringify(board, null, 2) + "\n", "utf-8");
}

/**
 * Add (or increment) a contributor's score on the leaderboard.
 * Returns the updated leaderboard without mutating the input.
 */
export function addContribution(
  board: Leaderboard,
  contributor: string,
  points: number = 1
): Leaderboard {
  if (!contributor || typeof contributor !== "string") {
    throw new Error("Contributor name must be a non-empty string");
  }
  if (typeof points !== "number" || points < 0) {
    throw new Error("Points must be a non-negative number");
  }
  return {
    ...board,
    [contributor]: (board[contributor] ?? 0) + points,
  };
}

/**
 * Remove a contributor from the leaderboard.
 * Returns the updated leaderboard without mutating the input.
 */
export function removeContributor(
  board: Leaderboard,
  contributor: string
): Leaderboard {
  const { [contributor]: _, ...rest } = board;
  return rest;
}

/**
 * Return the leaderboard sorted by score descending.
 */
export function getSortedLeaderboard(
  board: Leaderboard
): Array<{ contributor: string; score: number }> {
  return Object.entries(board)
    .map(([contributor, score]) => ({ contributor, score }))
    .sort((a, b) => b.score - a.score);
}
