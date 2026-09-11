import { Router, Request, Response } from "express";
import {
  CreateJobSchema,
  UpdateJobSchema,
  JobQuerySchema,
  type CreateJobInput,
  type UpdateJobInput,
  type JobQueryInput,
} from "../schemas/job";
import { ApiErrors, asyncHandler, sendSuccess } from "../utils/apiError";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const queryResult = JobQuerySchema.safeParse(req.query);
    if (!queryResult.success) {
      throw ApiErrors.validationFailed(queryResult.error.flatten().fieldErrors);
    }

    // TODO: Implement actual job listing with database
    return sendSuccess(res, [], "Job listing is not implemented yet.", 200);
  })
);

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const validation = CreateJobSchema.safeParse(req.body);

    if (!validation.success) {
      throw ApiErrors.validationFailed(validation.error.flatten().fieldErrors);
    }

    // TODO: Implement actual job creation with database
    return sendSuccess(
      res,
      {
        id: `job_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        ...validation.data,
        createdAt: new Date().toISOString(),
      },
      "Job created successfully",
      201
    );
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const validation = UpdateJobSchema.safeParse(req.body);

    if (!validation.success) {
      throw ApiErrors.validationFailed(validation.error.flatten().fieldErrors);
    }

    // TODO: Implement actual job update with database
    return sendSuccess(
      res,
      {
        id: req.params.id,
        ...validation.data,
        updatedAt: new Date().toISOString(),
      },
      "Job updated successfully",
      200
    );
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    // TODO: Implement actual job deletion with database
    return sendSuccess(res, { id: req.params.id }, "Job deleted successfully", 200);
  })
);

export default router;