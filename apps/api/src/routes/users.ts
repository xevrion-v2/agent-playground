import { Router } from "express";

const router = Router();

/**
 * Return the current user collection placeholder response.
 *
 * This endpoint is intentionally stubbed until the user listing service is
 * implemented, so clients receive a stable response shape while the API grows.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Return a created user placeholder response using the submitted request body.
 *
 * The route preserves the incoming payload and attaches a stub identifier until
 * persistent user creation is implemented in the service layer.
 */
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
