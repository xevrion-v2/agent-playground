import { Router } from "express";
import { apiError } from "../helpers/errors";

const router = Router();

router.get("/", (_req, res) => {
  try {
    res.json({
      data: [],
      message: "User listing is not implemented yet."
    });
  } catch (err) {
    apiError(res, 500, "Failed to fetch users");
  }
});

router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
