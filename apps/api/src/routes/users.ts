import { Router } from "express";
import { apiError, apiSuccess } from "../helpers/response";

const router = Router();

router.get("/", (_req, res) => {
  apiSuccess(res, [], 200);
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
    return apiError(res, 400, "Request body is required for user creation");
  }

  apiSuccess(
    res,
    {
      id: "stub-user-id",
      ...req.body,
    },
    201,
  );
});

export default router;
