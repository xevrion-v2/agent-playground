import { Router, Request, Response } from "express";
import { z } from "zod";
import {
  CreateJobSchema,
  UpdateJobSchema,
  JobQuerySchema,
  type CreateJobInput,
  type UpdateJobInput,
  type JobQueryInput,
} from "../schemas/job";
import { ApiErrors, asyncHandler, sendSuccess } from "../utils/apiError";
import { prisma } from "../utils/prisma";

const router = Router();

const JobIdParamsSchema = z.object({
  id: z.string().cuid("Invalid job ID format"),
});

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const queryResult = JobQuerySchema.safeParse(req.query);
    if (!queryResult.success) {
      throw ApiErrors.validationFailed(queryResult.error.flatten().fieldErrors);
    }

    const { limit, offset, status, ownerId } = queryResult.data;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (ownerId) where.ownerId = ownerId;

    const jobs = await prisma.job.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: { id: true, email: true, name: true },
        },
        _count: { select: { proposals: true } },
      },
    });

    const total = await prisma.job.count({ where });

    return sendSuccess(res, jobs, "Jobs retrieved successfully", 200, {
      total,
      limit: queryResult.data.limit,
      offset: queryResult.data.offset,
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const validation = CreateJobSchema.safeParse(req.body);

    if (!validation.success) {
      throw ApiErrors.validationFailed(validation.error.flatten().fieldErrors);
    }

    // Verify owner exists
    const owner = await prisma.user.findUnique({
      where: { id: validation.data.ownerId },
    });

    if (!owner) {
      throw ApiErrors.notFound("Owner not found");
    }

    const job = await prisma.job.create({
      data: {
        title: validation.data.title,
        description: validation.data.description,
        status: validation.data.status,
        ownerId: validation.data.ownerId,
      },
      include: {
        owner: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    return sendSuccess(res, job, "Job created successfully", 201);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = JobIdParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      throw ApiErrors.validationFailed(paramsResult.error.flatten().fieldErrors);
    }

    const job = await prisma.job.findUnique({
      where: { id: paramsResult.data.id },
      include: {
        owner: {
          select: { id: true, email: true, name: true },
        },
        proposals: {
          include: {
            user: {
              select: { id: true, email: true, name: true },
            },
          },
        },
      },
    });

    if (!job) {
      throw ApiErrors.notFound("Job not found");
    }

    return sendSuccess(res, job, "Job retrieved successfully", 200);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = JobIdParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      throw ApiErrors.validationFailed(paramsResult.error.flatten().fieldErrors);
    }

    const validation = UpdateJobSchema.safeParse(req.body);

    if (!validation.success) {
      throw ApiErrors.validationFailed(validation.error.flatten().fieldErrors);
    }

    const existingJob = await prisma.job.findUnique({
      where: { id: paramsResult.data.id },
    });

    if (!existingJob) {
      throw ApiErrors.notFound("Job not found");
    }

    const job = await prisma.job.update({
      where: { id: paramsResult.data.id },
      data: {
        title: validation.data.title,
        description: validation.data.description,
        status: validation.data.status,
      },
      include: {
        owner: {
          select: { id: true, email: true, name: true },
        },
      },
    });

    return sendSuccess(res, job, "Job updated successfully", 200);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const paramsResult = JobIdParamsSchema.safeParse(req.params);
    if (!paramsResult.success) {
      throw ApiErrors.validationFailed(paramsResult.error.flatten().fieldErrors);
    }

    const existingJob = await prisma.job.findUnique({
      where: { id: paramsResult.data.id },
    });

    if (!existingJob) {
      throw ApiErrors.notFound("Job not found");
    }

    await prisma.job.delete({
      where: { id: paramsResult.data.id },
    });

    return sendSuccess(res, { id: paramsResult.data.id }, "Job deleted successfully", 200);
  })
);

export { JobIdParamsSchema };
export default router;