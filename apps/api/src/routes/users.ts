import { Router } from "express";

const router = Router();

// TODO: replace stub with paginated user listing backed by the database layer.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

// TODO: validate auth/session before accepting writes; return 401 when unauthenticated.
// TODO: reject malformed emails and unknown fields with 400 responses.
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
