import { Router } from "express";
import { calculatePI, getReferencePI, getPIError } from "../utils/pi";

const router = Router();

/**
 * GET /pi
 * Returns PI calculation with accuracy metrics.
 * Query param: iterations (default: 1000000)
 */
router.get("/", (req, res) => {
  const iterations = Math.min(
    Math.max(parseInt(req.query.iterations as string) || 1_000_000, 1),
    10_000_000
  );

  const calculated = calculatePI(iterations);
  const reference = getReferencePI();
  const error = getPIError(calculated);

  res.json({
    data: {
      calculated,
      reference,
      absoluteError: error,
      relativeError: error / reference,
      iterations,
      algorithm: "Kahan-summated Leibniz series",
    },
    message: "PI calculation completed successfully.",
  });
});

export default router;
