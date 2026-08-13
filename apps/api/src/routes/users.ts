import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace this stub with paginated user lookup, filtering, and authorization-aware empty results.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate required user fields and return clear 400 responses before creating a persisted user.
  // TODO: Handle duplicate emails, storage failures, and unexpected service errors with consistent API responses.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
