/**
 * PI Calculation Algorithms
 * 
 * This module implements multiple algorithms for calculating PI,
 * each with different trade-offs in terms of speed and accuracy.
 * 
 * ## Algorithms Implemented
 * 
 * ### 1. Leibniz Formula (Gregory-Leibniz Series)
 * **Approach**: π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * **Time Complexity**: O(n) for n iterations
 * **Accuracy**: Converges very slowly (~300 terms for 2 decimal places)
 * **Use Case**: Educational, demonstrates series convergence
 * 
 * ### 2. Nilakantha Series
 * **Approach**: π = 3 + 4/(2×3×4) - 4/(4×5×6) + 4/(6×7×8) - ...
 * **Time Complexity**: O(n) for n iterations
 * **Accuracy**: Converges faster than Leibniz (~10 terms for 2 decimal places)
 * **Use Case**: Better balance of simplicity and speed
 * 
 * ### 3. Monte Carlo Method
 * **Approach**: Random points in unit square, count those inside quarter-circle
 * **Time Complexity**: O(n) for n samples
 * **Accuracy**: Stochastic, accuracy ∝ 1/√n (law of large numbers)
 * **Use Case**: Demonstrates probabilistic computing, parallelizable
 * 
 * ### 4. Gauss-Legendre Algorithm (Fast Convergence)
 * **Approach**: Iterative algorithm doubling correct digits each iteration
 * **Time Complexity**: O(log n) iterations for n-digit accuracy
 * **Accuracy**: Quadratic convergence (doubles digits per iteration)
 * **Use Case**: Production use when high precision needed
 * 
 * ## Choosing an Algorithm
 * 
 * - **Learning**: Leibniz (simplest)
 * - **Balance**: Nilakantha (good speed, decent accuracy)
 * - **Parallel/Probabilistic**: Monte Carlo
 * - **High Precision**: Gauss-Legendre
 * 
 * @module pi
 */

/**
 * Calculate PI using the Leibniz formula (Gregory-Leibniz series)
 * 
 * @param iterations - Number of terms to compute (higher = more accurate)
 * @returns Approximation of PI
 * 
 * @example
 * ```typescript
 * calculatePiLeibniz(1000); // ~3.1406
 * calculatePiLeibniz(100000); // ~3.14158
 * ```
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
 * Calculate PI using the Nilakantha series
 * 
 * @param iterations - Number of terms to compute
 * @returns Approximation of PI
 * 
 * @example
 * ```typescript
 * calculatePiNilakantha(10); // ~3.1414067
 * calculatePiNilakantha(100); // ~3.14159258
 * ```
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
 * Calculate PI using Monte Carlo method
 * 
 * @param samples - Number of random samples to generate
 * @returns Approximation of PI
 * 
 * @example
 * ```typescript
 * calculatePiMonteCarlo(10000); // ~3.14 (varies)
 * calculatePiMonteCarlo(1000000); // ~3.141 (more accurate)
 * ```
 */
export function calculatePiMonteCarlo(samples: number): number {
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      inside++;
    }
  }
  return (4 * inside) / samples;
}

/**
 * Calculate PI using Gauss-Legendre algorithm (quadratic convergence)
 * 
 * @param iterations - Number of iterations (each doubles precision!)
 * @returns Approximation of PI
 * 
 * @example
 * ```typescript
 * calculatePiGaussLegendre(1); // ~3.187 (1 iteration)
 * calculatePiGaussLegendre(3); // ~3.141592653589794 (15 correct digits!)
 * ```
 */
export function calculatePiGaussLegendre(iterations: number): number {
  let a = 1;
  let b = 1 / Math.sqrt(2);
  let t = 0.25;
  let p = 1;

  for (let i = 0; i < iterations; i++) {
    const aNext = (a + b) / 2;
    const bNext = Math.sqrt(a * b);
    const tNext = t - p * (a - aNext) * (a - aNext);
    const pNext = 2 * p;

    a = aNext;
    b = bNext;
    t = tNext;
    p = pNext;
  }

  return (a + b) * (a + b) / (4 * t);
}

/**
 * High-precision PI using built-in Math.PI (reference)
 * Used for comparing accuracy of other methods.
 */
export const PI_REFERENCE = Math.PI;

/**
 * Calculate the absolute error between computed PI and Math.PI
 * 
 * @param computed - The computed value of PI
 * @returns Absolute error (positive number)
 */
export function calculatePiError(computed: number): number {
  return Math.abs(PI_REFERENCE - computed);}

/**
 * Benchmark all PI calculation methods and return accuracy comparison
 * 
 * @param iterations - Iterations/samples for each method
 * @returns Object with method names as keys and { value, error } as values
 */
export function benchmarkPiMethods(iterations: number = 100000): Record<string, { value: number; error: number }> {
  return {
    leibniz: {
      value: calculatePiLeibniz(iterations),
      error: calculatePiError(calculatePiLeibniz(iterations))
    },
    nilakantha: {
      value: calculatePiNilakantha(Math.min(iterations, 1000)),
      error: calculatePiError(calculatePiNilakantha(Math.min(iterations, 1000)))
    },
    monteCarlo: {
      value: calculatePiMonteCarlo(iterations),
      error: calculatePiError(calculatePiMonteCarlo(iterations))
    },
    gaussLegendre: {
      value: calculatePiGaussLegendre(3),
      error: calculatePiError(calculatePiGaussLegendre(3))
    },
    reference: {
      value: PI_REFERENCE,
      error: 0
    }
  };
}
