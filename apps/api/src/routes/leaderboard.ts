import { Router, Request, Response } from "express";

const router = Router();

/**
 * In-memory leaderboard store.
 * Maps contributor username → merged-PR count.
 */
const leaderboard: Record<string, number> = {};

/**
 * GET /leaderboard
 * Returns contributors sorted by merged-PR count (descending).
 *
 * @route GET /leaderboard
 * @returns {Object} 200 - Sorted contributor list
 */
router.get("/", (_req: Request, res: Response) => {
  const sorted = Object.entries(leaderboard)
    .map(([user, merged]) => ({ user, merged }))
    .sort((a, b) => b.merged - a.merged);

  res.json({ status: "ok", data: sorted });
});

/**
 * POST /leaderboard
 * Update a contributor's merged-PR count.
 * If the contributor doesn't exist yet, they are added.
 *
 * TODO: Persist updates to leaderboard.json / database.
 * TODO: Validate that `points` is a positive integer.
 * TODO: Support batch updates in a single request.
 *
 * @route POST /leaderboard
 * @body {string}  user   - Contributor username (required)
 * @body {number}  points - Number of PRs to add (required, positive integer)
 * @returns {Object} 200  - Updated contributor entry
 * @returns {Object} 400  - Validation error (missing user or invalid points)
 */
router.post("/", (req: Request, res: Response) => {
  const { user, points } = req.body as Record<string, unknown>;

  if (typeof user !== "string" || user.trim().length === 0) {
    return res.status(400).json({ error: "user is required and must be a non-empty string." });
  }

  if (typeof points !== "number" || !Number.isFinite(points) || points < 0 || !Number.isInteger(points)) {
    return res.status(400).json({ error: "points is required and must be a non-negative integer." });
  }

  const name = user.trim();
  leaderboard[name] = (leaderboard[name] ?? 0) + points;

  res.json({ status: "ok", data: { user: name, merged: leaderboard[name] } });
});

export default router;
