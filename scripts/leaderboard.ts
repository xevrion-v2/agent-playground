import fs from "fs";
import path from "path";

const LEADERBOARD_PATH = path.resolve(__dirname, "../../leaderboard.json");

export interface Leaderboard {
  [username: string]: number;
}

export function loadLeaderboard(filePath: string = LEADERBOARD_PATH): Leaderboard {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function saveLeaderboard(
  board: Leaderboard,
  filePath: string = LEADERBOARD_PATH
): void {
  fs.writeFileSync(filePath, JSON.stringify(board, null, 2) + "\n", "utf-8");
}

export function addContribution(
  board: Leaderboard,
  username: string,
  count: number = 1
): Leaderboard {
  const updated = { ...board };
  if (updated[username] !== undefined) {
    updated[username] += count;
  } else {
    updated[username] = count;
  }
  return updated;
}
