/**
 * Leaderboard update logic mirroring the GitHub Actions workflow.
 * Core: increment a contributor"s PR count in leaderboard.json.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";

interface Leaderboard {
  [username: string]: number;
}

export function loadLeaderboard(path: string): Leaderboard {
  if (!existsSync(path)) {
    return {};
  }
  return JSON.parse(readFileSync(path, "utf-8"));
}

export function incrementContributor(
  leaderboard: Leaderboard,
  username: string
): Leaderboard {
  return {
    ...leaderboard,
    [username]: (leaderboard[username] || 0) + 1,
  };
}

export function saveLeaderboard(path: string, data: Leaderboard): void {
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
