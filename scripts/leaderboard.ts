import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const LEADERBOARD_PATH = join(__dirname, "../../leaderboard.json");

export function loadLeaderboard(): Record<string, number> {
  try {
    const raw = readFileSync(LEADERBOARD_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveLeaderboard(data: Record<string, number>): void {
  writeFileSync(LEADERBOARD_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function updateScore(
  board: Record<string, number>,
  username: string,
  increment: number = 1
): Record<string, number> {
  if (!username || typeof username !== "string") {
    throw new Error("Username must be a non-empty string");
  }
  if (typeof increment !== "number" || increment < 0) {
    throw new Error("Increment must be a non-negative number");
  }
  return {
    ...board,
    [username]: (board[username] || 0) + increment,
  };
}

export function addContributor(
  board: Record<string, number>,
  username: string
): Record<string, number> {
  if (board[username] !== undefined) {
    return board; // already exists
  }
  return updateScore(board, username, 1);
}
