/**
 * PI calculation utilities demonstrating multiple mathematical approaches.
 *
 * This module implements several classic algorithms for approximating PI,
 * each with different convergence rates, accuracy characteristics, and
 * computational trade-offs.
 */

/**
 * Calculate PI using the Leibniz formula (Gregory-Leibniz series).
 *
 * Formula: π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 *
 * Characteristics:
 * - Very simple to implement
 * - Extremely slow convergence (needs ~10^n iterations for n decimal places)
 * - Good for educational purposes
 *
 * @example
 * ```ts
 * console.log(calculatePiLeibniz(1000000)); // ~3.14159
 * ```
 *
 * @param iterations - Number of terms to compute. More = more accurate but slower.
 * @returns Approximation of PI.
 */
export function calculatePiLeibniz(iterations: number): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    const term = 1 / (2 * i + 1);
    pi += i % 2 === 0 ? term : -term;
  }
  return pi * 4;
}

/**
 * Calculate PI using Machin's formula.
 *
 * Formula: π/4 = 4 * arctan(1/5) - arctan(1/239)
 *
 * Characteristics:
 * - Much faster convergence than Leibniz
 * - Used historically to calculate PI to many decimal places
 * - Requires arctangent calculation
 *
 * @example
 * ```ts
 * console.log(calculatePiMachin(20)); // Very accurate with few iterations
 * ```
 *
 * @param iterations - Number of terms for arctan series expansion.
 * @returns Approximation of PI.
 */
export function calculatePiMachin(iterations: number): number {
  /**
   * Calculate arctan(x) using the Taylor series.
   * arctan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
   */
  function arctan(x: number, terms: number): number {
    let result = 0;
    for (let i = 0; i < terms; i++) {
      const power = 2 * i + 1;
      const term = Math.pow(x, power) / power;
      result += i % 2 === 0 ? term : -term;
    }
    return result;
  }

  return 4 * (4 * arctan(1 / 5, iterations) - arctan(1 / 239, iterations));
}

/**
 * Calculate PI using the Monte Carlo method.
 *
 * Method: Randomly generate points in a unit square. The ratio of points
 * falling inside a quarter circle to total points approximates π/4.
 *
 * Characteristics:
 * - Probabilistic approach, results vary between runs
 * - Convergence is O(1/√n), very slow for high precision
 * - Great for demonstrating probability and geometry
 *
 * @example
 * ```ts
 * console.log(calculatePiMonteCarlo(1000000)); // ~3.14
 * ```
 *
 * @param points - Number of random points to generate.
 * @returns Approximation of PI.
 */
export function calculatePiMonteCarlo(points: number): number {
  let insideCircle = 0;

  for (let i = 0; i < points; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      insideCircle++;
    }
  }

  return (insideCircle / points) * 4;
}

/**
 * Calculate PI using the Nilakantha series.
 *
 * Formula: π = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
 *
 * Characteristics:
 * - Faster convergence than Leibniz
 * - Still relatively simple
 * - Good intermediate between Leibniz and Machin
 *
 * @example
 * ```ts
 * console.log(calculatePiNilakantha(1000)); // ~3.14159
 * ```
 *
 * @param iterations - Number of terms to compute.
 * @returns Approximation of PI.
 */
export function calculatePiNilakantha(iterations: number): number {
  let pi = 3;
  for (let i = 1; i <= iterations; i++) {
    const denominator = (2 * i) * (2 * i + 1) * (2 * i + 2);
    const term = 4 / denominator;
    pi += i % 2 === 1 ? term : -term;
  }
  return pi;
}

/**
 * Result of a PI calculation benchmark.
 */
export type PiBenchmarkResult = {
  method: string;
  value: number;
  iterations: number;
  error: number;
  durationMs: number;
};

/**
 * Benchmark all PI calculation methods and compare their accuracy and speed.
 *
 * @example
 * ```ts
 * const results = benchmarkPiMethods(100000);
 * results.forEach(r => console.log(`${r.method}: ${r.value} (error: ${r.error}) in ${r.durationMs}ms`));
 * ```
 *
 * @param iterations - Number of iterations to use for each method.
 * @returns Array of benchmark results sorted by accuracy (lowest error first).
 */
export function benchmarkPiMethods(iterations: number): PiBenchmarkResult[] {
  const methods: Array<{ name: string; fn: (n: number) => number }> = [
    { name: "Leibniz", fn: calculatePiLeibniz },
    { name: "Machin", fn: calculatePiMachin },
    { name: "Monte Carlo", fn: calculatePiMonteCarlo },
    { name: "Nilakantha", fn: calculatePiNilakantha }
  ];

  const results: PiBenchmarkResult[] = methods.map(({ name, fn }) => {
    const start = performance.now();
    const value = fn(iterations);
    const durationMs = performance.now() - start;
    return {
      method: name,
      value,
      iterations,
      error: Math.abs(value - Math.PI),
      durationMs
    };
  });

  return results.sort((a, b) => a.error - b.error);
}

/**
 * Reference value of PI from JavaScript's built-in Math.PI.
 * This is the most accurate value available in standard JavaScript.
 */
export const PI_REFERENCE = Math.PI;

/**
 * Known digits of PI for reference (first 100 decimal places).
 */
export const PI_100_DIGITS =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

/**
 * ⚠️ Note on precision:
 *
 * JavaScript numbers are IEEE 754 double-precision floating point, which
 * provides approximately 15-17 significant decimal digits. None of these
 * algorithms can exceed that precision when using standard number types.
 *
 * For higher precision, you would need:
 * - A big decimal library (e.g., decimal.js, big.js)
 * - BigInt-based custom arithmetic
 * - WebAssembly implementations
 */
export const PRECISION_NOTE =
  "JavaScript doubles provide ~15-17 significant digits. Use a big decimal library for higher precision.";
