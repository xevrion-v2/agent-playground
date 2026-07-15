import { Router } from "express";

const router = Router();

function isEmptyJsonBody(body: unknown): body is Record<string, never> {
  return body !== null && typeof body === "object" && !Array.isArray(body) && Object.keys(body).length === 0;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (req.body === undefined || req.body === null || isEmptyJsonBody(req.body)) {
    res.status(400).json({
      data: null,
      message: "User creation requires a non-empty JSON body."
    });
    return;
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
