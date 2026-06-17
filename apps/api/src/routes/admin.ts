import { Router } from "express";

const router = Router();

/** GET /admin - List all admin */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "admin listing not implemented yet." });
});

/** GET /admin/:id - Get single admin by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "admin detail not implemented yet." });
});

/** POST /admin - Create a new admin */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-admin-id", ...req.body },
    message: "admin creation not implemented yet."
  });
});

/** PUT /admin/:id - Update a admin */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "admin update not implemented yet." });
});

/** DELETE /admin/:id - Delete a admin */
router.delete("/:id", (_req, res) => {
  res.json({ message: "admin deletion not implemented yet." });
});

export default router;
