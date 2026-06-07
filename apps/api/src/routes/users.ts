import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO(api/users:list): Return paginated users with optional filter/sort query params.
  // TODO(api/users:list): Return a stable empty payload and 5xx error shape when data access fails.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO(api/users:create): Validate required fields and reject malformed payloads with 4xx errors.
  // TODO(api/users:create): Handle duplicate email/username conflicts and persistence failures explicitly.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
