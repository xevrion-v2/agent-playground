import { Router } from "express";
import { sendError } from "../utils/errorResponse";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id || id === "undefined" || id === "null") {
    return sendError(res, {
      status: 400,
      code: "INVALID_USER_ID",
      message: "Valid user ID is required"
    });
  }

  return sendError(res, {
    status: 404,
    code: "USER_NOT_FOUND",
    message: `User with ID ${id} not found`
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body || {};

  if (!email) {
    return sendError(res, {
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Email is required to create a user"
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email,
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
