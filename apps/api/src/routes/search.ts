import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const query = req.query.q as string | undefined;
  if (!query || !query.trim()) {
    res.status(400).json({ error: "Query parameter 'q' is required" });
    return;
  }
  res.json({
    data: [],
    query: query.trim(),
    message: "Search not implemented yet.",
  });
});

export default router;
