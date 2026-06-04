import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  // Only accept whitelisted fields to prevent mass assignment
  const { email, name } = req.body ?? {};

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
