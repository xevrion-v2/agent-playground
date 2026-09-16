import { Router, Request, Response } from "express";

const router = Router();

export interface LeaderboardEntry {
  username: string;
  score: number;
}

export type Leaderboard = Record<string, number>;

/**
 * Add or increment a user's score on the leaderboard.
 */
export function updateScore(
  leaderboard: Leaderboard,
  username: string,
  points: number
): Leaderboard {
  if (!username || typeof username !== "string") {
    throw new Error("Username is required and must be a string.");
  }
  if (typeof points !== "number" || points < 0) {
    throw new Error("Points must be a non-negative number.");
  }
  return {
    ...leaderboard,
    [username]: (leaderboard[username] || 0) + points,
  };
}

/**
 * Remove a user from the leaderboard.
 */
export function removeUser(
  leaderboard: Leaderboard,
  username: string
): Leaderboard {
  if (!username || typeof username !== "string") {
    throw new Error("Username is required and must be a string.");
  }
  const { [username]: _, ...rest } = leaderboard;
  return rest;
}

/**
 * Get the top N entries sorted by score descending.
 */
export function getTopEntries(
  leaderboard: Leaderboard,
  limit: number = 10
): LeaderboardEntry[] {
  return Object.entries(leaderboard)
    .map(([username, score]) => ({ username, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Get a user's rank (1-indexed). Returns -1 if user not found.
 */
export function getUserRank(
  leaderboard: Leaderboard,
  username: string
): number {
  if (!(username in leaderboard)) return -1;
  const sorted = Object.entries(leaderboard)
    .sort(([, a], [, b]) => b - a);
  return sorted.findIndex(([name]) => name === username) + 1;
}

// In-memory leaderboard store
let leaderboardData: Leaderboard = {};

router.get("/", (_req: Request, res: Response) => {
  const top = getTopEntries(leaderboardData, 100);
  res.json({ data: top });
});

router.get("/:username", (req: Request, res: Response) => {
  const { username } = req.params;
  if (!(username in leaderboardData)) {
    return res.status(404).json({ error: "User not found" });
  }
  const rank = getUserRank(leaderboardData, username);
  res.json({
    data: {
      username,
      score: leaderboardData[username],
      rank,
    },
  });
});

router.post("/update", (req: Request, res: Response) => {
  const { username, points } = req.body;
  try {
    leaderboardData = updateScore(leaderboardData, username, points);
    res.status(200).json({
      data: {
        username,
        score: leaderboardData[username],
      },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
