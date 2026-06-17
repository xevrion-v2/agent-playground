import { Router } from "express";

const router = Router();

/** GET /reviews - List all reviews */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "reviews listing not implemented yet." });
});

/** GET /reviews/:id - Get single reviews by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "reviews detail not implemented yet." });
});

/** POST /reviews - Create a new reviews */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-reviews-id", ...req.body },
    message: "reviews creation not implemented yet."
  });
});

/** PUT /reviews/:id - Update a reviews */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "reviews update not implemented yet." });
});

/** DELETE /reviews/:id - Delete a reviews */
router.delete("/:id", (_req, res) => {
  res.json({ message: "reviews deletion not implemented yet." });
});

export default router;
