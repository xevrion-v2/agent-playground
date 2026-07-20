import { Router } from "express";
import { sendError } from "../helpers/errors";

const router = Router();

router.get("/", (_req, res) => {
  // Simulate an error condition for demonstration
  // In production, this would check auth, query DB, etc.
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  // Example: return 404 for invalid user IDs
  if (id === "invalid") {
    sendError(res, 404, `User with ID '${id}' not found.`);
    return;
  }
  res.json({
    data: { id, name: "Stub User" },
    message: "Single user lookup is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  // Example: return 400 for missing required fields
  if (!req.body || !req.body.name) {
    sendError(res, 400, "Missing required field: 'name'.");
    return;
  }
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
