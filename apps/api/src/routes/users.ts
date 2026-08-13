import { Router } from "express";`n`nimport { sendApiError } from "../utils/apiError";`n
const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.get("/:id", (_req, res) => {
  return sendApiError(res, 501, "User lookup is not implemented yet.", "NOT_IMPLEMENTED");
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
