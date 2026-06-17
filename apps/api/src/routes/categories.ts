import { Router } from "express";

const router = Router();

/** GET /categories - List all categories */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "categories listing not implemented yet." });
});

/** GET /categories/:id - Get single categories by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "categories detail not implemented yet." });
});

/** POST /categories - Create a new categories */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-categories-id", ...req.body },
    message: "categories creation not implemented yet."
  });
});

/** PUT /categories/:id - Update a categories */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "categories update not implemented yet." });
});

/** DELETE /categories/:id - Delete a categories */
router.delete("/:id", (_req, res) => {
  res.json({ message: "categories deletion not implemented yet." });
});

export default router;
