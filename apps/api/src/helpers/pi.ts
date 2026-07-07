/**
 * pi.ts
 *
 * Lightweight math utility to calculate the value of Pi (π).
 *
 * Chosen Approach: Nilakantha Series
 * The Nilakantha Series is an infinite series for calculating Pi. It converges
 * significantly faster than the simpler Leibniz formula (1 - 1/3 + 1/5 - 1/7 + ...).
 *
 * Formula:
 *   π = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + ...
 *
 * Each term takes the form: (-1)^(n+1) * 4 / ( (2n) * (2n+1) * (2n+2) ) for n = 1, 2, 3...
 */

/**
 * Calculates Pi using the Nilakantha series.
 *
 * @param iterations - The number of iterations/terms to calculate (default: 1000).
 *                    Higher values yield more precision.
 * @returns The calculated value of Pi.
 */
export function calculatePi(iterations = 1000): number {
  if (iterations < 0) {
    throw new Error("Iterations must be a non-negative integer.");
  }

  let pi = 3.0;
  let sign = 1.0;

  for (let i = 1; i <= iterations; i++) {
    const termIndex = i * 2;
    const term = 4.0 / (termIndex * (termIndex + 1) * (termIndex + 2));
    pi += sign * term;
    sign = -sign; // Alternate the sign for each term
  }

  return pi;
}

/**
 * Documents the chosen approach and complexity details of the algorithm.
 */
export const ALGORITHM_DOCUMENTATION = {
  name: "Nilakantha Series",
  description: "An infinite series that calculates Pi with fast convergence relative to Leibniz.",
  formula: "π = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...",
  timeComplexity: "O(N) where N is the number of iterations.",
  spaceComplexity: "O(1) auxiliary space.",
  notes: "With just 1000 iterations, it achieves 10 decimal places of accuracy (3.1415926535...)."
};
