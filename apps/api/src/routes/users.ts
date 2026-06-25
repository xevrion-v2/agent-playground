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

router.all("/", (req, res) => {
  res.set("Allow", "GET, POST");
  res.status(405).json({
    error: "Method Not Allowed",
    method: req.method,
    message: `${req.method} is not supported for /users. Use GET or POST.`
  });
});

export default router;
