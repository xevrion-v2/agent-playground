import { Router } from "express";

const router = Router();
const allowedUserCollectionMethods = ["GET", "POST"] as const;

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
  res.set("Allow", allowedUserCollectionMethods.join(", "));
  res.status(405).json({
    error: {
      code: "method_not_allowed",
      message: `${req.method} is not supported for /users.`,
      allowedMethods: allowedUserCollectionMethods
    }
  });
});

export default router;
