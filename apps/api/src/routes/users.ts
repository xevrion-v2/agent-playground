import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: implement pagination, filtering, and search
  // TODO: add authentication check
  // TODO: return real user data from database
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: validate email format
  // TODO: check for duplicate email
  // TODO: hash password if implementing auth
  // TODO: persist user to database
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
