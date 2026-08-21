import { Router } from "express";
import { userService } from "../services/userService";

const router = Router();

router.get("/", async (_req, res) => {
  const data = await userService.listUsers();
  res.json({
    data,
    message: "User listing is not implemented yet."
  });
});

router.post("/", async (req, res) => {
  const data = await userService.createUser(req.body);
  res.status(201).json({
    data,
    message: "User creation is not implemented yet."
  });
});

export default router;
