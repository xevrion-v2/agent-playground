import { Router, Request, Response } from "express";

const router = Router();

// TODO: GET /api/users — List all users
// Expected behavior:
//   - Return paginated list of users (default page=1, limit=20)
//   - Support query params: ?page=&limit=&sort=createdAt&order=asc|desc
//   - Include user profile fields: id, username, email, avatarUrl, createdAt, updatedAt
//   - Support optional filters: ?role=contributor&status=active
// Error cases:
//   - 400 Bad Request: invalid page/limit values (non-numeric, negative, >100)
//   - 401 Unauthorized: if endpoint is restricted to authenticated users
//   - 500 Internal Server Error: database connection failure
// Example response:
//   { "users": [...], "total": 42, "page": 1, "limit": 20 }

router.get("/", (req: Request, res: Response) => {
  res.json({ users: [] });
});

// TODO: GET /api/users/:id — Get single user by ID
// Expected behavior:
//   - Validate :id is a valid UUID format
//   - Return full user profile including bio, social links, contribution count
//   - Include 404 response when user not found
//   - Support soft-deleted users with ?includeDeleted=true (admin only)
// Error cases:
//   - 400 Bad Request: malformed UUID in :id parameter
//   - 404 Not Found: user with given ID does not exist
//   - 500 Internal Server Error: database query failure
// Example response:
//   { "user": { "id": "uuid", "username": "...", "email": "...", ... } }

router.get("/:id", (req: Request, res: Response) => {
  res.json({ user: {} });
});

// TODO: POST /api/users — Create a new user
// Expected behavior:
//   - Validate request body: username (required, 3-30 chars, alphanumeric+underscore)
//   - Validate request body: email (required, valid email format, unique)
//   - Validate request body: password (required, min 8 chars, must include uppercase+number+special)
//   - Hash password before storing (bcrypt with cost factor >= 12)
//   - Generate and return JWT access token + refresh token on success
//   - Send welcome email to new user
//   - Create default user profile/agent entry
// Error cases:
//   - 400 Bad Request: missing required fields, invalid format, weak password
//   - 409 Conflict: username or email already taken
//   - 422 Unprocessable Entity: validation failures with field-level error messages
//   - 500 Internal Server Error: database write failure, email service down
// Example response:
//   { "user": { "id": "...", "username": "..." }, "token": "jwt...", "refreshToken": "..." }

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({ user: {} });
});

export default router;
