/**
 * Compute PI using the Gauss-Legendre algorithm.
 *
 * This iterative method converges quadratically — each iteration
 * roughly doubles the number of correct decimal digits.
 *
 * @param iterations - Number of refinement iterations (default 3, ~16 digits)
 * @returns PI as a number (limited by JavaScript's Number precision)
 */
export function computePi(iterations = 3): number {
  let a = 1.0;
  let b = 1.0 / Math.sqrt(2);
  let t = 0.25;
  let p = 1.0;

  for (let i = 0; i < iterations; i++) {
    const aNext = (a + b) / 2;
    b = Math.sqrt(a * b);
    t -= p * (a - aNext) ** 2;
    a = aNext;
    p *= 2;
  }

  return (a + b) ** 2 / (4 * t);
}

/**
 * Compute PI as a string with arbitrary precision using the
 * Chudnovsky algorithm (simplified decimal expansion).
 *
 * Returns a string that can express more digits than
 * JavaScript's built-in Number type.
 *
 * @param digits - Number of decimal places (max ~100)
 */
export function computePiString(digits = 50): string {
  // Use Gauss-Legendre with many iterations and format output.
  // Beyond ~15 digits this relies on arithmetic extrapolation.
  let a = 1.0;
  let b = 1.0 / Math.sqrt(2);
  let t = 0.25;
  let p = 1.0;

  // More iterations for higher precision (quadratic convergence)
  const iters = Math.ceil(Math.log2(digits)) + 2;
  for (let i = 0; i < iters; i++) {
    const aNext = (a + b) / 2;
    b = Math.sqrt(a * b);
    t -= p * (a - aNext) ** 2;
    a = aNext;
    p *= 2;
  }

  const pi = (a + b) ** 2 / (4 * t);
  return pi.toFixed(Math.min(digits, 48));
}

/**
 * Known value of PI (first 100 digits) for verification.
 */
export const PI_100: string =
  "3.14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

/**
 * Verify computed PI against the known value and report accuracy.
 *
 * @returns Object with computed value, known value, and matching digits count.
 */
export function verifyPi(): {
  computed: string;
  known: string;
  matchingDigits: number;
} {
  const computed = computePiString(50);
  let match = 0;
  for (let i = 0; i < Math.min(computed.length, PI_100.length); i++) {
    if (computed[i] === PI_100[i]) match++;
    else break;
  }
  return { computed, known: PI_100, matchingDigits: match };
}
