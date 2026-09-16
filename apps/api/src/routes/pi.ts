import { Router } from "express";
import { calculatePI, getPIPreciseDescription } from "../pi";

const router = Router();

/**
 * GET /pi
 * Calculate PI to a specified precision
 * 
 * Query params:
 *   - digits: number of decimal places (default: 10)
 */
router.get("/", (req, res) => {
  const digits = parseInt(req.query.digits as string) || 10;
  const pi = calculatePI(digits);
  
  res.json({
    pi: pi.toFixed(digits),
    digits: digits,
    algorithm: "Leibniz series",
    description: getPIPreciseDescription()
  });
});

/**
 * GET /pi/digits/:count
 * Get PI with a specific number of decimal places
 */
router.get("/digits/:count", (req, res) => {
  const count = parseInt(req.params.count) || 10;
  const clampedCount = Math.min(Math.max(count, 1), 100);
  const pi = calculatePI(clampedCount);
  
  res.json({
    pi: pi.toFixed(clampedCount),
    digits: clampedCount,
    algorithm: "Leibniz series"
  });
});

/**
 * GET /pi/info
 * Get information about the PI calculation algorithm
 */
router.get("/info", (_req, res) => {
  res.json({
    algorithm: "Leibniz Formula",
    formula: "PI = 4 * (1 - 1/3 + 1/5 - 1/7 + ...)",
    description: getPIPreciseDescription(),
    complexity: "O(n) time, O(1) space",
    accuracy: "Approximately 1 correct decimal place per 10 million iterations"
  });
});

export default router;
