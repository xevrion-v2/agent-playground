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

router.all("/", (_req, res) => {
  res.set("Allow", "GET, POST");
  res.status(405).json({
    error: {
      message: "Method not allowed for /users."
    }
  });
});

export default router;
