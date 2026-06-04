/**
 * PI calculation utility with multiple algorithms.
 * Each method returns an approximation of PI with configurable precision.
 */

/**
 * Approximate PI using the Leibniz formula:
 * PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 *
 * @param iterations - Number of terms to sum (default: 1,000,000).
 * @returns Approximation of PI.
 */
export function leibnizPi(iterations: number = 1_000_000): number {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += ((-1) ** i) / (2 * i + 1);
  }
  return sum * 4;
}

/**
 * Approximate PI using the Nilakantha series:
 * PI = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
 *
 * This converges faster than Leibniz for the same number of iterations.
 *
 * @param iterations - Number of terms to sum (default: 1000).
 * @returns Approximation of PI.
 */
export function nilakanthaPi(iterations: number = 1000): number {
  let pi = 3;
  let sign = 1;
  for (let i = 1; i <= iterations; i++) {
    const k = 2 * i;
    pi += (sign * 4) / (k * (k + 1) * (k + 2));
    sign *= -1;
  }
  return pi;
}

/**
 * Approximate PI using the Chudnovsky algorithm (simplified).
 * This is one of the fastest converging series for PI.
 *
 * @param iterations - Number of terms (default: 10).
 * @returns Approximation of PI.
 */
export function chudnovskyPi(iterations: number = 10): number {
  let sum = 0;
  const C = 426880 * Math.sqrt(10005);
  for (let k = 0; k < iterations; k++) {
    const numerator = factorial(6 * k) * (13591409 + 545140134 * k);
    const denominator = factorial(3 * k) * (factorial(k) ** 3) * ((-640320) ** (3 * k));
    sum += numerator / denominator;
  }
  return C / sum;
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// CLI usage
if (process.argv[1]?.includes("pi-calculator")) {
  console.log("Leibniz (1M terms):", leibnizPi().toFixed(15));
  console.log("Nilakantha (1000 terms):", nilakanthaPi().toFixed(15));
  console.log("Chudnovsky (10 terms):", chudnovskyPi().toFixed(15));
  console.log("Math.PI reference:    ", Math.PI.toFixed(15));
}
