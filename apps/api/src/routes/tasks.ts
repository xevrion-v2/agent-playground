import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ data: [], message: "Task listing not implemented yet." });
});

router.post("/", (req, res) => {
  res.status(201).json({ data: { id: "stub-task-id", ...req.body }, message: "Task creation not implemented yet." });
});

export default router;
