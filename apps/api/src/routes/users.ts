import { Router } from "express";

const router = Router();

// TODO: replace the empty list with paginated user data from persistence.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: validate the request body and return a 400 for invalid user payloads.
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
