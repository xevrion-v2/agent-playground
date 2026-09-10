import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "TaskFlow proposals route" });
});

export default router;
