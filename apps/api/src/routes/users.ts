import { Router } from "express";

const router = Router();

// TODO: Replace this stub with paginated user lookup and search filters.
// Handle invalid query parameters, unauthorized access, and datastore read failures.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Replace this stub with validated user creation backed by persistent storage.
// Handle malformed payloads, duplicate email or username conflicts, and datastore write failures.
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
