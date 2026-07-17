import { Router } from "express";

const router = Router();

// TODO: GET /users - add pagination (limit/offset) and filters (?role, ?email).
//       Return 200 with a serialized user list; 500 on data-layer failure.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: validate req.body (require email; name optional) and reject invalid
  //       input with 400 + a structured error envelope.
  // TODO: persist the user via the data layer; currently echoes a stub id.
  // TODO: if a password is supplied, hash it and never echo secrets in the response.
  // TODO: on unexpected errors return 500 with a generic message (avoid leaking internals).
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
