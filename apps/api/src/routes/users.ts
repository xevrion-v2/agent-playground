import { Router, Request, Response } from "express";

import { notFound } from "../middleware/errorHandler";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  if (!req.body || !req.body.email) {
    return res.status(400).json({
      error: "Request body must include an email field"
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
