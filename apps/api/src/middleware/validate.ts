import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface ValidationConfig {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export const validate = (schemas: ValidationConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        schemas.body.parse(req.body);
      }
      if (schemas.params) {
        schemas.params.parse(req.params);
      }
      if (schemas.query) {
        schemas.query.parse(req.query);
      }
      next();
    } catch (error: any) {
      const issues = error.issues?.map((issue: any) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })) || [{ path: 'unknown', message: 'Validation failed' }];

      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: issues,
      });
    }
  };
};