import { Router } from "express";

const router = Router();

/**
 * Calculate PI using various algorithms
 * Query params:
 * - algorithm: "leibniz" | "nilakantha" | "monte-carlo" | "chudnovsky" (default: "leibniz")
 * - iterations: number (default: 10000)
 */
router.get("/pi", (req, res) => {
  const algorithm = (req.query.algorithm as string) || "leibniz";
  const iterations = Math.max(1, Math.min(1000000, parseInt(req.query.iterations as string) || 10000));

  let result: number;
  let description: string;

  switch (algorithm) {
    case "nilakantha":
      result = calculatePiNilakantha(iterations);
      description = "Nilakantha series - converges faster than Leibniz";
      break;
    case "monte-carlo":
      result = calculatePiMonteCarlo(iterations);
      description = "Monte Carlo method - statistical approximation";
      break;
    case "chudnovsky":
      result = calculatePiChudnovsky(Math.min(iterations, 20));
      description = "Chudnovsky algorithm - extremely fast convergence (used for world records)";
      break;
    case "leibniz":
    default:
      result = calculatePiLeibniz(iterations);
      description = "Leibniz formula - simple but slow convergence";
      break;
  }

  const actualPi = Math.PI;
  const error = Math.abs(result - actualPi);
  const accuracy = ((1 - error / actualPi) * 100).toFixed(10);

  res.json({
    algorithm,
    iterations,
    calculated: result,
    actual: actualPi,
    error,
    accuracy: `${accuracy}%`,
    description,
  });
});

/**
 * Leibniz formula: π = 4 * (1 - 1/3 + 1/5 - 1/7 + 1/9 - ...)
 * Converges very slowly: O(1/n)
 */
export function calculatePiLeibniz(iterations: number): number {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    const term = 1 / (2 * i + 1);
    if (i % 2 === 0) {
      sum += term;
    } else {
      sum -= term;
    }
  }
  return 4 * sum;
}

/**
 * Nilakantha series: π = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
 * Converges faster: O(1/n^3)
 */
export function calculatePiNilakantha(iterations: number): number {
  let sum = 3;
  let sign = 1;
  for (let i = 1; i <= iterations; i++) {
    const n = 2 * i;
    const term = 4 / (n * (n + 1) * (n + 2));
    sum += sign * term;
    sign *= -1;
  }
  return sum;
}

/**
 * Monte Carlo method: randomly sample points in unit square,
 * ratio of points inside quarter circle = π/4
 * Converges as O(1/√n)
 */
export function calculatePiMonteCarlo(iterations: number): number {
  let inside = 0;
  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      inside++;
    }
  }
  return 4 * inside / iterations;
}

/**
 * Chudnovsky algorithm: 1/π = 12 * Σ (-1)^k * (6k)! * (13591409 + 545140134k) / ((3k)! * (k!)^3 * 640320^(3k+3/2))
 * Extremely fast convergence: ~14 digits per iteration
 * Used for world record PI calculations
 */
export function calculatePiChudnovsky(iterations: number): number {
  // Simplified implementation using high-precision arithmetic
  // For demonstration - real implementation would use big integers
  let sum = 0;
  const C = 640320;
  const C3_2 = C * C * C * Math.sqrt(C); // 640320^(3/2)
  
  for (let k = 0; k < iterations; k++) {
    const sign = k % 2 === 0 ? 1 : -1;
    
    // (6k)! / ((3k)! * (k!)^3)
    // Using logarithms to avoid overflow for large k
    const logNumerator = logFactorial(6 * k);
    const logDenominator = logFactorial(3 * k) + 3 * logFactorial(k);
    const coefficient = Math.exp(logNumerator - logDenominator);
    
    const linearTerm = 13591409 + 545140134 * k;
    const powerTerm = Math.pow(C, 3 * k);
    
    sum += sign * coefficient * linearTerm / powerTerm;
  }
  
  return 1 / (12 * sum / C3_2);
}

function logFactorial(n: number): number {
  if (n <= 1) return 0;
  // Stirling's approximation for large n
  if (n > 100) {
    return n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n);
  }
  let sum = 0;
  for (let i = 2; i <= n; i++) {
    sum += Math.log(i);
  }
  return sum;
}

export default router;