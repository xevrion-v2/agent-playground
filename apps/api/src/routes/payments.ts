import { Router } from "express";

const router = Router();

/** GET /payments - List all payments */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "payments listing not implemented yet." });
});

/** GET /payments/:id - Get single payments by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "payments detail not implemented yet." });
});

/** POST /payments - Create a new payments */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-payments-id", ...req.body },
    message: "payments creation not implemented yet."
  });
});

/** PUT /payments/:id - Update a payments */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "payments update not implemented yet." });
});

/** DELETE /payments/:id - Delete a payments */
router.delete("/:id", (_req, res) => {
  res.json({ message: "payments deletion not implemented yet." });
});

export default router;
