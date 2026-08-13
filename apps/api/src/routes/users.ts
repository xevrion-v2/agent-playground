import { Router, Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

const router = Router();

/** Mock users store for demonstration */
interface StubUser {
  id: string;
  name: string;
  email: string;
}

const stubUsers: StubUser[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

/**
 * GET /users — Retrieve all users.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({ data: stubUsers });
});

/**
 * GET /users/:id — Retrieve a single user by ID (demonstrates 404 via ApiError).
 */
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = stubUsers.find((u) => u.id === req.params.id);
    if (!user) {
      throw ApiError.notFound(`User with id "${req.params.id}" not found`);
    }
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /users — Create a new user (demonstrates 400 via ApiError).
 */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      throw ApiError.badRequest("Name and email are required");
    }
    const newUser: StubUser = {
      id: String(stubUsers.length + 1),
      name,
      email,
    };
    stubUsers.push(newUser);
    res.status(201).json({ data: newUser });
  } catch (err) {
    next(err);
  }
});

export default router;
