import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "taskflow-api" });
});

export default router;
