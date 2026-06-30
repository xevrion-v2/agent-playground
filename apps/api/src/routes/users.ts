import { Router } from "express";
import { apiError, apiSuccess } from "../utils/api-error";

const router = Router();

router.get("/", (_req, res) => {
  return apiSuccess(res, [], 200);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return apiError(res, 400, "Name is required");
  }
  return apiSuccess(res, {
    id: "stub-user-id",
    ...req.body
  }, 201);
});

router.get("/:id", (req, res) => {
  return apiError(res, 404, `User ${req.params.id} not found`);
});

export default router;
