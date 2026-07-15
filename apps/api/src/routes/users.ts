import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: replace the placeholder empty list with a real data source.
  // TODO: add pagination, filtering, and the error path for invalid query params.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: validate the incoming payload before creating a user record.
  // TODO: return a real persisted user object and explicit validation errors.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
