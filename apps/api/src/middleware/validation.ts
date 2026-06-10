import { ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid request format',
      details: errors.array()
    });
  }
  next();
};

export const handleValidationErrors = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  };
};