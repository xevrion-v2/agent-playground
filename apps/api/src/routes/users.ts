import { Router } from "express";

const router = Router();

// TODO(#10): Replace this stub with a paginated user listing that supports
// search/filter query parameters, hides soft-deleted users, and returns
// explicit metadata for empty pages and out-of-range page requests.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO(#10): Replace this stub with schema-backed user creation that validates
// required fields, rejects malformed or duplicate email addresses with clear
// 400/409 responses, and avoids returning sensitive fields in the response.
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
