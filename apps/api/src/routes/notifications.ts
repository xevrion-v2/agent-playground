import { Router } from "express";

const router = Router();

/** GET /notifications - List all notifications */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "notifications listing not implemented yet." });
});

/** GET /notifications/:id - Get single notifications by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "notifications detail not implemented yet." });
});

/** POST /notifications - Create a new notifications */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-notifications-id", ...req.body },
    message: "notifications creation not implemented yet."
  });
});

/** PUT /notifications/:id - Update a notifications */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "notifications update not implemented yet." });
});

/** DELETE /notifications/:id - Delete a notifications */
router.delete("/:id", (_req, res) => {
  res.json({ message: "notifications deletion not implemented yet." });
});

export default router;
