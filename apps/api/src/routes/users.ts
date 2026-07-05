import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await listUsers();
  res.json({
    data: users,
    message: "User listing is not implemented yet."
  });
});

router.post("/", async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

export default router;
