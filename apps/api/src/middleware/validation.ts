import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { HttpException } from '../utils/exceptions';

interface ValidationSchema {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        const result = schema.body.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            message: 'Invalid request body',
            errors: result.error.errors,
          });
        }
        req.body = result.data;
      }

      if (schema.params && req.params) {
        const result = schema.params.safeParse(req.params);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            message: 'Invalid request parameters',
            errors: result.error.errors,
          });
        }
        req.params = result.data;
      }

      if (schema.query && req.query) {
        const result = schema.query.safeParse(req.query);
        if (!result.success) {
          return res.status(400).json({
            success: false,
            message: 'Invalid query parameters',
            errors: result.error.errors,
          });
        }
        req.query = result.data;
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
            message: 'Validation error',
            errors: error,
      });
    }
  };
};