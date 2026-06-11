import { Router } from "express";

const router = Router();

/**
 * Calculate PI using the Nilakantha series
 * Formula: π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - 4/(8×9×10) + ...
 * 
 * This algorithm offers better convergence than the simpler Leibniz formula
 * while remaining lightweight and deterministic.
 * 
 * @param iterations - Number of terms to calculate (default: 1000000)
 * @returns Calculated value of PI
 */
function calculatePi(iterations: number = 1000000): number {
  let pi = 3;
  let sign = 1;

  for (let i = 2; i < iterations * 2; i += 2) {
    pi += sign * (4 / (i * (i + 1) * (i + 2)));
    sign *= -1;
  }

  return pi;
}

router.get("/", (req, res) => {
  const iterations = req.query.iterations 
    ? parseInt(req.query.iterations as string, 10) 
    : 1000000;

  if (isNaN(iterations) || iterations < 1) {
    return res.status(400).json({
      error: "Invalid iterations parameter. Must be a positive integer."
    });
  }

  const startTime = Date.now();
  const calculatedPi = calculatePi(iterations);
  const endTime = Date.now();

  res.json({
    data: {
      value: calculatedPi,
      iterations,
      computeTimeMs: endTime - startTime,
      accuracy: Math.abs(calculatedPi - Math.PI),
      algorithm: "Nilakantha series"
    },
    message: "PI calculated successfully",
    documentation: {
      formula: "π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - ...",
      description: "The Nilakantha series converges faster than the Leibniz formula, providing better accuracy with fewer iterations.",
      usage: "Call with ?iterations=N to control precision (default: 1000000)"
    }
  });
});

export default router;
