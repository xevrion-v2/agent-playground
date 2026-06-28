import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace this stub with paginated user lookup and empty-state metadata.
  // TODO: Return a structured validation error when query filters are malformed.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate required user fields before constructing the response payload.
  // TODO: Move duplicate email and persistence failures into a shared error format.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
