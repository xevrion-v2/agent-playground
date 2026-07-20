import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace the stub with paginated user lookup and return 400 for invalid filters.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate required user fields and return 400 for malformed create requests.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
