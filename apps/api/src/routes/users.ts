import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// Reject unsupported methods with 405 Method Not Allowed
router.all("/", (_req, res) => {
  res.setHeader("Allow", "GET, POST");
  res.status(405).json({
    error: "Method Not Allowed",
    message: "The requested method is not supported for this resource.",
  });
});

export default router;
