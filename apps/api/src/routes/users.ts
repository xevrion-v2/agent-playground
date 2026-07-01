import { Router } from "express";

import { apiError, apiOk } from "../http";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return apiError(res, 400, "Invalid JSON body");
  }
  apiOk(
    res,
    201,
    { id: "stub-user-id", ...req.body },
    "User creation is not implemented yet."
  );
});

export default router;
