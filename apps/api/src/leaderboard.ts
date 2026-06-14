import * as fs from "fs";

interface LeaderboardEntry {
  [username: string]: number;
}

export function readLeaderboard(): LeaderboardEntry {
  const raw = fs.readFileSync("leaderboard.json", "utf-8");
  return JSON.parse(raw);
}

export function updateLeaderboard(username: string, contributions: number = 1): LeaderboardEntry {
  const leaderboard = readLeaderboard();
  if (leaderboard[username] !== undefined) {
    leaderboard[username] += contributions;
  } else {
    leaderboard[username] = contributions;
  }
  fs.writeFileSync("leaderboard.json", JSON.stringify(leaderboard, null, 2));
  return leaderboard;
}

export function getTopContributors(n: number = 10): [string, number][] {
  const leaderboard = readLeaderboard();
  return Object.entries(leaderboard).sort(([, a], [, b]) => b - a).slice(0, n);
}

export function userExists(username: string): boolean {
  return username in readLeaderboard();
}

export function getUserContributions(username: string): number {
  return readLeaderboard()[username] || 0;
}
