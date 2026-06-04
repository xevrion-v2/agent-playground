import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /users?page=1&limit=20
 *
 * Returns a paginated user list. Query parameters:
 * - page:  page number (default 1, minimum 1)
 * - limit: items per page (default 20, min 1, max 100)
 */
router.get("/", (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(req.query.limit as string, 10) || 20),
  );
  const offset = (page - 1) * limit;

  // Placeholder data — in production this would query the database
  const totalItems = 0;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  res.json({
    data: [],
    pagination: {
      page,
      limit,
      offset,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
