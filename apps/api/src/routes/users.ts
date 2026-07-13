import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * Return the current user collection response.
 *
 * This route is intentionally a placeholder until persistent user storage is
 * added, so it returns an empty list while preserving the public response shape.
 */
function listUsers(_req: Request, res: Response) {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
}

/**
 * Create a stub user record from the submitted request body.
 *
 * Until the user service is backed by validation and storage, the handler echoes
 * the submitted payload with a stable stub ID so clients can integrate against
 * the expected creation response shape.
 */
function createUser(req: Request, res: Response) {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
}

router.get("/", listUsers);
router.post("/", createUser);

export default router;
