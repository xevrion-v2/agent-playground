import { Router, Request, Response } from "express";

const router = Router();

/** GET /users — Returns a placeholder user listing. */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/** POST /users — Creates a stub user and returns it. */
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
