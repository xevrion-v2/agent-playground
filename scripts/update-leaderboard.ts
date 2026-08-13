/**
 * Leaderboard update script.
 *
 * Extracted from .github/workflows/auto-process.yml so it can be
 * unit-tested. Increments the PR count for a given GitHub user.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export interface Leaderboard {
  [user: string]: number;
}

const LEADERBOARD_PATH = join(import.meta.dirname ?? __dirname, "..", "leaderboard.json");

/**
 * Load the leaderboard from disk.
 */
export function loadLeaderboard(path: string = LEADERBOARD_PATH): Leaderboard {
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, "utf-8"));
}

/**
 * Save a leaderboard to disk.
 */
export function saveLeaderboard(board: Leaderboard, path: string = LEADERBOARD_PATH): void {
  writeFileSync(path, JSON.stringify(board, null, 2) + "\n");
}

/**
 * Increment the PR count for `user` in the leaderboard.
 * If the user doesn't exist yet, starts at 1.
 * Returns the updated leaderboard.
 */
export function incrementUser(board: Leaderboard, user: string): Leaderboard {
  board[user] = (board[user] ?? 0) + 1;
  return board;
}

/**
 * Check if a PR has already been counted (by scanning git log).
 * For CI — stubbed here; actual check uses `git log --grep`.
 */
export function isAlreadyCounted(
  prNumber: number,
  recentCommits: string[] = []
): boolean {
  const pattern = `^chore: update leaderboard for PR #${prNumber}$`;
  return recentCommits.some((msg) => new RegExp(pattern).test(msg));
}

// ── CLI entrypoint (mirrors the workflow logic) ──────────────────
if (import.meta.main) {
  const user = process.env.PR_USER;
  const prNumber = process.env.PR_NUMBER;

  if (!user || !prNumber) {
    console.error("Usage: PR_USER=... PR_NUMBER=... npx tsx scripts/update-leaderboard.ts");
    process.exit(1);
  }

  const board = loadLeaderboard();
  incrementUser(board, user);
  saveLeaderboard(board);
  console.log(`Leaderboard updated: ${user} → ${board[user]} PRs`);
}
