import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "TaskFlow auth route placeholder. Authentication endpoints are not implemented yet."
  });
});

export default router;
