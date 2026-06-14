import { Router } from "express";

const router = Router();

// TODO: paginate results once a database is connected
// TODO: support query filters (e.g. ?role=admin)
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: validate required fields (name, email) before persisting
// TODO: check for duplicate email addresses
// TODO: assign a real UUID via the database instead of a static stub id
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
