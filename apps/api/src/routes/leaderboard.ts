import { Router, Request, Response } from "express";
import { sendError } from "../errorHandler";
import * as fs from "node:fs";
import * as path from "node:path";

const router = Router();

interface LeaderboardEntry {
  user: string;
  score: number;
}

function readLeaderboard(): LeaderboardEntry[] {
  const filePath = path.resolve(__dirname, "../../../../leaderboard.json");
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw) as Record<string, number>;
    return Object.entries(data)
      .map(([user, score]) => ({ user, score }))
      .sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}

/**
 * Increments a user's score in the leaderboard and writes back to disk.
 */
export function updateLeaderboard(user: string, points: number): LeaderboardEntry[] {
  const filePath = path.resolve(__dirname, "../../../../leaderboard.json");
  const data = readLeaderboardSync(filePath);
  data[user] = (data[user] || 0) + points;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return Object.entries(data)
    .map(([u, s]) => ({ user: u, score: s }))
    .sort((a, b) => b.score - a.score);
}

function readLeaderboardSync(filePath: string): Record<string, number> {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

router.get("/", (_req: Request, res: Response) => {
  const leaderboard = readLeaderboard();
  res.json({ status: "ok", data: leaderboard });
});

router.post("/update", (req: Request, res: Response) => {
  const { user, points } = req.body;
  if (!user || typeof user !== "string" || user.trim().length === 0) {
    sendError(res, 400, "Field 'user' is required.");
    return;
  }
  if (typeof points !== "number" || points <= 0) {
    sendError(res, 400, "Field 'points' must be a positive number.");
    return;
  }
  const updated = updateLeaderboard(user.trim(), points);
  res.json({ status: "ok", data: updated });
});

export default router;
