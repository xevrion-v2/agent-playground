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

/** GET /users/:id - Returns a single user by ID (stub). */
router.get("/:id", (_req, res) => {
  res.status(501).json({ data: null, message: "User detail is not implemented yet." });
});

/** PUT /users/:id - Updates a user by ID (stub). */
router.put("/:id", (_req, res) => {
  res.status(501).json({ data: null, message: "User update is not implemented yet." });
});

/** DELETE /users/:id - Deletes a user by ID (stub). */
router.delete("/:id", (_req, res) => {
  res.status(501).json({ data: null, message: "User deletion is not implemented yet." });
});

export default router;
