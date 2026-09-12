import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace the stub with persisted user lookup, including pagination/filtering
  // and clear error responses for invalid query parameters or storage failures.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate and normalize the incoming user payload before persistence,
  // reject malformed or duplicate-user requests, and surface storage errors clearly.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
