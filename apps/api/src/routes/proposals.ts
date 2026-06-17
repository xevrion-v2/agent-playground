import { Router } from "express";

const router = Router();

/** GET /proposals - List all proposals */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "proposals listing not implemented yet." });
});

/** GET /proposals/:id - Get single proposals by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "proposals detail not implemented yet." });
});

/** POST /proposals - Create a new proposals */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-proposals-id", ...req.body },
    message: "proposals creation not implemented yet."
  });
});

/** PUT /proposals/:id - Update a proposals */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "proposals update not implemented yet." });
});

/** DELETE /proposals/:id - Delete a proposals */
router.delete("/:id", (_req, res) => {
  res.json({ message: "proposals deletion not implemented yet." });
});

export default router;
