import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      data: users,
      message: "User listing retrieved successfully."
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name }
    });
    res.status(201).json({
      data: user,
      message: "User created successfully."
    });
  } catch (e) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

export default router;
