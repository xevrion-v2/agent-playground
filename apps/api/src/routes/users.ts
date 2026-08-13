import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO(#10): Implement paginated user listing with auth, filtering, and 401/403 handling.
  // TODO(#10): Return stable DTO shape and empty-state metadata for the web client.
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  // TODO(#10): Validate email/name, generate server-side id, and reject malformed JSON bodies.
  // TODO(#10): Return 400 for invalid payloads and 409 for duplicate emails once persistence exists.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
