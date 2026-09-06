import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace this stub with paginated user lookup, filtering, and auth-aware visibility rules.
  // TODO: Return validation or service errors through the shared API error envelope once middleware exists.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate the request body before creating a user, including required profile fields and duplicates.
  // TODO: Replace the stub response with persistence, conflict handling, and sanitized user output.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
