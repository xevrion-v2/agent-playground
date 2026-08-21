import { Router } from "express";

const router = Router();

// GET /users — list users.
// TODO: Replace the stubbed empty list with a real query once the user
//       service and database layer are wired up.
// TODO: Support pagination via `?limit=` and `?offset=` query params, and
//       validate that they are non-negative integers (400 on bad input).
// TODO: Support filtering/search (e.g. `?q=` over name/email) for the
//       user-search screens described in the README.
// TODO: Return 500 with a structured error envelope if the data source fails.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// POST /users — create a user.
// TODO: Validate the request body before creating a user and return 400 with
//       a structured error when required fields (e.g. email, name) are missing
//       or malformed.
// TODO: Reject duplicate emails with 409 Conflict once persistence exists.
// TODO: Persist the new user via the user service instead of echoing the
//       request body, and return the stored representation.
// TODO: Return 500 with a structured error envelope if creation fails.
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
