import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

router.get("/", listUsers);
router.post("/", createUser);

export default router;
