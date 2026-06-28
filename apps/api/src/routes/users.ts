import { Router } from "express";

const router = Router();

function isUserCreatePayload(body: unknown): body is { email: string; name?: string } {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const candidate = body as Record<string, unknown>;
  return typeof candidate.email === "string" && (candidate.name === undefined || typeof candidate.name === "string");
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isUserCreatePayload(req.body)) {
    return res.status(400).json({
      error: "Invalid user payload."
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
