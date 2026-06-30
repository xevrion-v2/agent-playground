import { Router } from "express";

const router = Router();

// TODO: Add pagination, filtering, and search query params
// TODO: Add user role filtering (admin/member/viewer)
// TODO: Return 403 for unauthorized access
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Add input validation (email format, password strength, name length)
// TODO: Hash password before storing
// TODO: Check for duplicate email before creation
// TODO: Return 409 Conflict on duplicate
// TODO: Add email verification flow
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: GET /:id — Get user by ID
// TODO:   - Return 404 if user not found
// TODO:   - Return 403 if requester lacks permission
// TODO:   - Include user profile data (avatar, bio, joined date)

// TODO: PUT /:id — Update user profile
// TODO:   - Validate editable fields only (name, bio, avatar)
// TODO:   - Prevent role/email changes via this endpoint
// TODO:   - Return 400 on invalid fields
// TODO:   - Return 404 if user not found

// TODO: DELETE /:id — Delete user account
// TODO:   - Require confirmation or soft-delete
// TODO:   - Cascade: delete related data (posts, comments)
// TODO:   - Return 204 No Content on success
// TODO:   - Return 404 if user not found

export default router;
