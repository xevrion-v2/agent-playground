import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * GET /users
 *
 * Lists users. Currently a stub: returns an empty data array with an
 * explanatory message until real user storage is implemented.
 *
 * @param _req - Incoming request (unused).
 * @param res - Express response; responds with 200 and a JSON envelope.
 * @returns JSON `{ data: User[], message: string }`.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a user. Currently a stub: echoes the request body back with a
 * placeholder id and a 201 status until real persistence is implemented.
 *
 * @param req - Incoming request; body is spread into the returned user object.
 * @param res - Express response; responds with 201 and a JSON envelope.
 * @returns JSON `{ data: { id: string } & req.body, message: string }`.
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
