import { Router } from "express";

const router = Router();

/** GET /skills - List all skills */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "skills listing not implemented yet." });
});

/** GET /skills/:id - Get single skills by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "skills detail not implemented yet." });
});

/** POST /skills - Create a new skills */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-skills-id", ...req.body },
    message: "skills creation not implemented yet."
  });
});

/** PUT /skills/:id - Update a skills */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "skills update not implemented yet." });
});

/** DELETE /skills/:id - Delete a skills */
router.delete("/:id", (_req, res) => {
  res.json({ message: "skills deletion not implemented yet." });
});

export default router;
