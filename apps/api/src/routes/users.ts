import { Router, Request, Response } from "express";
import { errorResponse } from "../helpers/errorResponse";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response): void => {
  const { email, name } = req.body ?? {};

  if (!email || typeof email !== "string") {
    errorResponse(res, 400, "A valid email is required.", {
      field: "email",
      received: email
    });
    return;
  }

  if (!name || typeof name !== "string") {
    errorResponse(res, 400, "Name is required.", {
      field: "name",
      received: name
    });
    return;
  }

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
