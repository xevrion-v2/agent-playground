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

import { Router } from 'express';
import { validateCreateUser, validateUpdateUser, validateUserId } from './validation';

const router = Router();

// Apply to user routes
router.post('/users', validateCreateUser, createUserController);
router.put('/users/:id', validateUpdateUser, validateUserId, updateUserController);
router.patch('/users/:id', validateUpdateUser, validateUserId, patchUserController);
export default router;
