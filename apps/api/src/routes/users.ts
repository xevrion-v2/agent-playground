import { Router } from "express";

const router = Router();

function isUserCreateBody(value: unknown): value is { name: string; email: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const body = value as Record<string, unknown>;
  return typeof body.name === "string" && typeof body.email === "string";
}
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {`r`n  if (!isUserCreateBody(req.body)) {`r`n    return res.status(400).json({`r`n      error: "Invalid user payload. Expected name and email string fields."`r`n    });`r`n  }`r`n`r`n  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
