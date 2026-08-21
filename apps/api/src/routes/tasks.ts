import { Router, Request, Response } from "express";
import { sendError } from "../errorHandler";

const router = Router();

// TODO: Implement full task CRUD
router.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    data: [],
    message: "Task listing is not implemented yet.",
  });
});

router.get("/:id", (req: Request, res: Response) => {
  sendError(res, 404, `Task ${req.params.id} not implemented yet.`);
});

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    status: "ok",
    data: { id: "stub-task-id", ...req.body },
    message: "Task creation is not implemented yet.",
  });
});

router.put("/:id", (req: Request, res: Response) => {
  sendError(res, 501, `Task update not implemented yet.`);
});

router.delete("/:id", (req: Request, res: Response) => {
  sendError(res, 501, `Task deletion not implemented yet.`);
});

export default router;
