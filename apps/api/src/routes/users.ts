import { Router } from "express";

const router = Router();

// TODO: Implement GET /users route
// Expected Behavior:
// - Fetch a paginated list of users from the database.
// - Support pagination query parameters: 'limit' (default: 10, max: 100) and 'page' (default: 1).
// - Support optional 'search' query parameter to filter users by name or email.
// - Ensure sensitive user data (e.g., password hashes, session tokens) is excluded from the response.
// Error Cases & Handling:
// - 400 Bad Request: Validate query parameters and return error if page/limit are not positive integers.
// - 401 Unauthorized: Restrict access to authenticated users only if session verification fails.
// - 500 Internal Server Error: Catch database connection failures or unexpected server errors.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement POST /users route
// Expected Behavior:
// - Validate the incoming payload against the User schema (e.g., username, email, password).
// - Hash the password securely using bcrypt before database insertion.
// - Create a new user record in the database via Prisma client.
// - Send a verification email asynchronously to the new user.
// - Return the created user object (excluding the password hash) with a 201 Created status.
// Error Cases & Handling:
// - 400 Bad Request: Validation fails (e.g., invalid email structure, missing required fields).
// - 409 Conflict: If a user with the specified email address already exists.
// - 500 Internal Server Error: Database write errors or mail transport service failures.
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
