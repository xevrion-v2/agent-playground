import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Fetches a list of all users.
 * @param req - Express request object
 * @param res - Express response object returning array of users
 */
export async function getUsers(req: Request, res: Response): Promise<void> {
  res.json({ users: [] });
}

/**
 * Fetches a single user by their unique ID.
 * @param req - Express request object containing user ID parameter
 * @param res - Express response object returning the target user profile
 */
export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  res.json({ user: { id } });
}

/**
 * Creates a new user profile.
 * @param req - Express request object containing user creation payload
 * @param res - Express response object returning the created user
 */
export async function createUser(req: Request, res: Response): Promise<void> {
  const data = req.body;
  res.json({ user: data });
}

/**
 * Updates an existing user profile by ID.
 * @param req - Express request object containing user ID and updated attributes
 * @param res - Express response object returning the updated user
 */
export async function updateUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const data = req.body;
  res.json({ user: { id, ...data } });
}

/**
 * Deletes a user by their unique ID.
 * @param req - Express request object containing user ID parameter
 * @param res - Express response object confirming deletion status
 */
export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted successfully` });
}

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
