import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Replace this stub with a service-backed user listing that supports
  // pagination and returns a consistent error response when the datastore fails.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate the create-user payload before persistence, reject duplicate
  // emails with a conflict response, and surface service errors without echoing
  // untrusted request fields back to the client.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
