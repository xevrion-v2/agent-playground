import { Router } from "express";

const router = Router();

/** GET /billing - List all billing */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "billing listing not implemented yet." });
});

/** GET /billing/:id - Get single billing by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "billing detail not implemented yet." });
});

/** POST /billing - Create a new billing */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-billing-id", ...req.body },
    message: "billing creation not implemented yet."
  });
});

/** PUT /billing/:id - Update a billing */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "billing update not implemented yet." });
});

/** DELETE /billing/:id - Delete a billing */
router.delete("/:id", (_req, res) => {
  res.json({ message: "billing deletion not implemented yet." });
});

export default router;
