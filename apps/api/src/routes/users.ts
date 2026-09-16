import { Router } from "express";

import { validateUserPayload } from "../utils/validateUserPayload";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Validate and normalize the request body
  const validation = validateUserPayload(req.body);

  if (!validation.success) {
    return res.status(validation.statusCode).json({
      status: "error",
      error: {
        code: "VALIDATION_ERROR",
        message: validation.error
      }
    });
  }

  const { email, name } = validation.data;

  // Generate id server-side — never trust client-supplied ids
  const userId = `user-${Date.now()}`;

  const user = {
    id: userId,
    email,
    ...(name !== undefined && { name })
  };

  return res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

export default router;
