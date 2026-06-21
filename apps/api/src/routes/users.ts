import { Router, Request, Response } from "express";

/**
 * Represents a user in the system.
 */
interface User {
  id: string;
  name: string;
  email: string;
}

const router = Router();

/**
 * GET /users — List all users (stub).
 *
 * Returns an empty data array with a message indicating
 * the full implementation is not yet available.
 *
 * @response 200 { data: User[], message: string }
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users — Create a new user (stub).
 *
 * Accepts { name, email } in the request body and echoes
 * back the payload with a synthetic ID.
 *
 * @requestBody { name: string, email: string }
 * @response 201 { data: User, message: string }
 */
router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
