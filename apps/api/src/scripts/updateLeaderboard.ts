import fs from 'fs';
import path from 'path';

interface ContributorEntry {
  score: number;
  lastUpdated: number;
}

interface LeaderboardData {
  [username: string]: ContributorEntry;
}

export function updateLeaderboard(username: string, scoreDelta: number): void {
  const leaderboardPath = path.join(process.cwd(), 'leaderboard.json');
  let data: LeaderboardData = {};

  if (fs.existsSync(leaderboardPath)) {
    const raw = fs.readFileSync(leaderboardPath, 'utf-8');
    data = JSON.parse(raw);
  }

  if (data[username]) {
    data[username].score += scoreDelta;
  } else {
    data[username] = {
      score: scoreDelta,
      lastUpdated: Date.now(),
    };
  }

  data[username].lastUpdated = Date.now();

  fs.writeFileSync(leaderboardPath, JSON.stringify(data, null, 2));
}