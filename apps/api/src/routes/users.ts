import { Router } from "express";

const router = Router();


// TODO: Add input validation middleware for /
// TODO: Add pagination support for list endpoints
// TODO: Add error handling for database operations
// TODO: Add request logging

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});


// TODO: Add input validation middleware for /
// TODO: Add pagination support for list endpoints
// TODO: Add error handling for database operations
// TODO: Add request logging

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
