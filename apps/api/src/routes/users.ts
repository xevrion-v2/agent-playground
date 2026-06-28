import { Router } from "express";

const router = Router();

const isNonEmptyObject = (value: unknown) =>
  Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length > 0
  );

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isNonEmptyObject(req.body)) {
    return res.status(400).json({
      error: {
        message: "Request body must be a non-empty JSON object."
      }
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
