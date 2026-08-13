import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// Reject unsupported methods on the /users collection with 405
router.all("/", (_req: Request, res: Response) => {
  res.set("Allow", "GET, POST");
  res.status(405).json({ error: "Method not allowed. Supported methods: GET, POST." });
});

export default router;
