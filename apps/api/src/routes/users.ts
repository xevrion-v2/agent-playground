import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace the stub with a paginated user lookup backed by the database.
  // TODO: Return a clear error response when query filters are invalid or the data source fails.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate required user fields before creating records.
  // TODO: Reject duplicate emails, malformed payloads, and persistence failures with consistent errors.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
