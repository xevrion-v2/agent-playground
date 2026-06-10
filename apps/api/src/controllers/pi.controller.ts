import { Request, Response } from 'express';
import calculatePi from '../utils/pi-calculator';

/**
 * PI calculation controller
 * 
 * This endpoint calculates an approximation of PI using the Leibniz formula
 * and returns the result with metadata about the calculation.
 */
export const piController = {
  /**
   * Calculate PI endpoint
   * @param req Request with optional 'iterations' query param
   * @param res Response object
   */
  getPi: (req: Request, res: Response) => {
    const iterations = Number(req.query.iterations) || 1000000;
    const pi = calculatePi(iterations);
    res.json({ pi, iterations, method: 'Leibniz formula' });
  }