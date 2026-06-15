/**
 * Leaderboard update script for tracking contributor points.
 * Each merged PR increments the contributor's score by 1.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface Leaderboard {
  [contributor: string]: number;
}

const LEADERBOARD_PATH = join(__dirname, "..", "leaderboard.json");

/**
 * Load the leaderboard from the JSON file.
 * Returns an empty object if the file doesn't exist.
 */
export function loadLeaderboard(path: string = LEADERBOARD_PATH): Leaderboard {
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return {};
  }
}

/**
 * Save the leaderboard to the JSON file.
 */
export function saveLeaderboard(board: Leaderboard, path: string = LEADERBOARD_PATH): void {
  writeFileSync(path, JSON.stringify(board, null, 2) + "\n");
}

/**
 * Increment the contribution count for a user.
 */
export function incrementUser(board: Leaderboard, user: string): Leaderboard {
  if (!user) return board;
  board[user] = (board[user] || 0) + 1;
  return board;
}

/**
 * Check if a PR has already been counted by looking at recent commit messages.
 */
export function isAlreadyCounted(
  prNumber: number,
  recentCommits: string[] = []
): boolean {
  const pattern = \`chore: update leaderboard for PR #\${prNumber}\`;
  return recentCommits.some((msg) => msg.trim() === pattern);
}

/**
 * Get the contributor name from a GitHub username or PR author field.
 */
export function getContributor(prAuthor: string): string {
  return (prAuthor || "unknown").toLowerCase().trim();
}
