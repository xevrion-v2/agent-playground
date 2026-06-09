import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace the empty array with persisted users and support
  // query-driven filters such as pagination, search, and sorting.
  // TODO: Return a consistent error payload when user lookup fails
  // because of upstream data access or authorization problems.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate the incoming payload before creation and return a
  // 400-level response when required user fields are missing or invalid.
  // TODO: Replace the stub ID with a persisted record identifier and
  // surface duplicate/conflict errors separately from unexpected 5xx failures.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
