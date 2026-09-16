import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace the stub list with paginated user lookup and empty-state handling.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate required profile fields and return structured 4xx errors for invalid bodies.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
