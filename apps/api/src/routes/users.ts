import { Router } from "express";

const router = Router();

// TODO: GET /users — implement pagination (query params: page, limit)
// TODO: GET /users/:id — fetch single user by ID
// TODO: GET /users/:id — return 404 if user not found
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: POST /users — validate email format and uniqueness
// TODO: POST /users — validate required fields (email, name)
// TODO: POST /users — hash password before storing
// TODO: POST /users — return 409 if email already exists
// TODO: POST /users — return 400 on validation errors with field-level messages
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: PUT /users/:id — update user fields
// TODO: PUT /users/:id — validate update payload
// TODO: PUT /users/:id — return 404 if user not found
// TODO: PUT /users/:id — return 400 on invalid fields

// TODO: DELETE /users/:id — soft delete user
// TODO: DELETE /users/:id — return 404 if user not found
// TODO: DELETE /users/:id — return 204 on success

// TODO: PATCH /users/:id/settings — update user preferences
// TODO: GET /users/:id/settings — fetch user preferences

export default router;
