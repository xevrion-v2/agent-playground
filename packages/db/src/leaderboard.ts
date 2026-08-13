import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const LEADERBOARD_PATH = resolve(import.meta.dirname, "../../leaderboard.json");

interface Leaderboard {
  [username: string]: number;
}

export function loadLeaderboard(): Leaderboard {
  const raw = readFileSync(LEADERBOARD_PATH, "utf-8");
  return JSON.parse(raw) as Leaderboard;
}

export function saveLeaderboard(data: Leaderboard): void {
  writeFileSync(LEADERBOARD_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function incrementContributor(username: string, amount = 1): Leaderboard {
  if (!username || typeof username !== "string") {
    throw new Error("Username must be a non-empty string");
  }
  if (typeof amount !== "number" || amount <= 0 || !Number.isInteger(amount)) {
    throw new Error("Amount must be a positive integer");
  }
  const leaderboard = loadLeaderboard();
  leaderboard[username] = (leaderboard[username] || 0) + amount;
  saveLeaderboard(leaderboard);
  return leaderboard;
}

export function getTopContributors(n = 10): Array<{ username: string; points: number }> {
  const leaderboard = loadLeaderboard();
  return Object.entries(leaderboard)
    .map(([username, points]) => ({ username, points }))
    .sort((a, b) => b.points - a.points)
    .slice(0, n);
}
