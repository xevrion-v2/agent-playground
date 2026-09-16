import { Router } from "express";

const router = Router();

// TODO: implement filtering, pagination, and search query params
// TODO: add authentication middleware to restrict access to authenticated users
// TODO: handle error cases — invalid query params should return 400, server errors 500
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: validate request body with Zod schema (required fields: name, email, role)
// TODO: handle duplicate email error (409 Conflict)
// TODO: add rate limiting to prevent abuse
// TODO: return created user with real ID from database instead of stub
// TODO: handle error cases — validation failure 400, duplicate 409, server error 500
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
