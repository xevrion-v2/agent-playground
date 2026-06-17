import { Router } from "express";

const router = Router();

/** GET /messages - List all messages */
router.get("/", (_req, res) => {
  res.json({ data: [], message: "messages listing not implemented yet." });
});

/** GET /messages/:id - Get single messages by ID */
router.get("/:id", (req, res) => {
  res.json({ data: { id: req.params.id }, message: "messages detail not implemented yet." });
});

/** POST /messages - Create a new messages */
router.post("/", (req, res) => {
  res.status(201).json({
    data: { id: "stub-messages-id", ...req.body },
    message: "messages creation not implemented yet."
  });
});

/** PUT /messages/:id - Update a messages */
router.put("/:id", (req, res) => {
  res.json({ data: { id: req.params.id, ...req.body }, message: "messages update not implemented yet." });
});

/** DELETE /messages/:id - Delete a messages */
router.delete("/:id", (_req, res) => {
  res.json({ message: "messages deletion not implemented yet." });
});

export default router;
