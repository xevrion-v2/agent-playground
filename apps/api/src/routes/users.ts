import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * List all users.
 *
 * Returns a stub response since user listing is not implemented yet.
 *
 * @param _req - The incoming HTTP request.
 * @param res - The HTTP response object.
 * @returns A JSON object containing an empty data array.
 */
function listUsers(_req: Request, res: Response): void {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
}

/**
 * Create a new user.
 *
 * Returns a stub user echoing the request body since user creation is not
 * implemented yet.
 *
 * @param req - The incoming HTTP request containing the user payload.
 * @param res - The HTTP response object.
 * @returns A JSON object containing the created stub user.
 */
function createUser(req: Request, res: Response): void {
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
